import gulp from 'gulp'
const $ = require('gulp-load-plugins')()
import postcss from 'gulp-postcss'
import cssvars from 'postcss-simple-vars'
import nested from 'tailwindcss/nesting'
import cssImport from 'postcss-import'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import browserSync from 'browser-sync'
import del from 'del'
const source = './src/'
const dest = './dist/'

function copyHTML() {
	return gulp.src(source + '**/*.html').pipe(gulp.dest(dest))
}

function copy() {
	return gulp
		.src([
			`${source}**/**`,
			`!${source}js/**/**`,
			`!${source}css/**/**`,
			`!${source}**/*.html`,
		])
		.pipe(gulp.dest(dest))
}

function styles() {
	return gulp
		.src(source + '**/*.css')
		.pipe($.sourcemaps.init())
		.pipe(postcss([cssImport, cssvars, nested, tailwind, autoprefixer]))
		.pipe($.sourcemaps.write('.'))
		.pipe(gulp.dest(dest))
}

function clean() {
	return del(['./dist'])
}

function watch() {
	gulp.watch(source + 'css/**/*.css', styles).on('change', browserSync.reload)
	gulp.watch(source + '**/*.html', copyHTML).on('change', browserSync.reload)
	gulp
		.watch(
			['./tailwind.config.js', './postcss.config.js', './gulpfile.js'],
			styles
		)
		.on('change', browserSync.reload)
}

function server() {
	browserSync.init({
		notify: false,
		server: {
			baseDir: dest,
		},
	})
	watch()
}

var build = gulp.series(
	clean,
	gulp.parallel(copy, copyHTML, styles),
	server,
	watch
)

gulp.task('default', build)
