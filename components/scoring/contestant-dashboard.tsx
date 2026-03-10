import { ArrowLeft, CheckCircle2, Lock, Medal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Criterion, Contestant, RoundId, ScoresState } from '@/lib/types';
import {
  getCriterionCompleted,
  getCriterionTotal,
  getRoundCompletedCount,
  getRoundStatus,
  getRoundTotalPoints,
} from '@/lib/scoring';
import { CriterionCard } from '@/components/scoring/criterion-card';
import { RoundSelector } from '@/components/scoring/round-selector';
import { AppLogo } from '@/components/brand/app-logo';

interface ContestantDashboardProps {
  judgeName: string;
  contestant: Contestant;
  criteria: Criterion[];
  scores: ScoresState;
  selectedRound: RoundId;
  rounds: RoundId[];
  onBackToContestants: () => void;
  onSelectRound: (round: RoundId) => void;
  onOpenCriterion: (criterionId: string) => void;
  onSubmitRound: () => void;
  isRoundSelectable: (round: RoundId) => boolean;
  allRoundsSubmitted: boolean;
}

export function ContestantDashboard({
  judgeName,
  contestant,
  criteria,
  scores,
  selectedRound,
  rounds,
  onBackToContestants,
  onSelectRound,
  onOpenCriterion,
  onSubmitRound,
  isRoundSelectable,
  allRoundsSubmitted,
}: ContestantDashboardProps) {
  const roundData = scores[contestant.id][selectedRound];
  const completedCount = getRoundCompletedCount(scores, contestant.id, selectedRound, criteria);
  const points = getRoundTotalPoints(scores, contestant.id, selectedRound, criteria);
  const allDone = completedCount === criteria.length;

  return (
    <div className="section-shell animate-fadeUp space-y-5">
      <header className="rounded-3xl border border-border bg-white/80 p-4 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AppLogo />
            <Button variant="ghost" onClick={onBackToContestants}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Participantes
            </Button>
          </div>
          <Badge variant="primary">Jurado: {judgeName}</Badge>
        </div>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Panel de evaluación</p>
            <h1 className="text-2xl sm:text-3xl font-semibold">{contestant.name}</h1>
          </div>
          {roundData.submitted ? (
            <Badge variant="success">
              <Lock className="h-3 w-3 mr-1" /> Ronda bloqueada
            </Badge>
          ) : (
            <Badge variant="warning">Edición activa</Badge>
          )}
        </div>
      </header>

      <RoundSelector
        rounds={rounds}
        selectedRound={selectedRound}
        onSelectRound={onSelectRound}
        getStatus={(round) => getRoundStatus(scores, contestant.id, round, criteria)}
        isRoundSelectable={isRoundSelectable}
      />

      {allRoundsSubmitted ? (
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Resultado final cerrado. Las 3 rondas están enviadas y bloqueadas.
        </div>
      ) : null}

      <section className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-3xl border border-border bg-white/85 p-4 shadow-card">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Criterios completados</p>
          <p className="mt-2 text-3xl font-semibold">{completedCount}/7</p>
        </div>
        <div className="rounded-3xl border border-border bg-white/85 p-4 shadow-card">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Puntos acumulados</p>
          <p className="mt-2 text-3xl font-semibold">{points}</p>
        </div>
        <div className="rounded-3xl border border-border bg-white/85 p-4 shadow-card">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Ronda actual</p>
          <p className="mt-2 text-3xl font-semibold">{selectedRound}</p>
        </div>
      </section>

      <section className="space-y-3">
        {criteria.map((criterion) => {
          const completed = getCriterionCompleted(scores, contestant.id, selectedRound, criterion);
          const total = getCriterionTotal(scores, contestant.id, selectedRound, criterion);

          return (
            <CriterionCard
              key={criterion.id}
              criterion={criterion}
              total={total}
              completed={completed}
              locked={roundData.submitted}
              onOpen={() => onOpenCriterion(criterion.id)}
            />
          );
        })}
      </section>

      <footer className="sticky bottom-3 z-20 pb-[env(safe-area-inset-bottom)]">
        <div className="rounded-3xl border border-border bg-white/95 p-3 shadow-soft backdrop-blur">
          <Button className="w-full" size="lg" variant="success" onClick={onSubmitRound} disabled={!allDone || roundData.submitted}>
            {roundData.submitted ? (
              <>
                <Lock className="h-4 w-4 mr-1" /> Ronda enviada
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4 mr-1" /> Enviar ronda {selectedRound}
              </>
            )}
          </Button>
          {!roundData.submitted ? (
            <p className="mt-2 text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
              <Medal className="h-3 w-3" />
              Completa los 7 criterios para habilitar el envío
            </p>
          ) : null}
        </div>
      </footer>
    </div>
  );
}
