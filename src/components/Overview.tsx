import { X } from "lucide-react";
import type { Slide } from "../data/slides";

type OverviewProps = {
  slides: Slide[];
  current: number;
  onClose: () => void;
  onSelect: (index: number) => void;
};

export function Overview({ slides, current, onClose, onSelect }: OverviewProps) {
  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto bg-[#05070d]/95 px-4 py-6 backdrop-blur-md sm:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div>
          <p className="text-sm text-cyan-200">Overview</p>
          <h2 className="mt-1 text-3xl font-semibold text-white">页面概览</h2>
        </div>
        <button type="button" title="关闭概览" aria-label="关闭概览" onClick={onClose} className="control-button">
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="mx-auto mt-8 grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => onSelect(index)}
            className={`min-h-[180px] rounded-xl border p-5 text-left transition hover:-translate-y-1 hover:border-cyan-200/70 ${
              index === current
                ? "border-cyan-200/70 bg-cyan-300/15"
                : "border-white/10 bg-white/[0.05]"
            }`}
          >
            <span className="text-sm text-slate-400">{String(index + 1).padStart(2, "0")}</span>
            <p className="mt-5 text-sm text-cyan-100">{slide.eyebrow}</p>
            <h3 className="mt-2 text-xl font-semibold leading-snug text-white">{slide.title}</h3>
          </button>
        ))}
      </div>
    </div>
  );
}
