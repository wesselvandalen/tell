import { useContext } from "react";
import Footer from "../components/footer";
import { AuthContext } from "../contexts/auth-context";
import { useTranslation } from "react-i18next";
import emoji from "../assets/emoji.png";

export default function HomePage() {
    const { t } = useTranslation("global");
    const { user }: any = useContext(AuthContext);

    const getRandomElementFromArray = (array: string[] = ["Välkomna", "Velkommen", "Tervetulua", "Welkom", "Velkomin", "Vælkomin", "Tere tulemast"]): string => {
        return array[Math.floor(Math.random() * array.length)];
    }

    return (
        <div className="min-h-screen flex items-start justify-start flex-col p-8">
            <div className="max-w-lg text-left">

                <h3 className="text-5xl font-bold text-gray-800 mb-4 flex items-center gap-2">{getRandomElementFromArray()} <img src={emoji} alt="Hand emoji" className="w-12 h-12" /></h3>
                <p className="text-lg text-gray-600 mb-6">
                    {t("homepage.top.title")} <span className="relative inline-block">
                        {t("homepage.top.highlighted_phrases.amazing")}
                        <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0,5 Q50,10 100,5" fill="none" stroke="#FBBF24" strokeWidth="2" />
                        </svg>
                    </span> {t("homepage.top.mid_description")}
                    <span className="relative inline-block mx-1">
                        {t("homepage.top.highlighted_phrases.track")}
                        <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0,5 Q50,10 100,5" fill="none" stroke="#FBBF24" strokeWidth="2" />
                        </svg>
                    </span> {t("homepage.top.description")}
                </p>

                <div className="space-y-4 mb-15">
                    {user ?
                        <button type="button" onClick={() => window.location.assign("/tracker")} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            {t("homepage.buttons.tracker")}
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </button>
                        :
                        <button type="button" onClick={() => window.location.assign("/account")} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            {t("homepage.buttons.account")}
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </button>
                    }
                </div>
            </div>

            <div className="text-left ml-[-20px]">
                <section className="bg-white">
                    <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                        <div className="font-light text-gray-500 sm:text-lg">
                            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
                                {t("homepage.introduction.main1")} {t("homepage.introduction.main2")}
                            </h2>
                            <p className="mb-4">{t("homepage.introduction.first")}</p>
                            <p>{t("homepage.introduction.second")}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <img className="w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png" alt="office content 1" />
                            <img className="mt-4 w-full lg:mt-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="office content 2" />
                        </div>
                    </div>
                </section>
            </div>

            <div className="w-full">
                <Footer />
            </div>
        </div>
    );
}