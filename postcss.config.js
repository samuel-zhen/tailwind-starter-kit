require('dotenv').config();

const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const cssnano = require('cssnano');
const purgecss = require('@fullhuman/postcss-purgecss')({
    content: ['./dist/**/*.html'],
    extractors: [
        {
            extractor: class {
                static extract(content) {
                    return content.match(/[A-Za-z0-9-_:/]+/g) || [];
                }
            },
            extensions: ['html']
        }
    ]
});

if (process.env.NODE_ENV === 'production') {
    module.exports = {
        plugins: [
            precss(),
            tailwindcss(),
            autoprefixer(),
            purgecss,
            cssnano(),
        ]
    }
} else {
    module.exports = {
        plugins: [
            precss(),
            tailwindcss(),
            autoprefixer(),
        ]
    }
}
