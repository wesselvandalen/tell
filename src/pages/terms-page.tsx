import { useTranslation } from "react-i18next";
import Footer from "../components/footer";

export default function TermsPage() {
    const { t } = useTranslation("global");

    const title = t("termspage.title");
    const intro = t("termspage.intro");
    const sections = t("termspage.sections", { returnObjects: true }) as {
        title: string;
        content: string;
    }[];

    return (
        <div className="mx-auto p-8">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">{title}</h3>
            <p className="mb-6 text-gray-700">{intro}</p>

            {sections.map((section, index) => (
                <div key={index} className="mb-6">
                    <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">
                        {section.title}
                    </h2>
                    <p className="text-gray-700">{section.content}</p>
                </div>
            ))}

            <Footer />
        </div>
    );
}