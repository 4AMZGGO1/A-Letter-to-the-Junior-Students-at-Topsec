type ProgressBarProps = {
  current: number;
  total: number;
};

export function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 h-1 bg-white/10" aria-hidden="true">
      <div
        className="h-full bg-gradient-to-r from-cyan-300 via-emerald-300 to-amber-300 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
