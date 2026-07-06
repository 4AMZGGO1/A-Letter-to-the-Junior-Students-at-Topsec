import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Bug,
  CheckCircle2,
  Code2,
  Coffee,
  Droplets,
  FileText,
  GitBranch,
  Globe2,
  GraduationCap,
  HardDrive,
  Home,
  Laptop,
  ListChecks,
  MapPin,
  MessageSquareText,
  Presentation,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Utensils,
  Wifi,
  type LucideIcon,
  Wrench,
} from "lucide-react";
import type { Slide as SlideData } from "../data/slides";
import { ResourceCard } from "./ResourceCard";
import { SkillMap } from "./SkillMap";

type SlideProps = {
  slide: SlideData;
  current: number;
  total: number;
};

const iconMap: Record<string, LucideIcon> = {
  AlertTriangle,
  BookOpen,
  BrainCircuit,
  Bug,
  CheckCircle2,
  Code2,
  Coffee,
  Droplets,
  FileText,
  GitBranch,
  Globe2,
  GraduationCap,
  HardDrive,
  Home,
  Laptop,
  ListChecks,
  MapPin,
  MessageSquareText,
  Presentation,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Utensils,
  Wifi,
  Wrench,
};

function Header({ slide }: { slide: SlideData }) {
  return (
    <div className="max-w-5xl">
      {slide.eyebrow ? <p className="eyebrow">{slide.eyebrow}</p> : null}
      <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">{slide.title}</h1>
      {slide.subtitle ? <p className="mt-4 max-w-4xl text-lg leading-relaxed text-slate-300 lg:text-xl">{slide.subtitle}</p> : null}
    </div>
  );
}

function PointList({ points }: { points?: string[] }) {
  if (!points?.length) {
    return null;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {points.map((point) => (
        <div key={point} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-3">
          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-200" aria-hidden="true" />
          <p className="text-base leading-relaxed text-slate-100">{point}</p>
        </div>
      ))}
    </div>
  );
}

