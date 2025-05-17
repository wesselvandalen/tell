import './App.css';
import SideBar from './components/side-bar';
import Content from './pages/content';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorPage from './pages/error-page';
import HomePage from './pages/home-page';
import TermsPage from './pages/terms-page';
import { AuthContext } from './contexts/auth-context';
import { useContext } from 'react';
import AccountPage from './pages/account-page';

export default function App() {
  const { user }: any = useContext(AuthContext);

  return (
    <div className="flex min-h-screen">
      <SideBar />

      <div className="flex-1 flex items-center justify-center md:ml-64 overflow-y-auto w-full">
        <div className="max-w-[1200px] w-full h-full">
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              {user && <Route path="/tracker" element={<Content />} />}
              {!user && <Route path="/account" element={<AccountPage />} />}
              <Route path="/terms" element={<TermsPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}