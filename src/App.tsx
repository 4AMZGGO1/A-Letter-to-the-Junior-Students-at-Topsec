import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FullscreenButton } from "./components/FullscreenButton";
import { Overview } from "./components/Overview";
import { ProgressBar } from "./components/ProgressBar";
import { Slide } from "./components/Slide";
import { slides } from "./data/slides";

const presenterSyncUrl = import.meta.env.VITE_PRESENTER_SYNC_URL ?? "http://127.0.0.1:5175/state";

function getInitialSlide() {
  const match = window.location.hash.match(/slide-(\d+)/);
  if (!match) {
    return 0;
  }

  const parsed = Number(match[1]);
  if (Number.isNaN(parsed)) {
    return 0;
  }

  return Math.min(Math.max(parsed - 1, 0), slides.length - 1);
}

function App() {
  const [current, setCurrent] = useState(getInitialSlide);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const total = slides.length;

  const goTo = useCallback(
    (index: number) => {
      setCurrent(Math.min(Math.max(index, 0), total - 1));
      setOverviewOpen(false);
    },
    [total],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const previous = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    window.history.replaceState(null, "", `#slide-${current + 1}`);
  }, [current]);

  useEffect(() => {
    const slide = slides[current];

    void fetch(presenterSyncUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        index: current,
        id: slide.id,
        title: slide.title,
        total,
      }),
    }).catch(() => {
      // The deck should keep working even when the presenter notes server is not running.
    });
  }, [current, total]);

  useEffect(() => {
    const onHashChange = () => {
      setCurrent(getInitialSlide());
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.closest("input, textarea, select, [contenteditable='true']")) {
        return;
      }

      if (event.key === "Escape" && overviewOpen) {
        setOverviewOpen(false);
        return;
      }

      if (event.key === "o" || event.key === "O") {
        setOverviewOpen((value) => !value);
        return;
      }

      if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();
        next();
        return;
      }

      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        previous();
        return;
      }

      if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
        return;
      }

      if (event.key === "End") {
        event.preventDefault();
        goTo(total - 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo, next, overviewOpen, previous, total]);

  const pageLabel = useMemo(
    () => `${String(current + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`,
    [current, total],
  );

  const handleStageClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest("button, a, [data-no-nav]") || overviewOpen) {
      return;
    }

    const width = window.innerWidth;
    if (event.clientX < width * 0.34) {
      previous();
      return;
    }

    if (event.clientX > width * 0.66) {
      next();
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#05070d] text-white" onClick={handleStageClick}>
      <Slide slide={slides[current]} current={current} total={total} />

      <div className="fixed right-4 top-4 z-50 flex items-center gap-2 sm:right-6 sm:top-6">
        <button
          type="button"
          title="页面概览"
          aria-label="页面概览"
          onClick={() => setOverviewOpen(true)}
          className="control-button"
        >
          <LayoutGrid className="h-5 w-5" aria-hidden="true" />
        </button>
        <FullscreenButton />
      </div>

      <button
        type="button"
        title="上一页"
        aria-label="上一页"
        onClick={previous}
        disabled={current === 0}
        className="nav-button left-3 sm:left-5"
      >
        <ChevronLeft className="h-6 w-6" aria-hidden="true" />
      </button>
      <button
        type="button"
        title="下一页"
        aria-label="下一页"
        onClick={next}
        disabled={current === total - 1}
        className="nav-button right-3 sm:right-5"
      >
        <ChevronRight className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="fixed bottom-5 right-4 z-50 rounded-full border border-white/10 bg-black/40 px-4 py-2 font-mono text-sm text-slate-200 backdrop-blur sm:bottom-6 sm:right-6">
        {pageLabel}
      </div>

      <ProgressBar current={current} total={total} />

      {overviewOpen ? (
        <Overview slides={slides} current={current} onClose={() => setOverviewOpen(false)} onSelect={goTo} />
      ) : null}
    </main>
  );
}

export default App;
