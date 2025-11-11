/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: '#FFF6E9',
        orange: '#FF8A3D',
        gold: '#E6C27A',
        black: '#1F1A17',
        green: '#3F9B50',
        // Vibrant additions
        vibrant: {
          blue: '#3B82F6',
          purple: '#8B5CF6',
          pink: '#EC4899',
          teal: '#14B8A6',
          indigo: '#6366F1',
        },
        // Modern neutrals
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          900: '#0F172A',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'vibrant-sunset': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'ocean-breeze': 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        'sunrise': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'bounce-in': 'bounceIn 0.8s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

