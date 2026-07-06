import { ChevronLeft, ChevronRight, FileText, LayoutGrid, Presentation } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FullscreenButton } from "./components/FullscreenButton";
import { MarkdownReader } from "./components/MarkdownReader";
import { Overview } from "./components/Overview";
import { ProgressBar } from "./components/ProgressBar";
import { Slide } from "./components/Slide";
import { slides } from "./data/slides";
import sourceMarkdown from "../给第二届天融信班学弟学妹们的实训经验分享.md?raw";

const presenterSyncUrl = import.meta.env.VITE_PRESENTER_SYNC_URL ?? "http://127.0.0.1:5175/state";

type ViewMode = "slides" | "source";

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

function getInitialViewMode(): ViewMode {
  return window.location.hash === "#source" ? "source" : "slides";
}

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>(getInitialViewMode);
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

  const showSlides = useCallback(() => {
    setViewMode("slides");
    window.history.replaceState(null, "", `#slide-${current + 1}`);
  }, [current]);

  const showSource = useCallback(() => {
    setViewMode("source");
    setOverviewOpen(false);
    window.history.replaceState(null, "", "#source");
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const previous = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (viewMode === "slides") {
      window.history.replaceState(null, "", `#slide-${current + 1}`);
    }
  }, [current, viewMode]);

  useEffect(() => {
    document.body.style.overflow = viewMode === "source" ? "auto" : "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [viewMode]);

  useEffect(() => {
    if (viewMode !== "slides") {
      return;
    }

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
  }, [current, total, viewMode]);

  useEffect(() => {
    const onHashChange = () => {
      const nextMode = getInitialViewMode();
      setViewMode(nextMode);

      if (nextMode === "slides") {
        setCurrent(getInitialSlide());
      }
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

      if (event.key === "m" || event.key === "M") {
        if (viewMode === "source") {
          showSlides();
        } else {
          showSource();
        }
        return;
      }

      if (viewMode === "source") {
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
  }, [goTo, next, overviewOpen, previous, showSlides, showSource, total, viewMode]);

  const pageLabel = useMemo(
    () => `${String(current + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`,
    [current, total],
  );

  const handleStageClick = (event: React.MouseEvent<HTMLElement>) => {
    if (viewMode === "source") {
      return;
    }

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

  const appShellClassName =
    viewMode === "source"
      ? "min-h-screen overflow-x-hidden bg-[#05070d] text-white"
      : "min-h-screen overflow-hidden bg-[#05070d] text-white";

  return (
    <main className={appShellClassName} onClick={handleStageClick}>
      {viewMode === "source" ? <MarkdownReader content={sourceMarkdown} /> : <Slide slide={slides[current]} current={current} total={total} />}

      <div className="fixed right-4 top-4 z-50 flex items-center gap-2 sm:right-6 sm:top-6">
        <button
          type="button"
          title={viewMode === "source" ? "返回课件" : "阅读原文"}
          aria-label={viewMode === "source" ? "返回课件" : "阅读原文"}
          onClick={viewMode === "source" ? showSlides : showSource}
          className={viewMode === "source" ? "control-button bg-slate-950/70 text-white" : "control-button"}
        >
          {viewMode === "source" ? (
            <Presentation className="h-5 w-5" aria-hidden="true" />
          ) : (
            <FileText className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
        <button
          type="button"
          title="页面概览"
          aria-label="页面概览"
          onClick={() => setOverviewOpen(true)}
          className={viewMode === "source" ? "hidden" : "control-button"}
        >
          <LayoutGrid className="h-5 w-5" aria-hidden="true" />
        </button>
        {viewMode === "slides" ? <FullscreenButton /> : null}
      </div>

      {viewMode === "slides" ? (
        <>
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
        </>
      ) : null}

      {viewMode === "slides" ? (
        <div className="fixed bottom-5 right-4 z-50 rounded-full border border-white/10 bg-black/40 px-4 py-2 font-mono text-sm text-slate-200 backdrop-blur sm:bottom-6 sm:right-6">
          {pageLabel}
        </div>
      ) : null}

      {viewMode === "slides" ? <ProgressBar current={current} total={total} /> : null}

      {overviewOpen && viewMode === "slides" ? (
        <Overview slides={slides} current={current} onClose={() => setOverviewOpen(false)} onSelect={goTo} />
      ) : null}
    </main>
  );
}

export default App;
