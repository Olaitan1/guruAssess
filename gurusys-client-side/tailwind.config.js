/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./views/**/*.{js,ts,jsx,tsx,mdx}",
        "./utils/**/*.{js,ts,jsx,tsx,mdx}",
    ],

    theme: {
        screens: {
            sm: "480px",
            md: "768px",
            lg: "976px",
            xl: "1440px",
        },
        colors: {
            blue: "#4B6BFB",
            black: "#181A2A",
            deepGrey: "#97989F",
            facebookColor: "#3D5A98",
            grey: "#F5F5F5",
            instagramColor: "#699BF7",
            lightGrey: "#E8E8EA",
            lightBlue: "#DAE9FC",
            purple: "#0C4284",
            red: "#CB0000",
            twitterColor: "#1D9BF0",
            white: "#fff",
        },
        extend: {},
    },
    plugins: [],
};
