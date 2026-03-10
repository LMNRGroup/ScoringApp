import Image from 'next/image';
import { cn } from '@/lib/utils';
import MrMissLogo from '@/assets/Mr_Miss_Logo.png';

interface AppLogoProps {
  size?: 'lg' | 'sm';
  className?: string;
}

export function AppLogo({ size = 'sm', className }: AppLogoProps) {
  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <Image
        src={MrMissLogo}
        alt="Logo Miss/Mr. Teen Wonder Beauty"
        priority
        className={cn(
          'object-contain',
          size === 'lg' ? 'h-24 w-24 sm:h-28 sm:w-28' : 'h-10 w-10 sm:h-11 sm:w-11'
        )}
        sizes={size === 'lg' ? '(min-width: 640px) 112px, 96px' : '(min-width: 640px) 44px, 40px'}
      />
    </div>
  );
}
