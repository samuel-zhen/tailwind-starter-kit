const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

function build() {
    return gulp.src('src/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss())
        .pipe(sourcemaps.write('.') )
        .pipe(gulp.dest('dist/css/'));
}

function serve() {
    gulp.watch('src/css/**/*.css', build);
}

exports.serve = serve;
exports.build = build;
