/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './src/**/*.html',
        './src/**/*.js',
        './index.html',
    ],
    theme: {
        screens: {
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px'
        },
        extend: {
            animation: {
                'meow-spin': 'meow-spin 5s linear infinite',
                'theme-spin': 'meow-spin 100ms linear forwards',
            },
            keyframes: {
                'meow-spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                }
              }
        },
    },
    plugins: [],
}
