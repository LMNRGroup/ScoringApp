'use client';

import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Criterion, RoundId, ScoresState } from '@/lib/types';
import {
  contestants,
  createInitialScoresState,
  getRoundCriteria,
  normalizeScoresState,
  roundLabels,
  rounds,
} from '@/lib/mock-data';
import { WelcomeScreen } from '@/components/scoring/welcome-screen';
import { ContestantSelection } from '@/components/scoring/contestant-selection';
import { ContestantDashboard } from '@/components/scoring/contestant-dashboard';
import { CriterionOverlay } from '@/components/scoring/criterion-overlay';
import { SubmitRoundDialog } from '@/components/scoring/submit-round-dialog';
import { getRoundStatus } from '@/lib/scoring';

const STORAGE_KEY = 'judging-prototype:v1';
const INTRO_SEEN_KEY = 'luminar-intro-seen:v1';

interface PersistedState {
  judgeName: string;
  judgeConfirmed: boolean;
  selectedRound: RoundId;
  scores: ScoresState;
}

export default function HomePage() {
  const [isBooting, setIsBooting] = useState(true);
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

  const selectedRoundCriteria = useMemo(() => getRoundCriteria(selectedRound), [selectedRound]);

  const activeCriterion = useMemo<Criterion | null>(
    () => selectedRoundCriteria.find((item) => item.id === activeCriterionId) ?? null,
    [activeCriterionId, selectedRoundCriteria]
  );

  useEffect(() => {
    const seenIntro = sessionStorage.getItem(INTRO_SEEN_KEY);
    if (seenIntro) {
      setIsBooting(false);
      return;
    }

    const timer = window.setTimeout(() => {
      sessionStorage.setItem(INTRO_SEEN_KEY, '1');
      setIsBooting(false);
    }, 2000);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as PersistedState;
      if (parsed.judgeName) setJudgeName(parsed.judgeName);
      if (parsed.judgeConfirmed) setJudgeConfirmed(parsed.judgeConfirmed);
      if (parsed.selectedRound) setSelectedRound(parsed.selectedRound);
      if (parsed.scores) setScores(normalizeScoresState(parsed.scores));
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
  const isRoundSelectableForContestant = (contestantId: string, round: RoundId): boolean => {
    if (round === 1) return true;
    if (round === 2) return scores[contestantId][1].submitted;
    return scores[contestantId][1].submitted && scores[contestantId][2].submitted;
  };

  const openCriterion = (criterionId: string) => {
    if (!selectedContestant || isRoundLocked) return;

    const criterion = selectedRoundCriteria.find((item) => item.id === criterionId);
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

  if (isBooting) {
    return (
      <div className="min-h-screen grid place-items-center px-4">
        <div className="text-center animate-fadeUp">
          <p className="luminar-loader text-4xl sm:text-6xl font-extrabold tracking-[0.12em]">LUMINAR APPS</p>
        </div>
        <FixedFooter />
      </div>
    );
  }

  if (!judgeConfirmed) {
    return (
      <>
        <WelcomeScreen
          judgeName={judgeName}
          onChangeName={setJudgeName}
          onContinue={() => {
            if (judgeName.trim().length < 2) return;
            setJudgeName(judgeName.trim());
            setJudgeConfirmed(true);
          }}
        />
        <FixedFooter />
      </>
    );
  }

  if (!selectedContestant) {
    return (
      <>
        <ContestantSelection
          judgeName={judgeName}
          contestants={contestants}
          onSelect={setSelectedContestantId}
          onChangeJudge={resetJudge}
        />
        <FixedFooter />
      </>
    );
  }

  const activeValues =
    activeCriterion && selectedContestant
      ? scores[selectedContestant.id][selectedRound].criteria[activeCriterion.id]
      : {};
  const activeCriterionIndex = activeCriterion
    ? selectedRoundCriteria.findIndex((criterion) => criterion.id === activeCriterion.id)
    : -1;

  const allRoundsSubmitted = rounds.every((round) => scores[selectedContestant.id][round].submitted);

  return (
    <>
      <ContestantDashboard
        judgeName={judgeName}
        contestant={selectedContestant}
        roundLabels={roundLabels}
        criteria={selectedRoundCriteria}
        scores={scores}
        selectedRound={selectedRound}
        rounds={rounds}
        onBackToContestants={() => setSelectedContestantId(null)}
        onSelectRound={(round) => {
          if (!isRoundSelectableForContestant(selectedContestant.id, round)) return;
          setSelectedRound(round);
          setActiveCriterionId(null);
        }}
        onOpenCriterion={openCriterion}
        onSubmitRound={() => setSubmitDialogOpen(true)}
        getRoundStatus={(round) => getRoundStatus(scores, selectedContestant.id, round, getRoundCriteria(round))}
        isRoundSelectable={(round) => isRoundSelectableForContestant(selectedContestant.id, round)}
        allRoundsSubmitted={allRoundsSubmitted}
      />

      <CriterionOverlay
        criterion={activeCriterion}
        open={!!activeCriterion}
        criterionIndex={Math.max(activeCriterionIndex, 0)}
        totalCriteria={selectedRoundCriteria.length}
        values={activeValues}
        locked={isRoundLocked}
        isLastCriterion={activeCriterionIndex >= selectedRoundCriteria.length - 1}
        onClose={() => setActiveCriterionId(null)}
        onNextCriterion={() => {
          if (!activeCriterion) return;
          const currentIndex = selectedRoundCriteria.findIndex((criterion) => criterion.id === activeCriterion.id);
          if (currentIndex === -1 || currentIndex === selectedRoundCriteria.length - 1) {
            setActiveCriterionId(null);
            return;
          }
          setActiveCriterionId(selectedRoundCriteria[currentIndex + 1].id);
        }}
        onChangeAspectScore={updateAspectScore}
      />

      <SubmitRoundDialog
        open={submitDialogOpen}
        contestantName={selectedContestant.name}
        roundLabel={roundLabels[selectedRound]}
        onCancel={() => setSubmitDialogOpen(false)}
        onConfirm={handleSubmitRound}
      />

      {justSubmitted ? (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-800 shadow-card animate-fadeUp">
          <span className="inline-flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4" /> Salida enviada correctamente.
          </span>
        </div>
      ) : null}
      <FixedFooter />
    </>
  );
}

function FixedFooter() {
  return (
    <footer className="fixed bottom-0 inset-x-0 z-[60] pointer-events-none">
      <div className="mx-auto w-fit rounded-t-2xl border border-border/80 bg-white/90 px-3 py-1.5 text-[11px] text-muted-foreground shadow-card backdrop-blur">
        Crowns App by LuminarApps 2026 all rights reserved
      </div>
    </footer>
  );
}
