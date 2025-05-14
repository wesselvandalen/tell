import './App.css';
import SideBar from './components/side-bar';
import Content from './components/content';

export default function App() {
  return (
    <div className="flex min-h-screen">
      <div className="fixed top-0 left-0 h-screen w-64 bg-gray-800 hidden md:block">
        <SideBar />
      </div>
      <div className="flex-1 md:ml-64 overflow-y-auto">
        <Content />
      </div>
    </div>
  );
}