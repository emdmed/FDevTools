const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
    },
  },
/*   prefix: 'tw-', // Correct prefix syntax */
  plugins: [
    require("tailwindcss-animate"), // If you're using animations from Shadcn
  ],
};
