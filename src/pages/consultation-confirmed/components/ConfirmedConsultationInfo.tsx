interface ConfirmedConsultationInfoProps {
  dateLabel: string;
  dateValue: string;
  reasonLabel: string;
  reasonValue: string;
  doctorLabel: string;
  doctorValue: string;
}

function ConfirmedConsultationInfo({
  dateLabel,
  dateValue,
  reasonLabel,
  reasonValue,
  doctorLabel,
  doctorValue,
}: ConfirmedConsultationInfoProps) {
  const rows = [
    [dateLabel, dateValue],
    [reasonLabel, reasonValue],
    [doctorLabel, doctorValue],
  ];

  return (
    <dl className="mt-6 flex flex-col gap-4">
      {rows.map(([label, value]) => (
        <div key={label} className="flex items-start justify-between">
          <dt className="shrink-0 text-[15px] leading-[1.4] tracking-tight text-text-secondary">
            {label}
          </dt>
          <dd className="text-right text-[15px] font-medium leading-[1.4] tracking-tight text-action-secondary-text">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default ConfirmedConsultationInfo;
