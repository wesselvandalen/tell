import './App.css';
import SideBar from './components/side-bar';
import Content from './components/content';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from './components/signin';

export default function App() {
  return (
    <div className="flex min-h-screen">
      <div className="fixed top-0 left-0 h-screen w-64 bg-gray-800 hidden md:block">
        <SideBar />
      </div>

      <div className="flex-1 md:ml-64 overflow-y-auto">
        <Router>
          <Routes>

            <Route path='/' element={<Content />} />
            <Route path='/login' element={<SignIn />} />

          </Routes>
        </Router>
      </div>
    </div>
  );
}