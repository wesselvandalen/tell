import { useContext } from "react";
import { AuthContext } from "../contexts/auth-context";
import { useTranslation } from "react-i18next";

export default function Footer() {
    const {t} = useTranslation("global");
    const { user }: any = useContext(AuthContext);
    
    return (
        <footer className="rounded-lg">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center">&#169; {new Date().getFullYear()} <a href="/" className="hover:underline">Tell™</a>. {t("footer.description")}
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
                    <li>
                        <a href="/" className="hover:underline me-4 md:me-6">{t("sidebar.home")}</a>
                    </li>
                    {!user && <li>
                        <a href="/account" className="hover:underline me-4 md:me-6">{t("sidebar.account")}</a>
                    </li>}
                    {user && <li>
                        <a href="/tracker" className="hover:underline me-4 md:me-6">Tracker</a>
                    </li>}
                    <li>
                        <a href="/terms" className="hover:underline me-4 md:me-6">{t("sidebar.terms")}</a>
                    </li>
                </ul>
            </div>
        </footer>

    );
}