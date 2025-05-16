import Footer from "../components/footer";

export default function HomePage() {

    const getRandomElementFromArray = (array: string[] = ["Välkomna"]): string => {
        return array[Math.floor(Math.random() * array.length)];
    }

    return (
        <div className="min-h-screen flex items-start justify-start flex-col p-8">
            <div className="max-w-lg text-left">

                <h3 className="text-5xl font-bold text-gray-800 mb-4">{getRandomElementFromArray()}</h3>
                <p className="text-lg text-gray-600 mb-6">
                    Discover our <span className="relative inline-block">
                        amazing
                        <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0,5 Q50,10 100,5" fill="none" stroke="#FBBF24" strokeWidth="2" />
                        </svg>
                    </span> calorietracker, where you can just
                    <span className="relative inline-block mx-1">
                        track your food
                        <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0,5 Q50,10 100,5" fill="none" stroke="#FBBF24" strokeWidth="2" />
                        </svg>
                    </span> without bullshit features!
                </p>

                <div className="space-y-4 mb-15">
                    <button type="button" onClick={() => window.location.assign("/account")} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Make an account
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="text-left ml-[-20px]">
                <section className="bg-white dark:bg-gray-900">
                    <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">We're not the first to do it,<br/>we just do it right.</h2>
                            <p className="mb-4">We are normal people who just want to track our calories. No ads, no unnecessary functions, just plain and simple (yet very efficient!) calorietracking.</p>
                            <p>At Tell (Norwegian for "count"), we want to have a simple app where people can track their calories, across platforms, without a hasle. That's why we made this app as simple as possible, yet let it have the bare minimum of what we want it to have.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <img className="w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png" alt="office content 1" />
                            <img className="mt-4 w-full lg:mt-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="office content 2" />
                        </div>
                    </div>
                </section>
            </div>

            <div className="w-full">
                <Footer/>
            </div>
        </div>
    );
}