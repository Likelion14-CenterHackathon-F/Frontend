export type SymptomTranslationKey =
  | "pain"
  | "swelling"
  | "redness"
  | "heat"
  | "bleeding"
  | "itching"
  | "bruise"
  | "other";

const symptomTranslationKeyByValue: Record<string, SymptomTranslationKey> = {
  PAIN: "pain",
  통증: "pain",
  SWELLING: "swelling",
  붓기: "swelling",
  REDNESS: "redness",
  홍조: "redness",
  발적: "redness",
  HEAT: "heat",
  열감: "heat",
  BLEEDING: "bleeding",
  출혈: "bleeding",
  ITCHING: "itching",
  가려움: "itching",
  BRUISING: "bruise",
  멍: "bruise",
  OTHER: "other",
  기타: "other",
};

export function translateConsultationSubject(
  subject: string | null,
  translate: (key: SymptomTranslationKey) => string,
): string {
  if (!subject?.trim()) return "-";

  return subject
    .split(/\s*·\s*/)
    .map((value) => {
      const trimmedValue = value.trim();
      const translationKey = symptomTranslationKeyByValue[trimmedValue];

      return translationKey ? translate(translationKey) : trimmedValue;
    })
    .join(" · ");
}
