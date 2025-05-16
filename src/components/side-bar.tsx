import { useContext, useState } from 'react';
import { AuthContext } from "../contexts/auth-context";
import UserBox from './user-box';
import LanguageMenu from './language-menu';

export default function SideBar() {
  const { user }: any = useContext(AuthContext);
  const [showNote, setShowNote] = useState<boolean>(true);

  return (
    <div className="w-64 bg-white h-screen pl-4 pr-4 pt-2 shadow-md max-md:hidden flex flex-col">
      <div className="flex-1">
        {user && <UserBox name={user.displayName} imageUrl={user.photoURL} />}

        <ul className="space-y-2 w-full pt-3 mt-2">
          <li className="w-full">
            <a href="/" className="w-full text-left block hover:text-blue-600">
              Home
            </a>
          </li>
          {!user && <li className="w-full">
            <a href="/account" className="w-full text-left block hover:text-blue-600">
              Account
            </a>
          </li>}
          {user && <li className="w-full">
            <a href="/tracker" className="w-full text-left block hover:text-blue-600">
              Tracker
            </a>
          </li>}
          <li className="w-full">
            <a href="/terms" className="w-full text-left block hover:text-blue-600">
              Terms and Conditions
            </a>
          </li>
        </ul>
      </div>

      <div className="">
        {showNote &&
          <div id="dropdown-cta" className="p-4 mt-6 rounded-lg bg-blue-50 dark:bg-blue-900" role="alert">
            <div className="flex items-center mb-3">
              <span className="bg-orange-100 text-orange-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded-sm dark:bg-orange-200 dark:text-orange-900">New</span>
              <button type="button" onClick={() => setShowNote(false)} className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 inline-flex justify-center items-center w-6 h-6 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800" data-dismiss-target="#dropdown-cta" aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
              </button>
            </div>
            <p className="mb-3 text-sm text-blue-800 dark:text-blue-400">
              Try using our app in your language! Tell now supports 9 languages in total!
            </p>
          </div>}
        <LanguageMenu />
      </div>
    </div>
  );
}