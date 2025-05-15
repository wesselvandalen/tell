export default function Footer() {
    return (
        <footer className="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800">
            <div className="mx-auto max-w-screen-xl text-center">
                <a href="#" className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white">Tell™</a>
                <p className="mb-2 text-gray-500 dark:text-gray-400">En enkel matsporer for deg.</p>
                <ul className="flex flex-wrap justify-center items-center mb-2 text-gray-900 dark:text-white">
                    <li>
                        <a href="/" className="mr-4 hover:underline md:mr-6 ">Hjem</a>
                    </li>
                    <li>
                        <a href="/login" className="mr-4 hover:underline md:mr-6">Logg inn</a>
                    </li>
                </ul>
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {new Date().getFullYear()} <a href="/" className="hover:underline">Tell™</a>. Alle rettigheter reservert.</span>
            </div>
        </footer>
    );
}