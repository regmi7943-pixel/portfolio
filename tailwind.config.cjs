/***** Tailwind config *****/
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      // Custom shades referenced throughout the codebase.
      // (Tailwind has no 150/350/450/550/650/850/855 by default, so define them.)
      colors: {
        slate: {
          150: '#eef1f6',
          350: '#94a3b8',
          450: '#64748b',
          550: '#52606d',
          650: '#3f4a57',
          750: '#34404c',
          850: '#1a2330',
          855: '#171f2a',
        },
        indigo: {
          450: '#7c8cf8',
          550: '#5161f5',
          650: '#4338ca',
        },
      },
      boxShadow: {
        'float': '0 20px 40px -20px rgba(0,0,0,0.35)',
        'glow': '0 0 60px -15px rgba(79, 70, 229, 0.45)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translate(0px, 0px)' },
          '33%': { transform: 'translate(20px, -25px)' },
          '66%': { transform: 'translate(-15px, 10px)' },
        },
        'gradient-pan': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.7' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        'spin-slow': {
          '100%': { transform: 'rotate(360deg)' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 18s ease-in-out infinite',
        'gradient-pan': 'gradient-pan 8s ease infinite',
        marquee: 'marquee 40s linear infinite',
        'marquee-rev': 'marquee 40s linear infinite reverse',
        shimmer: 'shimmer 2.5s infinite',
        'pulse-ring': 'pulse-ring 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin-slow 22s linear infinite',
        'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
