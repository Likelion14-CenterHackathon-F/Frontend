import coldIcon from "@/assets/icons/consultation-summary/cold.svg";
import pillIcon from "@/assets/icons/consultation-summary/pill.svg";
import sunnyIcon from "@/assets/icons/consultation-summary/sunny.svg";

interface MedicalInstructionsCardProps {
  instructions: { instructionId: number; content: string }[];
  title: string;
}

const instructionIcons = [pillIcon, coldIcon, sunnyIcon];

export default function MedicalInstructionsCard({
  instructions,
  title,
}: MedicalInstructionsCardProps) {
  return (
    <section aria-labelledby="instructions-heading" className="mt-10">
      <h2
        id="instructions-heading"
        className="text-[22px] font-semibold leading-[1.4] tracking-[-0.55px] text-[#32303A]"
      >
        {title}
      </h2>
      <ul className="mt-[14px] flex snap-x gap-[10px] overflow-x-auto px-5 pb-1">
        {instructions.map((instruction, index) => (
          <li
            key={instruction.instructionId}
            className="flex h-[227px] w-[171px] shrink-0 snap-start flex-col rounded-[28px] bg-white px-5 py-6 shadow-[0_4px_4px_rgba(0,0,0,0.03)]"
          >
            <div className="flex h-[95px] items-center justify-center">
              <img
                src={instructionIcons[index % instructionIcons.length]}
                alt=""
                className="size-[42px]"
              />
            </div>

            <p className="mt-3 line-clamp-3 text-sm leading-[1.5] tracking-[-0.35px] text-[#65646D]">
              {instruction.content}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
