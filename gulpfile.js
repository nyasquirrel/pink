// const gulp = require('gulp');
// const sass = require('gulp-sass');
// const sourcemaps = require('gulp-sourcemaps');
// const browserSync = require('browser-sync').create();


// gulp.task('sass', function () {
// 	return gulp.src('./scss/**/style.scss')
// 		.pipe(sourcemaps.init())
// 		.pipe(sass().on('error', sass.logError))
// 		.pipe(sourcemaps.write('./'))
// 		.pipe(gulp.dest('./css/'))
// 		.pipe(browserSync.stream());
// });

// gulp.task('serve', function () {

// 	browserSync.init({
// 		proxy: "pink.local"
// 	});

// 	gulp.watch("./**/*.scss", gulp.series('sass'));
// 	gulp.watch("./*.html").on('change', browserSync.reload);
// });

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var sourcemaps = require('gulp-sourcemaps');
var server = require("browser-sync").create();
var mqpacker = require("css-mqpacker");
var minify = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var rename = require("gulp-rename");
var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var jsmin = require('gulp-jsmin');
var del = require("del");

gulp.task("clean", function () {
	return del("build");
});

gulp.task("copy", function () {
	return gulp.src([
		"src/fonts/**/*.{woff,woff2}",
		"src/img/**",
		"src/js/**",
		"src/*.html"
	], {
			base: "."
		})
		.pipe(gulp.dest("build"));
});

gulp.task("style", function () {
	gulp.src("sass/style.scss")
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss([
			autoprefixer({
				browsers: [
					"last 2 versions"
				]
			}),
			mqpacker({
				sort: false
			})
		]))
		.pipe(gulp.dest("build/css"))
		.pipe(minify())
		.pipe(rename("style.min.css"))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest("build/css"))
		.pipe(server.stream());
});

gulp.task("images", function () {
	return gulp.src("build/img/**/*.{png,jpg,gif}")
		.pipe(imagemin([
			imagemin.optipng({ optimizationLevel: 3 }),
			imagemin.jpegtran({ progressive: true })
		]))
		.pipe(gulp.dest("build/img"));
});

gulp.task("sprite", function () {
	return gulp.src("build/img/icons/*.svg")
		.pipe(svgmin())
		.pipe(svgstore({
			inlineSvg: true
		}))
		.pipe(rename("sprite.svg"))
		.pipe(gulp.dest("build/img"));
});

gulp.task("html:copy", function () {
	return gulp.src("*.html")
		.pipe(gulp.dest("build"));
});

gulp.task("html:update", ["html:copy"], function (done) {
	server.reload();
	done();
});

gulp.task("js", function () {
	gulp.src("js/script.js")
		.pipe(gulp.dest("build/js"))
		.pipe(jsmin())
		.pipe(rename("script.min.js"))
		.pipe(gulp.dest("build/js"));
});

gulp.task("js:copy", function () {
	return gulp.src("*js/script.js")
		.pipe(gulp.dest("build/js"))
		.pipe(jsmin())
		.pipe(rename("script.min.js"))
		.pipe(gulp.dest("build/js"));
});

gulp.task("js:update", ["js:copy"], function (done) {
	server.reload();
	done();
});

gulp.task("serve", function () {
	server.init({
		proxy: "pink.local",
		notify: false,
		open: true,
		cors: true,
		ui: false
	});

	gulp.watch("src/sass/**/*.{scss,sass}", gulp.series("style"));
	gulp.watch("src/*.html", gulp.series("html:update")).on('change', browserSync.reload);
	gulp.watch("src/js/script.js", gulp.series("js:update"));
});

gulp.task("build", gulp.series(
	"clean",
	"copy",
	"style",
	"js",
	"images",
	"sprite")
);
});