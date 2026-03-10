import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AppLogo } from '@/components/brand/app-logo';

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
          <div className="flex justify-center pb-2">
            <AppLogo size="hero" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl">Miss/Mr. Teen Wonder Beauty</CardTitle>
          <CardDescription>
            Bienvenido a la aplicación de Coronas. Aquí podrás evaluar cada participante de forma rápida y clara.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              onContinue();
            }}
          >
          <label className="space-y-2 block">
            <span className="text-sm text-muted-foreground">Nombre del jurado</span>
            <input
              value={judgeName}
              onChange={(event) => onChangeName(event.target.value)}
              placeholder="Ej. Andrea Morales"
              className="h-12 w-full rounded-2xl border border-border bg-white px-4 outline-none transition focus:ring-2 focus:ring-primary/35"
            />
          </label>
          <Button type="submit" size="lg" className="w-full" disabled={judgeName.trim().length < 2}>
            Continuar
          </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
