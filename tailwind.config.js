/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            animation: {
                "fade-in-out": "fadeInOut 3s ease-in-out",
            },
            keyframes: {
                fadeInOut: {
                    "0%": { opacity: 0, transform: "translateY(10px)" },
                    "10%": { opacity: 1, transform: "translateY(0)" },
                    "90%": { opacity: 1, transform: "translateY(0)" },
                    "100%": { opacity: 0, transform: "translateY(10px)" },
                },
            },
        },
    },
    plugins: [],
};