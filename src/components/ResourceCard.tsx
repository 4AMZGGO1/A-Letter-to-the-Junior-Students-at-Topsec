import { ExternalLink } from "lucide-react";
import type { Resource } from "../data/slides";

type ResourceCardProps = {
  resource: Resource;
};

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <article className="surface-card flex h-full flex-col justify-between gap-5 p-5 sm:p-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-sm text-cyan-100">
            {resource.tag}
          </span>
        </div>
        <h3 className="text-2xl font-semibold text-white">{resource.name}</h3>
        <p className="text-base leading-relaxed text-slate-300">{resource.description}</p>
      </div>
      <a
        href={resource.url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex w-fit items-center gap-2 rounded-lg border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-base font-medium text-emerald-100 transition hover:border-emerald-200 hover:bg-emerald-300/20"
      >
        打开资源
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </a>
    </article>
  );
}
