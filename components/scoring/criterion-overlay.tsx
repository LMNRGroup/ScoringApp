import { CheckCircle2, Crown, X } from 'lucide-react';
import { Criterion } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { CrownRating } from '@/components/scoring/crown-rating';
import { AppLogo } from '@/components/brand/app-logo';

interface CriterionOverlayProps {
  criterion: Criterion | null;
  criterionIndex: number;
  totalCriteria: number;
  open: boolean;
  values: Record<string, number | undefined>;
  locked: boolean;
  isLastCriterion: boolean;
  onClose: () => void;
  onChangeAspectScore: (aspectId: string, score: number) => void;
  onNextCriterion: () => void;
}

export function CriterionOverlay({
  criterion,
  criterionIndex,
  totalCriteria,
  open,
  values,
  locked,
  isLastCriterion,
  onClose,
  onChangeAspectScore,
  onNextCriterion,
}: CriterionOverlayProps) {
  if (!open || !criterion) return null;

  const allAspectsScored = criterion.aspects.every((aspect) => values[aspect.id] !== undefined);

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px]" onClick={onClose} />
      <div className="absolute inset-x-0 bottom-0 max-h-[92vh] overflow-y-auto rounded-t-[2rem] border border-border bg-white p-5 pb-[calc(env(safe-area-inset-bottom)+1rem)] shadow-2xl sm:inset-6 sm:rounded-[2rem] sm:max-w-3xl sm:mx-auto sm:max-h-[88vh] animate-fadeUp">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <AppLogo />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Criterio {criterionIndex + 1} de {totalCriteria}
              </p>
              <h2 className="text-xl font-semibold">{criterion.name}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {allAspectsScored ? 'Completo' : 'Pendiente'}
            </p>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {criterion.aspects.map((aspect) => (
            <div key={aspect.id} className="rounded-2xl bg-muted/70 p-4">
              <p className="text-sm text-muted-foreground">Aspecto</p>
              <p className="mt-1 text-lg font-medium">{aspect.name}</p>
              <div className="mt-3">
                <CrownRating
                  value={values[aspect.id]}
                  onChange={(score) => onChangeAspectScore(aspect.id, score)}
                  disabled={locked}
                />
              </div>
            </div>
          ))}
        </div>

        {criterion.crownGuide?.length ? (
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-800">Guía de coronas</p>
            <div className="mt-2 space-y-1.5 text-sm text-amber-900">
              {criterion.crownGuide
                .slice()
                .sort((a, b) => b.crowns - a.crowns)
                .map((item) => (
                  <p key={`${criterion.id}-${item.crowns}`}>
                    <strong>{item.crowns} coronas:</strong> {item.description}
                  </p>
                ))}
            </div>
          </div>
        ) : null}

        {locked ? (
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Esta salida ya fue enviada. Solo lectura.
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground flex items-center gap-2">
            <Crown className="h-3.5 w-3.5" /> Puntúa todos los aspectos con 0 a 3 coronas.
          </p>

          <Button onClick={onNextCriterion} disabled={!allAspectsScored || locked}>
            {isLastCriterion ? (
              <>
                <CheckCircle2 className="h-4 w-4 mr-1" /> Finalizar
              </>
            ) : (
              'Siguiente criterio'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
