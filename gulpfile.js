const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

function styles() {
    return gulp.src('src/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss())
        .pipe(sourcemaps.write('.') )
        .pipe(gulp.dest('dist/css/'));
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
        .pipe(gulp.dest('dist/js/'));
}

function watch() {
    gulp.watch('src/js/*.js', scripts);
    gulp.watch('src/css/**/*.css', styles);
    gulp.watch('tailwind.config.js', styles);
}

exports.watch = watch;
exports.build = gulp.parallel(styles, scripts);
