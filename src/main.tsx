import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AuthProvider } from './contexts/authprovider.tsx';
import { initReactI18next } from 'react-i18next/initReactI18next';
import i18next from 'i18next';

import global_en from "./translations/en/global.json";
import global_no from "./translations/no/global.json";
import global_dk from "./translations/dk/global.json";
import global_et from "./translations/et/global.json";
import global_fi from "./translations/fi/global.json";
import global_se from "./translations/se/global.json";
import global_fo from "./translations/fo/global.json";
import global_nl from "./translations/nl/global.json";
import global_is from "./translations/is/global.json";

function getLanguage() {
  const lang = localStorage.getItem('lang');

  if (lang === 'en' || lang === 'no' || lang === 'dk' || lang === 'se' || lang === 'fi' || lang === 'is' || lang === 'et' || lang === 'fo' || lang === 'nl') {
      document.documentElement.lang = lang;
      return lang;
  }

  localStorage.setItem('lang', 'en');
  document.documentElement.lang = "en";
  return 'en';
}

i18next.use(initReactI18next).init({
  interpolation: { escapeValue: true },
  lng: getLanguage(),
  resources: {
      en: {
          global: global_en,
      },
      no: {
        global: global_no
      },
      dk: {
        global: global_dk
      },
      et: {
        global: global_et
      },
      fo: {
        global: global_fo
      },
      se: {
        global: global_se
      },
      fi: {
        global: global_fi
      },
      is: {
        global: global_is
      },
      nl: {
        global: global_nl
      }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);