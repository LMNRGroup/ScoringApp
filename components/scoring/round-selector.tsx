import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RoundId } from '@/lib/types';

interface RoundSelectorProps {
  rounds: RoundId[];
  selectedRound: RoundId;
  onSelectRound: (round: RoundId) => void;
  getStatus: (round: RoundId) => 'not_started' | 'in_progress' | 'submitted';
}

const statusLabel = {
  not_started: 'No iniciada',
  in_progress: 'En progreso',
  submitted: 'Enviada',
} as const;

const statusVariant = {
  not_started: 'default',
  in_progress: 'warning',
  submitted: 'success',
} as const;

export function RoundSelector({ rounds, selectedRound, onSelectRound, getStatus }: RoundSelectorProps) {
  return (
    <div className="rounded-3xl border border-border bg-white/80 p-3 shadow-card">
      <p className="px-1 pb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">Rondas</p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {rounds.map((round) => {
          const status = getStatus(round);
          return (
            <button
              key={round}
              onClick={() => onSelectRound(round)}
              className={`rounded-2xl border p-3 text-left transition ${
                selectedRound === round
                  ? 'border-primary bg-primary/5 shadow-soft'
                  : 'border-border bg-white hover:border-primary/40'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium">Ronda {round}</p>
                <Badge variant={statusVariant[status]}>{statusLabel[status]}</Badge>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
