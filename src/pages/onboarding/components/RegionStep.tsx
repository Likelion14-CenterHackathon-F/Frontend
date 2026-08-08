import { useMemo } from "react";

import type { SupportedLocale } from "@/types/preferences";
import {
  formatDate,
  formatTimeZoneName,
  formatTimeZoneOffset,
  getTimeZoneCity,
} from "@/utils/dateTime";

interface RegionStepProps {
  locale: SupportedLocale;
  timeZone: string;
}

function RegionStep({ locale, timeZone }: RegionStepProps) {
  const info = useMemo(() => {
    const now = new Date();
    const context = { locale, timeZone };

    return {
      name: formatTimeZoneName(now, context),
      city: getTimeZoneCity(timeZone),
      offset: formatTimeZoneOffset(now, context),
      today: formatDate(now, context),
    };
  }, [locale, timeZone]);

  return (
    <dl className="border-border-muted flex w-81.25 items-center justify-between rounded-2xl border-2 bg-neutral-white/84 px-4 py-3">
      <div>
        <dt className="text-[1.125rem] leading-[1.4] font-semibold text-text-01">
          {info.name}
        </dt>
        <dd className="text-[0.8125rem] leading-[1.4] text-text-sub">
          {info.city}
        </dd>
      </div>

      <div className="text-right">
        <dt className="text-[1.125rem] leading-[1.4] font-semibold text-text-01">
          {info.offset}
        </dt>
        <dd className="text-[0.8125rem] leading-[1.4] text-text-sub">
          {info.today}
        </dd>
      </div>
    </dl>
  );
}

export default RegionStep;
