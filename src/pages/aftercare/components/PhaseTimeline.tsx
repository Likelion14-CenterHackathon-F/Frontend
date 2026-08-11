import { cn } from "@/utils/cn";

export interface TimelinePhase {
  id: string;
  label: string;
  range: string;
  items: string[];
  day: number;
  weekday: string;
  isCurrent: boolean;
}

interface PhaseTimelineProps {
  phases: TimelinePhase[];
  /* 현재 단계 옆에 붙는 "2026년 7월" 라벨 */
  monthLabel: string;
}

function PhaseTimeline({ phases, monthLabel }: PhaseTimelineProps) {
  return (
    <ol className="relative mx-5 mt-6 flex flex-col gap-6">
      {/* 날짜 칩 가운데를 지나는 세로선 */}
      <span
        aria-hidden
        className="bg-border-soft absolute top-0 bottom-0 left-5.25 w-px"
      />

      {phases.map((phase) => (
        <li key={phase.id} className="relative flex items-start gap-3.25">
          {phase.isCurrent && (
            <div className="absolute -top-7.5 left-0 flex items-center gap-2.5">
              {/* 오늘이라는 표시. 바깥 원이 퍼져 나가며 맥박처럼 뛴다 */}
              <span aria-hidden className="relative ml-0.75 flex size-2.5">
                <span className="bg-primary absolute inline-flex size-full animate-ping rounded-full opacity-60" />
                <span className="bg-primary relative inline-flex size-full rounded-full" />
              </span>
              <span className="text-primary text-caption font-medium">
                {monthLabel}
              </span>
            </div>
          )}

          <div
            className={cn(
              "flex w-10.5 shrink-0 flex-col items-center rounded-lg bg-neutral-white py-1.5 shadow-[0_0_8px_0_rgba(0,0,0,0.04)]",
              !phase.isCurrent && "opacity-40",
            )}
          >
            <span className="text-body text-text-01 font-semibold">
              {String(phase.day).padStart(2, "0")}
            </span>
            <span className="text-caption text-phase-weekday font-medium">
              {phase.weekday}
            </span>
          </div>

          <div
            className={cn(
              "flex-1 rounded-[18px] bg-neutral-white p-4 shadow-[0_0_8px_0_rgba(0,0,0,0.04)]",
              phase.isCurrent ? "border-spin" : "opacity-40",
            )}
          >
            <div className="flex items-baseline gap-1.5">
              <h3
                className={cn(
                  "text-text-01 font-bold tracking-tight",
                  phase.isCurrent ? "text-xl" : "text-body font-semibold",
                )}
              >
                {phase.label}
              </h3>
              <span
                className={cn(
                  "text-text-01 font-semibold tracking-tight",
                  phase.isCurrent ? "text-body" : "text-caption",
                )}
              >
                {phase.range}
              </span>
            </div>

            <ul
              className={cn(
                "mt-2 flex list-disc flex-col gap-2 ps-5 font-medium",
                phase.isCurrent
                  ? "text-caption text-text-03"
                  : "text-[0.8125rem] text-phase-text",
              )}
            >
              {phase.items.map((item) => (
                <li key={item} className="leading-[1.45]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default PhaseTimeline;
