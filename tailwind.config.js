/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors : {
        customBlue: '#496DDB',
        customOrange: '#EE8434',
        },
        
    },
  },
  plugins: [],
};
