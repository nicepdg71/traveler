/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#00236F',
          indigo: '#1E3A8A',
          blue: '#2563EB',
          amber: '#F59E0B',
          amberBg: '#FFFBEB',
          emerald: '#10B981',
          emeraldBg: '#ECFDF5',
          bg: '#F7F9FB',
        },
      },
      fontFamily: {
        sans: [
          'Pretendard',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'Roboto',
          'Helvetica Neue',
          'Segoe UI',
          'Apple SD Gothic Neo',
          'Noto Sans KR',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
