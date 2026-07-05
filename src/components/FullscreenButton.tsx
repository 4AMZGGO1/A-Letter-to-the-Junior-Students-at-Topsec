import { Maximize2, Minimize2 } from "lucide-react";
import { useEffect, useState } from "react";

export function FullscreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const updateState = () => setIsFullscreen(Boolean(document.fullscreenElement));
    updateState();
    document.addEventListener("fullscreenchange", updateState);
    return () => document.removeEventListener("fullscreenchange", updateState);
  }, []);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      return;
    }

    await document.exitFullscreen();
  };

  const Icon = isFullscreen ? Minimize2 : Maximize2;

  return (
    <button
      type="button"
      title={isFullscreen ? "退出全屏" : "全屏展示"}
      aria-label={isFullscreen ? "退出全屏" : "全屏展示"}
      onClick={toggleFullscreen}
      className="control-button"
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
