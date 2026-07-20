/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: '#090d16',
        card: '#111827',
        border: 'rgba(255, 255, 255, 0.1)',
        brand: {
          50: '#fff1f0',
          100: '#ffdfdc',
          500: '#ff4500', // Neon Viral Orange/Red
          600: '#e03a00',
          700: '#b82b00',
        },
        accent: {
          amber: '#f59e0b',
          emerald: '#10b981',
          cyan: '#06b6d4',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 2s infinite ease-in-out',
        'glow': 'glow 3s infinite alternate',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(255, 69, 0, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(255, 69, 0, 0.5)' },
        }
      }
    },
  },
  plugins: [],
};
