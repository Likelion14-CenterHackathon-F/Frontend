import type { SymptomType } from "@/types/consultationReservation.type";
import { cn } from "@/utils/cn";

interface SymptomSectionProps {
  selectedSymptoms: SymptomType[];
  description: string;
  onToggleSymptom: (symptom: SymptomType) => void;
  onChangeDescription: (value: string) => void;
}

const MAX_DESCRIPTION_LENGTH = 500;

const symptomOptions: Array<{ value: SymptomType; label: string }> = [
  { value: "pain", label: "통증" },
  { value: "swelling", label: "붓기" },
  { value: "redness", label: "홍조" },
  { value: "heat", label: "열감" },
  { value: "bleeding", label: "출혈" },
  { value: "itching", label: "가려움" },
  { value: "bruise", label: "멍" },
  { value: "other", label: "기타" },
];

export default function SymptomSection({
  selectedSymptoms,
  description,
  onToggleSymptom,
  onChangeDescription,
}: SymptomSectionProps) {
  return (
    <section className="mt-16">
      <header>
        <h2 className="text-text-01 text-xl font-semibold leading-[1.4] tracking-tight">
          증상 분류
        </h2>
        <p className="mt-1 text-[15px] leading-[1.4] tracking-tight text-text-secondary">
          발생 시점, 경과, 불편한 정도 등을 작성해 주세요.
        </p>
      </header>

      <div className="mt-5 grid grid-cols-4 gap-2">
        {symptomOptions.map(({ value, label }) => {
          const isSelected = selectedSymptoms.includes(value);

          return (
            <button
              key={value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onToggleSymptom(value)}
              className={cn(
                "h-[46px] rounded-[30px] border text-sm font-medium leading-[1.4] tracking-tight transition-colors",
                isSelected
                  ? "bg-action-secondary-text text-action-primary-text"
                  : "border-calendar-control-border bg-transparent text-action-secondary-text",
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="relative mt-[10px]">
        <textarea
          value={description}
          maxLength={MAX_DESCRIPTION_LENGTH}
          aria-label="증상 상세 내용"
          placeholder={
            "· 붓기나 멍이 들어요\n· 알레르기 반응이 온 것 같아요\n· 피부 관련 특이사항"
          }
          onChange={(event) => onChangeDescription(event.target.value)}
          className="min-h-38 w-full resize-none rounded-[18px] border border-border-input bg-transparent px-5 pt-[18px] text-[15px] leading-[1.5] tracking-tight text-text-01 placeholder:text-text-04 focus:focus:border-action-secondary-text focus:outline-none"
        />
        <span className="pointer-events-none absolute bottom-[18px] right-5 text-[13px] text-text-04">
          {description.length} / {MAX_DESCRIPTION_LENGTH}
        </span>
      </div>
    </section>
  );
}
