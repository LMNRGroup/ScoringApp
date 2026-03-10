import { ArrowRight, Trophy } from 'lucide-react';
import { Contestant } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AppLogo } from '@/components/brand/app-logo';

interface ContestantSelectionProps {
  judgeName: string;
  contestants: Contestant[];
  onSelect: (contestantId: string) => void;
  onChangeJudge: () => void;
}

export function ContestantSelection({ judgeName, contestants, onSelect, onChangeJudge }: ContestantSelectionProps) {
  return (
    <div className="section-shell animate-fadeUp space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-white/70 border border-border px-4 py-3 shadow-card">
        <div className="flex items-center gap-3">
          <AppLogo />
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Jurado</p>
            <p className="font-semibold text-lg">{judgeName}</p>
          </div>
        </div>
        <Button variant="secondary" size="sm" onClick={onChangeJudge}>
          Cambiar nombre
        </Button>
      </header>

      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-semibold">Selecciona participante</h1>
        <p className="text-sm text-muted-foreground">Escoge a quién deseas puntuar en esta ronda.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {contestants.map((contestant) => (
          <Card key={contestant.id} className="group transition hover:-translate-y-0.5 hover:shadow-soft">
            <CardHeader>
              <div className="w-11 h-11 rounded-2xl gradient-ring p-[1px]">
                <div className="h-full w-full rounded-2xl bg-white grid place-content-center text-primary">
                  <Trophy className="h-5 w-5" />
                </div>
              </div>
              <CardTitle>{contestant.name}</CardTitle>
              <CardDescription>Participante en evaluación</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => onSelect(contestant.id)}>
                Abrir Panel <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
