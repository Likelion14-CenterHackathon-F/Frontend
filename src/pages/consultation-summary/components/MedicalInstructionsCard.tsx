export interface MedicalInstructionItem {
  title: string;
  description: string;
}

interface MedicalInstructionsCardProps {
  instructions: MedicalInstructionItem[];
}

const cardBackground = {
  background:
    "radial-gradient(circle at 50% 50%, #ffffff 38%, rgba(255,255,255,0.8) 100%)",
};

export default function MedicalInstructionsCard({
  instructions,
}: MedicalInstructionsCardProps) {
  return (
    <section
      aria-labelledby="instructions-heading"
      className="mt-[14px] rounded-[28px] px-5 py-6"
      style={cardBackground}
    >
      <h2
        id="instructions-heading"
        className="text-xl font-bold leading-[1.4] tracking-[-0.5px] text-[#302F31]"
      >
        의료진 안내
      </h2>
      <div className="my-6 h-px bg-[#D8D7DC]" />
      <ul className="flex flex-col gap-5">
        {instructions.map((instruction) => (
          <li key={instruction.title}>
            <h3 className="text-base font-semibold leading-[1.4] tracking-[-0.4px] text-[#414141]">
              {instruction.title}
            </h3>
            <p className="mt-1 text-[15px] font-medium leading-[1.5] tracking-[-0.375px] text-[#717171]">
              {instruction.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