function CoverSlide({ slide }: { slide: SlideData }) {
  return (
    <div className="relative z-10 grid min-h-[calc(100vh-7rem)] items-center py-16">
      <div className="max-w-6xl">
        <p className="eyebrow">{slide.eyebrow}</p>
        <h1 className="mt-6 max-w-6xl text-5xl font-semibold leading-tight text-white sm:text-7xl lg:text-8xl">
          {(slide.titleLines ?? [slide.title]).map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="mt-8 max-w-3xl text-2xl leading-relaxed text-cyan-100 sm:text-3xl">{slide.subtitle}</p>
        {slide.speaker ? (
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <div className="border-l-2 border-cyan-200 pl-5">
              <p className="text-2xl font-semibold text-white">{slide.speaker.name}</p>
              <p className="mt-2 text-lg text-slate-300">{slide.speaker.meta}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {slide.points?.map((point) => (
                <span key={point} className="skill-chip">
                  {point}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function TagCloudSlide({ slide }: { slide: SlideData }) {
  return (
    <div className="relative z-10 space-y-10">
      <Header slide={slide} />
      <div className="flex flex-wrap gap-4">
        {slide.tags?.map((tag, index) => (
          <span
            key={tag}
            className={`rounded-2xl border px-5 py-3 font-semibold shadow-glow ${
              index % 3 === 0
                ? "border-cyan-200/30 bg-cyan-300/10 text-cyan-50"
                : index % 3 === 1
                  ? "border-emerald-200/30 bg-emerald-300/10 text-emerald-50"
                  : "border-amber-200/30 bg-amber-300/10 text-amber-50"
            } ${index % 4 === 0 ? "text-4xl" : index % 4 === 1 ? "text-3xl" : "text-2xl"}`}
          >
            {tag}
          </span>
        ))}
      </div>
      <PointList points={slide.points} />
    </div>
  );
}

function CapabilitiesSlide({ slide }: { slide: SlideData }) {
  return (
    <div className="relative z-10 space-y-7">
      <Header slide={slide} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {slide.cards?.map((card) => {
          const Icon = iconMap[card.icon ?? "Sparkles"] ?? Sparkles;

          return (
            <article key={card.title} className="surface-card p-4 sm:p-5">
              <Icon className="h-7 w-7 text-cyan-200" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-semibold text-white">{card.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-slate-300">{card.body}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function TaskBoardSlide({ slide }: { slide: SlideData }) {
  return (
    <div className="relative z-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
      <Header slide={slide} />
      <div className="terminal-panel shadow-panel">
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-amber-300" />
          <span className="h-3 w-3 rounded-full bg-emerald-300" />
          <span className="ml-3 font-mono text-sm text-slate-400">agent-tasks.log</span>
        </div>
        <div className="space-y-3 p-4">
          {slide.tasks?.map((task, index) => (
            <div key={task.title} className="grid gap-3 rounded-lg border border-white/10 bg-black/25 p-3 sm:grid-cols-[auto_1fr]">
              <span className="font-mono text-base text-cyan-200">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-lg font-semibold text-white">{task.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{task.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuoteSlide({ slide }: { slide: SlideData }) {
  return (
    <div className="relative z-10 grid min-h-[calc(100vh-7rem)] items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p className="eyebrow">{slide.eyebrow}</p>
        <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-tight text-white sm:text-6xl">{slide.title}</h1>
        <blockquote className="mt-10 border-l-4 border-cyan-200 pl-6 text-4xl font-semibold leading-tight text-cyan-50 sm:text-6xl">
          {slide.quote}
        </blockquote>
      </div>
      <div className="space-y-4">
        {slide.points?.map((point) => (
          <div key={point} className="surface-card flex items-start gap-4 p-5">
            <AlertTriangle className="mt-1 h-6 w-6 shrink-0 text-amber-200" aria-hidden="true" />
            <p className="text-xl leading-relaxed text-slate-100">{point}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompareSlide({ slide }: { slide: SlideData }) {
  if (!slide.compare) {
    return null;
  }

  return (
    <div className="relative z-10 space-y-10">
      <Header slide={slide} />
      <div className="grid gap-5 lg:grid-cols-2">
        <section className="surface-card border-amber-200/20 p-6 sm:p-8">
          <h3 className="text-3xl font-semibold text-amber-100">{slide.compare.leftTitle}</h3>
          <div className="mt-6 space-y-4">
            {slide.compare.leftItems.map((item) => (
              <p key={item} className="rounded-lg border border-white/10 bg-black/20 p-4 text-xl text-slate-200">
                {item}
              </p>
            ))}
          </div>
        </section>
        <section className="surface-card border-emerald-200/25 p-6 sm:p-8">
          <h3 className="text-3xl font-semibold text-emerald-100">{slide.compare.rightTitle}</h3>
          <div className="mt-6 space-y-4">
            {slide.compare.rightItems.map((item) => (
              <p key={item} className="rounded-lg border border-emerald-200/15 bg-emerald-300/10 p-4 text-xl text-slate-100">
                {item}
              </p>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function FlowSlide({ slide }: { slide: SlideData }) {
  return (
    <div className="relative z-10 space-y-10">
      <Header slide={slide} />
      <div className="grid gap-4 lg:grid-cols-6">
        {slide.flow?.map((step, index) => (
          <div key={step} className="relative">
            <div className="surface-card min-h-[150px] p-5">
              <span className="font-mono text-lg text-cyan-200">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 text-2xl font-semibold text-white">{step}</h3>
            </div>
            {index < (slide.flow?.length ?? 0) - 1 ? (
              <ArrowRight className="absolute right-[-18px] top-1/2 hidden h-6 w-6 -translate-y-1/2 text-cyan-200 lg:block" aria-hidden="true" />
            ) : null}
          </div>
        ))}
      </div>
      <PointList points={slide.points} />
    </div>
  );
}

function FocusSlide({ slide }: { slide: SlideData }) {
  return (
    <div className="relative z-10 grid min-h-[calc(100vh-7rem)] items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
      <Header slide={slide} />
      <div className="space-y-4">
        {slide.points?.map((point, index) => (
          <div key={point} className="surface-card flex items-start gap-4 p-5 sm:p-6">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-cyan-200/25 bg-cyan-300/10 font-mono text-cyan-100">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="text-xl leading-relaxed text-slate-100">{point}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExpansionSlide({ slide }: { slide: SlideData }) {
  return (
    <div className="relative z-10 space-y-6">
      <Header slide={slide} />
      {slide.quote ? (
        <p className="inline-flex rounded-xl border border-cyan-200/25 bg-cyan-300/10 px-4 py-2 text-xl font-semibold text-cyan-50">
          {slide.quote}
        </p>
      ) : null}
      <div className="grid gap-4">
        {slide.expansions?.map((row) => (
          <section key={row.topic} className="grid gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-4 lg:grid-cols-[0.8fr_1fr_1.4fr]">
            <h3 className="text-xl font-semibold text-white">{row.topic}</h3>
            <p className="text-base leading-relaxed text-slate-300">{row.classTask}</p>
            <div className="flex flex-wrap gap-2">
              {row.explore.map((item) => (
                <span key={item} className="skill-chip">
                  {item}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function InterviewSlide({ slide }: { slide: SlideData }) {
  return (
    <div className="relative z-10 space-y-10">
      <Header slide={slide} />
      <div className="grid gap-5 lg:grid-cols-3">
        {slide.stages?.map((stage, index) => (
          <section key={stage.title} className="surface-card p-6">
            <span className="font-mono text-lg text-cyan-200">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="mt-4 text-3xl font-semibold text-white">{stage.title}</h3>
            <div className="mt-6 space-y-3">
              {stage.items.map((item) => (
                <p key={item} className="flex items-start gap-3 text-lg leading-relaxed text-slate-200">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-200" aria-hidden="true" />
                  {item}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function SkillMapSlide({ slide }: { slide: SlideData }) {
  return (
    <div className="relative z-10 space-y-6">
      <Header slide={slide} />
      <SkillMap groups={slide.skillGroups ?? []} />
    </div>
  );
}

function ResourcesSlide({ slide }: { slide: SlideData }) {
  return (
    <div className="relative z-10 space-y-6">
      <Header slide={slide} />
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {slide.resources?.map((resource) => (
          <ResourceCard key={resource.url} resource={resource} />
        ))}
      </div>
    </div>
  );
}

function ClosingSlide({ slide }: { slide: SlideData }) {
  return (
    <div className="relative z-10 grid min-h-[calc(100vh-7rem)] items-center">
      <div className="max-w-6xl">
        <p className="eyebrow">{slide.eyebrow}</p>
        <h1 className="mt-6 text-5xl font-semibold leading-tight text-white sm:text-7xl">{slide.title}</h1>
        <p className="mt-8 max-w-4xl text-2xl leading-relaxed text-cyan-100 sm:text-3xl">{slide.subtitle}</p>
        {slide.closing ? (
          <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1fr] lg:items-end">
            <div>
              <p className="text-6xl font-semibold text-white sm:text-8xl">{slide.closing.headline}</p>
              <p className="mt-4 text-4xl font-semibold text-emerald-200">{slide.closing.subline}</p>
            </div>
            <div className="space-y-3">
              {slide.closing.footer.map((item) => (
                <p key={item} className="rounded-xl border border-white/10 bg-white/[0.05] px-5 py-4 text-xl text-slate-200">
                  {item}
                </p>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function Slide({ slide, current, total }: SlideProps) {
  const renderSlide = () => {
    switch (slide.layout) {
      case "cover":
        return <CoverSlide slide={slide} />;
      case "tagCloud":
        return <TagCloudSlide slide={slide} />;
      case "capabilities":
        return <CapabilitiesSlide slide={slide} />;
      case "taskBoard":
        return <TaskBoardSlide slide={slide} />;
      case "quote":
        return <QuoteSlide slide={slide} />;
      case "compare":
        return <CompareSlide slide={slide} />;
      case "flow":
        return <FlowSlide slide={slide} />;
      case "focus":
        return <FocusSlide slide={slide} />;
      case "expansion":
        return <ExpansionSlide slide={slide} />;
      case "interview":
        return <InterviewSlide slide={slide} />;
      case "skillMap":
        return <SkillMapSlide slide={slide} />;
      case "resources":
        return <ResourcesSlide slide={slide} />;
      case "closing":
        return <ClosingSlide slide={slide} />;
      default:
        return null;
    }
  };

  return (
    <section className="slide-stage" aria-label={`${current + 1} / ${total} ${slide.title}`}>
      <div className="tech-grid" aria-hidden="true" />
      <div className="scan-beam" aria-hidden="true" />
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col justify-center px-5 py-12 sm:px-10 lg:px-16">
        {renderSlide()}
      </div>
    </section>
  );
}
