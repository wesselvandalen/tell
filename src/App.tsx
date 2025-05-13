import './App.css';
import SideBar from './components/side-bar';
import Content from './components/content';

export default function App() {

  return (
      <div className="flex">
        <SideBar />
        <Content />
      </div>
  )
}