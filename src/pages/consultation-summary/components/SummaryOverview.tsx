interface SummaryOverviewProps {
  consultationDate: string;
  hospitalName: string;
  appointmentDateTime: string;
  consultationReason: string;
  medicalStaffName: string;
  ownerText: string;
  titleText: string;
  labels: {
    appointmentDateTime: string;
    consultationReason: string;
    medicalStaff: string;
  };
}

export default function SummaryOverview({ consultationDate, hospitalName, appointmentDateTime, consultationReason, medicalStaffName, ownerText, titleText, labels }: SummaryOverviewProps) {
  const details = [
    [labels.appointmentDateTime, appointmentDateTime],
    [labels.consultationReason, consultationReason],
    [labels.medicalStaff, medicalStaffName],
  ];

  return (
    <section aria-labelledby="summary-heading">
      <h1 id="summary-heading" className="text-[32px] leading-[1.25] tracking-[-0.8px] text-[#32303A]">
        <span className="block font-medium">{ownerText}</span>
        <strong className="mt-[5px] block font-semibold">{consultationDate}</strong>
        <span className="mt-[5px] block font-medium">{titleText}</span>
      </h1>
      <p className="mt-5 text-base font-semibold leading-[1.4] tracking-[-0.4px] text-[#7B7A80]">{hospitalName}</p>
      <dl className="mt-11 flex flex-col gap-3 text-[15px] leading-[1.4] tracking-[-0.375px]">
        {details.map(([label, value]) => (
          <div key={label} className="flex items-start justify-between gap-4">
            <dt className="shrink-0 text-[#7B7A80]">{label}</dt>
            <dd className="text-right font-medium text-[#4B4B4E]">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
