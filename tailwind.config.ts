/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Asegurarse de incluir JSX y TSX
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Soporte para modo oscuro basado en clases
  theme: {
    extend: {
      colors: {
        "moss-green": "#2d5700",
        
        primary: {
           "moss-green": "#2d5700",
          "50": "#ecfdf5",
          "100": "#d1fae5",
          "200": "#a7f3d0",
          "300": "#6ee7b7",
          "400": "#34d399",
          "500": "#10b981",
          "600": "#059669",
          "700": "#047857",
          "800": "#065f46",
          "900": "#064e3b",
          "950": "#022c22",
          
        },

      },
      fontFamily: {
        Righteous: ["Righteous","sans-serif"],
          Poppins: ["Poppins","sans-serif"],
        // body: [
        //   'Montserrat',
        //   'ui-sans-serif',
        //   'system-ui',
        //   '-apple-system',
        //   'system-ui',
        //   'Segoe UI',
        //   'Roboto',
        //   'Helvetica Neue',
        //   'Arial',
        //   'Noto Sans',
        //   'sans-serif',
        //   'Apple Color Emoji',
        //   'Segoe UI Emoji',
        //   'Segoe UI Symbol',
        //   'Noto Color Emoji',
        // ],
        // sans: [
        //   'Montserrat',
        //   'ui-sans-serif',
        //   'system-ui',
        //   '-apple-system',
        //   'system-ui',
        //   'Segoe UI',
        //   'Roboto',
        //   'Helvetica Neue',
        //   'Arial',
        //   'Noto Sans',
        //   'sans-serif',
        //   'Apple Color Emoji',
        //   'Segoe UI Emoji',
        //   'Segoe UI Symbol',
        //   'Noto Color Emoji',
        // ],
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(100px)", filter: "blur(33px)" },
          to: { opacity: "1", transform: "translateY(0)", filter: "blur(0)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 1s ease-in-out forwards",
        "fade-in-delay": "fadeIn 1s ease-in-out 0.3s forwards",
        "fade-in-delay-long": "fadeIn 1s ease-in-out 0.6s forwards",
      },
    },
  },
  plugins: [],
};