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
      <div className="fixed top-0 left-0 h-screen w-64 hidden md:block">
        <SideBar />
      </div>

      <div className="flex-1 md:ml-64 overflow-y-auto">
        <Router>
          <Routes>

            <Route path='/' element={<HomePage />} />
            {user && <Route path='/tracker' element={<Content />} />}
            {!user && <Route path='/account' element={<AccountPage />} />}
            <Route path='/terms' element={<TermsPage />} />
            <Route path='*' element={<ErrorPage />} />

          </Routes>
        </Router>
      </div>
    </div>
  );
}