import { useContext, useState } from 'react';
import { AuthContext } from "../contexts/auth-context";
import UserBox from './user-box';
import LanguageMenu from './language-menu';
import { useTranslation } from 'react-i18next';

export default function SideBar() {
  const { t } = useTranslation("global");
  const { user }: any = useContext(AuthContext);
  const [showNote, setShowNote] = useState<boolean>(() => {
    return localStorage.getItem("note") !== "false";
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const removeNote = () => {
    setShowNote(false);
    localStorage.setItem("note", "false");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Hamburger button for mobile */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md md:hidden"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6 text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-md pl-4 pr-4 pt-12 flex flex-col transition-transform duration-300 ease-in-out z-40 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:static md:translate-x-0 md:pt-2 md:h-screen`}
      >
        <div className="flex-1">
          {user && <UserBox name={user.displayName} imageUrl={user.photoURL} />}

          <ul className="space-y-2 w-full pt-3 mt-2">
            <li className="w-full">
              <a
                href="/"
                className="w-full text-left block hover:text-blue-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("sidebar.home")}
              </a>
            </li>
            {!user && (
              <li className="w-full">
                <a
                  href="/account"
                  className="w-full text-left block hover:text-blue-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("sidebar.account")}
                </a>
              </li>
            )}
            {user && (
              <li className="w-full">
                <a
                  href="/tracker"
                  className="w-full text-left block hover:text-blue-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Tracker
                </a>
              </li>
            )}
            <li className="w-full">
              <a
                href="/terms"
                className="w-full text-left block hover:text-blue-600"
                onClick={() => setIsMobileMenuOpen(false)}
                >
                {t("sidebar.terms")}
              </a>
            </li>
          </ul>
        </div>

        <div>
          {showNote && (
            <div
              id="dropdown-cta"
              className="p-4 mt-6 rounded-lg bg-blue-50 dark:bg-blue-900"
              role="alert"
            >
              <div className="flex items-center mb-3">
                <span className="bg-orange-100 text-orange-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded-sm dark:bg-orange-200 dark:text-orange-900">
                  {t("sidebar.note.new")}
                </span>
                <button
                  type="button"
                  onClick={removeNote}
                  className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 inline-flex justify-center items-center w-6 h-6 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800"
                  data-dismiss-target="#dropdown-cta"
                  aria-label="Close"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="w-2.5 h-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>
              <p className="mb-3 text-sm text-blue-800 dark:text-blue-400">
                {t("sidebar.note.description")}
              </p>
            </div>
          )}
          <LanguageMenu />
        </div>
      </div>
    </>
  );
}