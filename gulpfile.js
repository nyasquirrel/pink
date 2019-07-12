const gulp = require("gulp");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require("browser-sync").create();
const mqpacker = require("css-mqpacker");
const minify = require("gulp-csso");
const imagemin = require("gulp-imagemin");
const rename = require("gulp-rename");
const svgstore = require("gulp-svgstore");
const svgmin = require("gulp-svgmin");
const jsmin = require('gulp-jsmin');
const del = require("del");

gulp.task("clean", function () {
	return del("build");
});

gulp.task("copy", function () {
	return gulp.src([
		"src/fonts/**/*.{woff,woff2,ttf}",
		"src/img/**",
		"src/js/**",
		"src/*.html"
	], {
			base: "src"
		})
		.pipe(gulp.dest("build/"));
});

gulp.task("style", function () {
	return gulp.src("src/scss/style.scss")
		.pipe(sourcemaps.init())
		.pipe(plumber())
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
		.pipe(browserSync.stream());
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
	return gulp.src("src/*.html")
		.pipe(gulp.dest("build"));
});

gulp.task("html:update", gulp.series("html:copy"), function (done) {
	browserSync.reload();
	done();
});

gulp.task("js", function () {
	return gulp.src("src/js/script.js")
		.pipe(gulp.dest("build/js"))
		.pipe(jsmin())
		.pipe(rename("script.min.js"))
		.pipe(gulp.dest("build/js"));
});

gulp.task("js:update", gulp.series("js"), function (done) {
	browserSync.reload();
	done();
});

gulp.task("serve", function () {
	browserSync.init({
		server: './build',
		// notify: false,
		// open: true,
		// cors: true,
		// ui: false
	});

	gulp.watch("src/scss/**/*.{scss,sass}", gulp.series("style"));
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