import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SubmitRoundDialogProps {
  open: boolean;
  contestantName: string;
  round: number;
  onCancel: () => void;
  onConfirm: () => void;
}

export function SubmitRoundDialog({ open, contestantName, round, onCancel, onConfirm }: SubmitRoundDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-slate-900/30" onClick={onCancel} />
      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 mx-auto max-w-md rounded-3xl border border-border bg-white p-5 shadow-2xl animate-fadeUp">
        <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 grid place-items-center mb-3">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-semibold">Confirmar envío</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          ¿Seguro que deseas enviar la hoja de puntuación de <strong>{contestantName}</strong> en{' '}
          <strong>Ronda {round}</strong>? Luego quedará bloqueada.
        </p>
        <div className="mt-5 flex flex-wrap justify-end gap-2">
          <Button variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
          <Button variant="success" onClick={onConfirm}>
            Enviar y bloquear
          </Button>
        </div>
      </div>
    </div>
  );
}
