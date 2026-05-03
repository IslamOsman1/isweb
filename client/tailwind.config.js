/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandDark: '#0b101e',    /* لون الخلفية الداكن للوجو */
        brandBlue: '#0083b0',    /* تدرج الأزرق */
        brandCyan: '#00b4db',    /* تدرج السماوي */
        brandGreen: '#00b09b',   /* تدرج الأخضر */
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}