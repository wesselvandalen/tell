import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageMenu() {
    const {i18n} = useTranslation("global");
    const [selectedLanguage, setSelectedLanguage] = useState<string>(localStorage.getItem("lang") || "English");

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLanguage(event.target.value);
        i18n.language = event.target.value;
        localStorage.setItem("lang", event.target.value);
        document.documentElement.lang = event.target.value;
        window.location.reload();
    };

    return (
        <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            aria-label="Select language"
            className='w-full mt-4 mb-4 focus:outline-none focus:ring-0 focus:border-none'
        >

            <option value="dk">Dansk</option>
            <option value="nl">Nederlands</option>
            <option value="en">English</option>
            <option value="et">Eesti</option>
            <option value="fi">Suomea</option>
            <option value="is">Íslenska</option>
            <option value="no">Norsk</option>
            <option value="se">Svenska</option>
            <option value="fo">Føroyskt</option>

        </select>
    );
};