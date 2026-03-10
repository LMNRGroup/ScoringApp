import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface WelcomeScreenProps {
  judgeName: string;
  onChangeName: (name: string) => void;
  onContinue: () => void;
}

export function WelcomeScreen({ judgeName, onChangeName, onContinue }: WelcomeScreenProps) {
  return (
    <div className="section-shell min-h-screen flex items-center">
      <Card className="w-full max-w-xl mx-auto animate-fadeUp">
        <CardHeader>
          <div className="w-fit rounded-2xl gradient-ring p-[1px]">
            <div className="rounded-2xl bg-white px-3 py-2 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
          </div>
          <CardTitle className="text-2xl sm:text-3xl">Miss/Mr. Teen Wonder Beauty</CardTitle>
          <CardDescription>Ingresa tu nombre para iniciar la evaluación.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="space-y-2 block">
            <span className="text-sm text-muted-foreground">Nombre del jurado</span>
            <input
              value={judgeName}
              onChange={(event) => onChangeName(event.target.value)}
              placeholder="Ej. Andrea Morales"
              className="h-12 w-full rounded-2xl border border-border bg-white px-4 outline-none transition focus:ring-2 focus:ring-primary/35"
            />
          </label>
          <Button onClick={onContinue} size="lg" className="w-full" disabled={judgeName.trim().length < 2}>
            Continuar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
