import { useContext } from 'react';
import { AuthContext } from "../contexts/auth-context";
import UserBox from './user-box';

export default function SideBar() {
  const { user }: any = useContext(AuthContext);
  
  return (
    <div className="w-64 bg-white h-screen pl-4 pr-4 pt-2 shadow-md max-md:hidden">

      {user && <UserBox name={user.displayName} imageUrl={user.photoURL}  />}

      <ul className="space-y-2 w-full border-t-1 border-gray-300 pt-3 mt-2">
        <li className='w-full'>
          <a href='/' className="w-full text-left">
            Hjem
          </a>
        </li>
        {!user ?
          <li className='w-full'>
            <a href='/login' className="w-full text-left">
              Logg på
            </a>
          </li>
          :
          null}
      </ul>
    </div>
  );
};