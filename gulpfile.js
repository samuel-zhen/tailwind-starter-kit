const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const cssnano = require('cssnano');
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();
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

function styles() {
    const plugins = [
        precss(),
        tailwindcss(),
        autoprefixer(),
    ];
    
    return gulp.src('src/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(plugins))
        .pipe(sourcemaps.write('.') )
        .pipe(gulp.dest('dist/css/'))
        .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src('src/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
			presets: ['babel-preset-env']
		}))
        .pipe(concat('script.js'))
        .pipe(uglify())
		.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js/'))
        .pipe(browserSync.stream());;
}

function watch() {
    browserSync.init({
        server: './dist'
    });

    gulp.watch('src/js/*.js', scripts);
    gulp.watch('src/css/**/*.css', styles);
    gulp.watch('tailwind.config.js', styles);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
}

function buildStyles() {
    const plugins = [
        precss(),
        tailwindcss(),
        autoprefixer(),
        purgecss,
        cssnano(),
    ];

    return gulp.src('src/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(plugins))
        .pipe(sourcemaps.write('.') )
        .pipe(gulp.dest('dist/css/'));
}

function remove() {
    return gulp.src(['dist/css/', 'dist/js/'], {allowEmpty: true})
        .pipe(clean());
}

exports.styles = styles;
exports.clean = remove;
exports.watch = watch;
exports.build = gulp.series(remove, gulp.parallel(buildStyles, scripts));
