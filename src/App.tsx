import './App.css';
import SideBar from './components/side-bar';
import Content from './pages/content';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from './components/signin';
import ErrorPage from './pages/error-page';
import { useContext } from 'react';
import { AuthContext } from './contexts/auth-context';
import HomePage from './pages/home-page';

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

            {user ?
              <Route path='/' element={<Content />} />
              :
              <Route path='/' element={<HomePage />} />
            }
            <Route path='/login' element={<SignIn />} />
            <Route path='*' element={<ErrorPage />} />

          </Routes>
        </Router>
      </div>
    </div>
  );
}