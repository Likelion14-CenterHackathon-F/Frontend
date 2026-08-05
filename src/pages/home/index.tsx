import { usePreferencesStore } from "@/stores/usePreferencesStore";
import { useTranslation } from "react-i18next";

function HomePage() {
  const { t } = useTranslation("onboarding");

  const { locale, timeZone } = usePreferencesStore();

  const context = {
    locale,
    timeZone,
  };

  console.log(context);

  return (
    <main>
      <h1>{t("welcome")}</h1>

      <section>
        <h2>{t("language.title")}</h2>
        <p>{t("language.description")}</p>
      </section>

      <section>
        <h2>{t("timezone.title")}</h2>
        <p>{t("timezone.description")}</p>
      </section>

      <button type="button">{t("start")}</button>
    </main>
  );
}

export default HomePage;
