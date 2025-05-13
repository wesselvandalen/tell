import { useState } from "react";



export default function SideBar() {
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [language, setLanguage] = useState<string>('English');
  
    const toggleDarkMode = () => {
      setDarkMode(!darkMode);
      document.documentElement.classList.toggle('dark');
    };
  
    const changeLanguage = (lang: string) => {
      setLanguage(lang);
      // Placeholder for language change logic
    };
  
    return (
      <div className="w-64 bg-white dark:bg-gray-800 h-screen p-4 shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Account</h2>
        <ul className="space-y-2">
          <li>
            <button className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-900 dark:text-white">
              Account Details
            </button>
          </li>
          <li>
            <button className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-900 dark:text-white">
              Settings
            </button>
          </li>
          <li>
            <button className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-900 dark:text-white">
              Logout
            </button>
          </li>
          <li>
            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="English">English</option>
              <option value="Norwegian">Norwegian</option>
              <option value="Spanish">Spanish</option>
            </select>
          </li>
          <li>
            <button
              onClick={toggleDarkMode}
              className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-900 dark:text-white"
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </li>
        </ul>
      </div>
    );
  };