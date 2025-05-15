import { useContext } from 'react';
import logo from '../assets/logo.png';
import { AuthContext } from "../contexts/auth-context";

export default function SideBar() {
  const { user }: any = useContext(AuthContext);

  console.log(user);
  
  return (
    <div className="w-64 bg-white h-screen p-4 shadow-md max-md:hidden">
      <div className="flex align-center gap-2">
        <img src={logo} alt="Tell logo" className="w-6 h-6" />
        <p className='text-1xl'>Tell - Spor mat skikkelig</p>
      </div>
      <h2 className="text-xl font-bold mb-4 text-gray-900 border-b-1 pb-5 border-gray-200"></h2>
      <ul className="space-y-2 w-full">
        <li className='w-full'>
          <a href='/' className="w-full text-left p-2 hover:bg-gray-100 rounded text-gray-900">
            Hjem
          </a>
        </li>
        {!user ?
          <li>
            <a href='/login' className="w-full text-left p-2 hover:bg-gray-100 rounded text-gray-900">
              Logg på
            </a>
          </li>
          :
          null}
          <li>
          { user }
          </li>
      </ul>
    </div>
  );
};