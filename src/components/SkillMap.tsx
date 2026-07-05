import { Cloud, Code2, Container, GitBranch, Network, Server } from "lucide-react";
import type { SkillGroup } from "../data/slides";

const ringIcons = [Container, Network, Cloud, Server, Code2, GitBranch];

type SkillMapProps = {
  groups: SkillGroup[];
};

export function SkillMap({ groups }: SkillMapProps) {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-[minmax(300px,520px)_1fr]">
      <div className="relative mx-auto aspect-square w-full max-w-[520px]">
        <div className="radar-grid absolute inset-0 rounded-full" />
        <div className="absolute inset-[18%] rounded-full border border-cyan-200/15" />
        <div className="absolute inset-[32%] rounded-full border border-emerald-200/15" />
        <div className="absolute inset-[44%] grid place-items-center rounded-full border border-amber-200/30 bg-black/30 text-center shadow-glow backdrop-blur">
          <div>
            <p className="text-lg text-cyan-100">能力地图</p>
            <p className="mt-2 text-sm text-slate-400">部署 · 排错 · 沉淀</p>
          </div>
        </div>
        {groups.map((group, index) => {
          const Icon = ringIcons[index % ringIcons.length];
          const angle = (Math.PI * 2 * index) / groups.length - Math.PI / 2;
          const x = 50 + Math.cos(angle) * 39;
          const y = 50 + Math.sin(angle) * 39;

          return (
            <div
              key={group.name}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-cyan-200/25 bg-[#071018]/90 px-3 py-2 text-sm text-white shadow-glow"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <Icon className="h-4 w-4 text-cyan-200" aria-hidden="true" />
              <span>{group.name}</span>
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {groups.map((group) => (
          <section key={group.name} className="surface-card p-5">
            <h3 className="text-xl font-semibold text-white">{group.name}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span key={skill} className="skill-chip">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
