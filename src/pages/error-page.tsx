import { useTranslation } from "react-i18next";

export default function ErrorPage() {
  const {t} = useTranslation("global");
  
  return (
    <div className="min-h-screen flex items-start justify-start flex-col p-8">
      <div className="max-w-lg text-left">

        <h3 className="text-5xl font-bold text-gray-800 mb-4">404 - {t("errorpage.main")}</h3>
        <p className="text-black mb-4">{t("errorpage.description")}</p>
        <a href="/" className="text-sm text-black underline">
        {t("errorpage.link")}
        </a>

      </div>
    </div>
  );
}