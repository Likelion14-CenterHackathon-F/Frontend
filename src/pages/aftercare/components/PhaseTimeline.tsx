import { cn } from "@/utils/cn";

export interface TimelinePhase {
  id: string;
  label: string;
  range: string;
  items: string[];
  isCurrent: boolean;
}

interface PhaseTimelineProps {
  phases: TimelinePhase[];
  todayLabel: string;
  todayDate: string;
}

function PhaseCard({ phase }: { phase: TimelinePhase }) {
  return (
    <div
      className={cn(
        "w-full rounded-[18px] bg-neutral-white px-5 py-6 shadow-[0_0_8px_0_rgba(0,0,0,0.04)]",
        !phase.isCurrent && "opacity-40",
      )}
    >
      <div className="flex items-center gap-1.5">
        <h3
          className={cn(
            "text-text-01 leading-[1.4] tracking-tight",
            phase.isCurrent ? "text-xl font-bold" : "text-body font-semibold",
          )}
        >
          {phase.label}
        </h3>
        <span
          className={cn(
            "text-text-01 leading-[1.4] font-semibold tracking-tight",
            phase.isCurrent ? "text-body" : "text-caption",
          )}
        >
          {phase.range}
        </span>
      </div>

      <ul
        className={cn(
          "mt-3 flex list-disc flex-col ps-5 font-medium",
          phase.isCurrent
            ? "text-caption text-text-03 gap-2"
            : "text-phase-text text-[0.8125rem]",
        )}
      >
        {phase.items.map((item) => (
          <li key={item} className="leading-[1.45]">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PhaseTimeline({ phases, todayLabel, todayDate }: PhaseTimelineProps) {
  return (
    <ol className="mx-5 mt-6 flex flex-col gap-3">
      {phases.map((phase) => (
        <li key={phase.id}>
          {phase.isCurrent && (
            <p className="mb-2 flex items-center gap-1 text-2xl leading-[1.4] tracking-tight">
              <span className="text-care-title font-bold">{todayLabel}</span>
              <span className="text-phase-today font-semibold">
                {todayDate}
              </span>
            </p>
          )}

          <PhaseCard phase={phase} />
        </li>
      ))}
    </ol>
  );
}

export default PhaseTimeline;
