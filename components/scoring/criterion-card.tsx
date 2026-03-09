import { CheckCircle2, ChevronRight, Lock, PencilLine } from 'lucide-react';
import { Criterion } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

interface CriterionCardProps {
  criterion: Criterion;
  total: number;
  completed: boolean;
  locked: boolean;
  onOpen: () => void;
}

export function CriterionCard({ criterion, total, completed, locked, onOpen }: CriterionCardProps) {
  return (
    <button
      onClick={onOpen}
      disabled={locked}
      className={`w-full rounded-3xl border bg-white/85 p-4 text-left shadow-card transition sm:p-5 ${
        completed
          ? 'border-emerald-200 bg-emerald-50/70'
          : 'border-border hover:-translate-y-[1px] hover:border-primary/35'
      } ${locked ? 'opacity-80' : ''}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-lg font-semibold leading-tight">{criterion.name}</p>
          <p className="text-xs text-muted-foreground">{criterion.aspects.length} aspectos</p>
        </div>

        <div className="flex items-center gap-2">
          {locked ? <Badge variant="default"><Lock className="h-3 w-3 mr-1" />Bloqueado</Badge> : null}
          {completed ? (
            <Badge variant="success">
              <CheckCircle2 className="h-3 w-3 mr-1" />Completo
            </Badge>
          ) : (
            <Badge variant="warning">
              <PencilLine className="h-3 w-3 mr-1" />Pendiente
            </Badge>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Puntaje acumulado</p>
        <div className="flex items-center gap-2">
          <p className="text-xl font-semibold">{total}</p>
          {!locked ? <ChevronRight className="h-4 w-4 text-muted-foreground" /> : null}
        </div>
      </div>
    </button>
  );
}
