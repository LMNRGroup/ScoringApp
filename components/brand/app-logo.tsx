import Image from 'next/image';
import { cn } from '@/lib/utils';
import MrMissLogo from '@/assets/Mr_Miss_Logo.png';

interface AppLogoProps {
  size?: 'hero' | 'xl' | 'lg' | 'sm';
  className?: string;
}

export function AppLogo({ size = 'sm', className }: AppLogoProps) {
  const dimensions =
    size === 'hero'
      ? 'h-44 w-44 sm:h-52 sm:w-52'
      : size === 'xl'
        ? 'h-28 w-28 sm:h-32 sm:w-32'
        : size === 'lg'
          ? 'h-24 w-24 sm:h-28 sm:w-28'
          : 'h-10 w-10 sm:h-11 sm:w-11';

  const responsiveSizes =
    size === 'hero'
      ? '(min-width: 640px) 208px, 176px'
      : size === 'xl'
        ? '(min-width: 640px) 128px, 112px'
        : size === 'lg'
          ? '(min-width: 640px) 112px, 96px'
          : '(min-width: 640px) 44px, 40px';

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <Image
        src={MrMissLogo}
        alt="Logo Miss/Mr. Teen Wonder Beauty"
        priority
        className={cn('object-contain', dimensions)}
        sizes={responsiveSizes}
      />
    </div>
  );
}
