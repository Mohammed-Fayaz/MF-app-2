/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*', './dist/**/*'],
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer'),
    ],
};
