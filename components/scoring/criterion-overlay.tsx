import { CheckCircle2, ChevronLeft, ChevronRight, Crown, X } from 'lucide-react';
import { Criterion } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { CrownRating } from '@/components/scoring/crown-rating';

interface CriterionOverlayProps {
  criterion: Criterion | null;
  open: boolean;
  currentAspectIndex: number;
  values: Record<string, number | undefined>;
  locked: boolean;
  onClose: () => void;
  onChangeAspectScore: (aspectId: string, score: number) => void;
  onBack: () => void;
  onNext: () => void;
  onFinish: () => void;
}

export function CriterionOverlay({
  criterion,
  open,
  currentAspectIndex,
  values,
  locked,
  onClose,
  onChangeAspectScore,
  onBack,
  onNext,
  onFinish,
}: CriterionOverlayProps) {
  if (!open || !criterion) return null;

  const currentAspect = criterion.aspects[currentAspectIndex];
  const currentValue = values[currentAspect.id];
  const isLast = currentAspectIndex === criterion.aspects.length - 1;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px]" onClick={onClose} />
      <div className="absolute inset-x-0 bottom-0 max-h-[92vh] overflow-y-auto rounded-t-[2rem] border border-border bg-white p-5 pb-[calc(env(safe-area-inset-bottom)+1rem)] shadow-2xl sm:inset-6 sm:rounded-[2rem] sm:max-w-2xl sm:mx-auto sm:max-h-[88vh] animate-fadeUp">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Criterio</p>
            <h2 className="text-xl font-semibold">{criterion.name}</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="mt-5 rounded-2xl bg-muted/70 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Aspecto {currentAspectIndex + 1} de {criterion.aspects.length}
          </p>
          <p className="mt-2 text-xl font-medium">{currentAspect.name}</p>
          <div className="mt-4">
            <CrownRating value={currentValue} onChange={(score) => onChangeAspectScore(currentAspect.id, score)} disabled={locked} />
          </div>
        </div>

        {locked ? (
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Esta ronda ya fue enviada. Solo lectura.
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
          <Button variant="secondary" onClick={onBack} disabled={currentAspectIndex === 0 || locked}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Atrás
          </Button>

          {isLast ? (
            <Button onClick={onFinish} variant="success" disabled={currentValue === undefined || locked}>
              <CheckCircle2 className="h-4 w-4 mr-1" /> Finalizar criterio
            </Button>
          ) : (
            <Button onClick={onNext} disabled={currentValue === undefined || locked}>
              Siguiente <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>

        <div className="mt-5 text-xs text-muted-foreground flex items-center gap-2">
          <Crown className="h-3.5 w-3.5" />
          Puntúa cada aspecto con 0 a 3 coronas.
        </div>
      </div>
    </div>
  );
}
