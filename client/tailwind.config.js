/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            "light",
            "dark",
            "cupcake",
            "bumblebee",
            {
                light: {
                    ...require("daisyui/src/theming/themes")["light"],
                    primary: "white",
                    secondary: "teal",
                },
            },
        ],
    },
};
