import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppLogoProps {
  size?: 'lg' | 'sm';
  className?: string;
}

export function AppLogo({ size = 'sm', className }: AppLogoProps) {
  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <span
        className={cn(
          'logo-gold animate-logoGlow',
          size === 'lg' ? 'h-24 w-24 sm:h-28 sm:w-28' : 'h-10 w-10 sm:h-11 sm:w-11'
        )}
        aria-label="Logo Miss/Mr. Teen Wonder Beauty"
      />
      <span className={cn('logo-sparkle', size === 'lg' ? '-right-1.5 top-1' : '-right-1 top-0.5')}>
        <Sparkles className={cn('text-amber-200/95', size === 'lg' ? 'h-5 w-5' : 'h-3.5 w-3.5')} />
      </span>
    </div>
  );
}
