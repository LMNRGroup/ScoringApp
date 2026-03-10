'use client';

import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Criterion, RoundId, ScoresState } from '@/lib/types';
import { contestants, criteria, createInitialScoresState, rounds } from '@/lib/mock-data';
import { WelcomeScreen } from '@/components/scoring/welcome-screen';
import { ContestantSelection } from '@/components/scoring/contestant-selection';
import { ContestantDashboard } from '@/components/scoring/contestant-dashboard';
import { CriterionOverlay } from '@/components/scoring/criterion-overlay';
import { SubmitRoundDialog } from '@/components/scoring/submit-round-dialog';

const STORAGE_KEY = 'judging-prototype:v1';

interface PersistedState {
  judgeName: string;
  judgeConfirmed: boolean;
  selectedRound: RoundId;
  scores: ScoresState;
}

export default function HomePage() {
  const [judgeName, setJudgeName] = useState('');
  const [judgeConfirmed, setJudgeConfirmed] = useState(false);
  const [selectedContestantId, setSelectedContestantId] = useState<string | null>(null);
  const [selectedRound, setSelectedRound] = useState<RoundId>(1);
  const [scores, setScores] = useState<ScoresState>(() => createInitialScoresState());
  const [activeCriterionId, setActiveCriterionId] = useState<string | null>(null);
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);

  const selectedContestant = useMemo(
    () => contestants.find((item) => item.id === selectedContestantId) ?? null,
    [selectedContestantId]
  );

  const activeCriterion = useMemo<Criterion | null>(
    () => criteria.find((item) => item.id === activeCriterionId) ?? null,
    [activeCriterionId]
  );

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as PersistedState;
      if (parsed.judgeName) setJudgeName(parsed.judgeName);
      if (parsed.judgeConfirmed) setJudgeConfirmed(parsed.judgeConfirmed);
      if (parsed.selectedRound) setSelectedRound(parsed.selectedRound);
      if (parsed.scores) setScores(parsed.scores);
    } catch {
      // Ignore malformed persisted data.
    }
  }, []);

  useEffect(() => {
    const payload: PersistedState = {
      judgeName,
      judgeConfirmed,
      selectedRound,
      scores,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [judgeName, judgeConfirmed, selectedRound, scores]);

  useEffect(() => {
    if (!justSubmitted) return;
    const timer = window.setTimeout(() => setJustSubmitted(false), 2200);
    return () => window.clearTimeout(timer);
  }, [justSubmitted]);

  const isRoundLocked = !!(selectedContestant && scores[selectedContestant.id][selectedRound].submitted);

  const openCriterion = (criterionId: string) => {
    if (!selectedContestant || isRoundLocked) return;

    const criterion = criteria.find((item) => item.id === criterionId);
    if (!criterion) return;

    setActiveCriterionId(criterionId);
  };

  const updateAspectScore = (aspectId: string, value: number) => {
    if (!selectedContestant || !activeCriterion || isRoundLocked) return;

    setScores((prev) => ({
      ...prev,
      [selectedContestant.id]: {
        ...prev[selectedContestant.id],
        [selectedRound]: {
          ...prev[selectedContestant.id][selectedRound],
          criteria: {
            ...prev[selectedContestant.id][selectedRound].criteria,
            [activeCriterion.id]: {
              ...prev[selectedContestant.id][selectedRound].criteria[activeCriterion.id],
              [aspectId]: value,
            },
          },
        },
      },
    }));
  };

  const handleSubmitRound = () => {
    if (!selectedContestant) return;

    setScores((prev) => ({
      ...prev,
      [selectedContestant.id]: {
        ...prev[selectedContestant.id],
        [selectedRound]: {
          ...prev[selectedContestant.id][selectedRound],
          submitted: true,
          submittedAt: new Date().toISOString(),
        },
      },
    }));

    setSubmitDialogOpen(false);
    setJustSubmitted(true);
    setActiveCriterionId(null);
  };

  const resetJudge = () => {
    setJudgeName('');
    setJudgeConfirmed(false);
    setSelectedContestantId(null);
  };

  if (!judgeConfirmed) {
    return (
      <WelcomeScreen
        judgeName={judgeName}
        onChangeName={setJudgeName}
        onContinue={() => {
          if (judgeName.trim().length < 2) return;
          setJudgeName(judgeName.trim());
          setJudgeConfirmed(true);
        }}
      />
    );
  }

  if (!selectedContestant) {
    return (
      <ContestantSelection
        judgeName={judgeName}
        contestants={contestants}
        onSelect={setSelectedContestantId}
        onChangeJudge={resetJudge}
      />
    );
  }

  const activeValues =
    activeCriterion && selectedContestant
      ? scores[selectedContestant.id][selectedRound].criteria[activeCriterion.id]
      : {};
  const activeCriterionIndex = activeCriterion ? criteria.findIndex((criterion) => criterion.id === activeCriterion.id) : -1;

  return (
    <>
      <ContestantDashboard
        judgeName={judgeName}
        contestant={selectedContestant}
        criteria={criteria}
        scores={scores}
        selectedRound={selectedRound}
        rounds={rounds}
        onBackToContestants={() => setSelectedContestantId(null)}
        onSelectRound={(round) => {
          setSelectedRound(round);
          setActiveCriterionId(null);
        }}
        onOpenCriterion={openCriterion}
        onSubmitRound={() => setSubmitDialogOpen(true)}
      />

      <CriterionOverlay
        criterion={activeCriterion}
        open={!!activeCriterion}
        criterionIndex={Math.max(activeCriterionIndex, 0)}
        totalCriteria={criteria.length}
        values={activeValues}
        locked={isRoundLocked}
        isLastCriterion={activeCriterionIndex >= criteria.length - 1}
        onClose={() => setActiveCriterionId(null)}
        onNextCriterion={() => {
          if (!activeCriterion) return;
          const currentIndex = criteria.findIndex((criterion) => criterion.id === activeCriterion.id);
          if (currentIndex === -1 || currentIndex === criteria.length - 1) {
            setActiveCriterionId(null);
            return;
          }
          setActiveCriterionId(criteria[currentIndex + 1].id);
        }}
        onChangeAspectScore={updateAspectScore}
      />

      <SubmitRoundDialog
        open={submitDialogOpen}
        contestantName={selectedContestant.name}
        round={selectedRound}
        onCancel={() => setSubmitDialogOpen(false)}
        onConfirm={handleSubmitRound}
      />

      {justSubmitted ? (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-800 shadow-card animate-fadeUp">
          <span className="inline-flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4" /> Ronda enviada correctamente.
          </span>
        </div>
      ) : null}
    </>
  );
}
