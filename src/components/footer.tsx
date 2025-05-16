import { useContext } from "react";
import { AuthContext } from "../contexts/auth-context";

export default function Footer() {
    const { user }: any = useContext(AuthContext);
    
    return (
        <footer className="rounded-lg ml-[-10px]">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center">&#169; {new Date().getFullYear()} <a href="/" className="hover:underline">Tell™</a>. All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
                    <li>
                        <a href="/" className="hover:underline me-4 md:me-6">Home</a>
                    </li>
                    {!user && <li>
                        <a href="/account" className="hover:underline me-4 md:me-6">Account</a>
                    </li>}
                    {user && <li>
                        <a href="/tracker" className="hover:underline me-4 md:me-6">Tracker</a>
                    </li>}
                    <li>
                        <a href="/terms" className="hover:underline me-4 md:me-6">Terms</a>
                    </li>
                </ul>
            </div>
        </footer>

    );
}