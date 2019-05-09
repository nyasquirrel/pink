const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();


gulp.task('sass-compile', function () {
	return gulp.src('./scss/**/main.scss')
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('./css/'));
});


gulp.task('watch', function() {
	gulp.watch('./**/*.scss', gulp.series('sass-compile'));
})
