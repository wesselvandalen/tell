import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../service/firebase';
import { useTranslation } from 'react-i18next';

interface UserBlockProps {
  name: string;
  imageUrl: string;
}

export default function UserBox({ name, imageUrl }: UserBlockProps) {
  const {t} = useTranslation("global");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative border-b-1 pb-3 border-gray-300">
      <div
        className="flex items-center justify-start gap-2 pt-2 pb-2 rounded-md hover:bg-gray-100 cursor-pointer"
        onClick={toggleMenu}
      >
        <img
          src={imageUrl}
          alt={`${name}'s profile`}
          className="w-5 h-5 rounded-sm object-cover"
        />
        <div className="flex flex-col">
          <span className="text-base font-medium">{name}</span>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <button
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => signOut(auth)}
          >
            {t("sidebar.userblock.logout")}
          </button>
        </div>
      )}
    </div>
  );
}