interface ConsultationReasonCardProps {
  title: string;
  description: string;
  imageSrc?: string;
}

const cardBackground = {
  background:
    "radial-gradient(circle at 50% 50%, #ffffff 38%, rgba(255,255,255,0.8) 100%)",
};

export default function ConsultationReasonCard({
  title,
  description,
  imageSrc,
}: ConsultationReasonCardProps) {
  return (
    <section
      aria-labelledby="reason-heading"
      className="mt-[14px] rounded-[28px] px-5 py-[22px]"
      style={cardBackground}
    >
      <h2
        id="reason-heading"
        className="text-xl font-bold leading-[1.4] tracking-[-0.5px] text-[#302F31]"
      >
        상담 사유
      </h2>
      <div className="my-6 h-px bg-[#D8D7DC]" />
      <h3 className="text-lg font-semibold leading-[1.4] tracking-[-0.45px] text-[#414141]">
        {title}
      </h3>
      <p className="mt-1.5 text-[15px] font-medium leading-[1.5] tracking-[-0.375px] text-[#717171]">
        {description}
      </p>
      {imageSrc && (
        <img
          src={imageSrc}
          alt="상담 시 첨부한 사진"
          className="mt-5 size-[99px] rounded-xl object-cover"
        />
      )}
    </section>
  );
}
