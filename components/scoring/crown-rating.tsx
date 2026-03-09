import { Crown } from 'lucide-react';

interface CrownRatingProps {
  value?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function CrownRating({ value, onChange, disabled }: CrownRatingProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <button
        disabled={disabled}
        onClick={() => onChange(0)}
        className={`h-14 min-w-12 px-4 rounded-2xl border text-lg font-semibold transition ${
          value === 0 ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-white hover:bg-muted'
        }`}
      >
        0
      </button>
      {[1, 2, 3].map((target) => {
        const active = (value ?? -1) >= target;
        return (
          <button
            key={target}
            disabled={disabled}
            onClick={() => onChange(target)}
            className={`h-14 w-14 rounded-2xl border grid place-items-center transition ${
              active
                ? 'border-amber-400 bg-amber-50 text-amber-500 shadow-[0_8px_20px_-12px_rgba(245,158,11,0.9)]'
                : 'border-border bg-white text-slate-300 hover:bg-muted'
            }`}
          >
            <Crown className={`h-7 w-7 ${active ? 'fill-amber-400' : ''}`} />
          </button>
        );
      })}
    </div>
  );
}
