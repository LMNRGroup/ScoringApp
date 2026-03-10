import { Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { RoundId } from '@/lib/types';

interface RoundSelectorProps {
  rounds: RoundId[];
  selectedRound: RoundId;
  onSelectRound: (round: RoundId) => void;
  getStatus: (round: RoundId) => 'not_started' | 'in_progress' | 'submitted';
  isRoundSelectable: (round: RoundId) => boolean;
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

export function RoundSelector({ rounds, selectedRound, onSelectRound, getStatus, isRoundSelectable }: RoundSelectorProps) {
  return (
    <div className="rounded-3xl border border-border bg-white/80 p-3 shadow-card">
      <p className="px-1 pb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">Rondas</p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {rounds.map((round) => {
          const status = getStatus(round);
          const selectable = isRoundSelectable(round);
          return (
            <button
              key={round}
              disabled={!selectable}
              onClick={() => onSelectRound(round)}
              className={`rounded-2xl border p-3 text-left transition ${
                selectedRound === round
                  ? 'border-primary bg-primary/5 shadow-soft'
                  : 'border-border bg-white'
              } ${selectable ? 'hover:border-primary/40' : 'opacity-60 cursor-not-allowed'}`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium">Ronda {round}</p>
                {selectable ? (
                  <Badge variant={statusVariant[status]}>{statusLabel[status]}</Badge>
                ) : (
                  <Badge variant="default">
                    <Lock className="h-3 w-3 mr-1" />
                    Bloqueada
                  </Badge>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
