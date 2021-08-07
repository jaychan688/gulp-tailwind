import gulp from 'gulp'
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

function html() {
	return gulp.src(source + '**/*.html').pipe(gulp.dest(dest))
}
// function html() {
// 	return gulp.src(dest + '**/*.html')
// }

function styles() {
	return gulp
		.src(source + '**/*.css')
		.pipe(postcss([cssImport, cssvars, nested, tailwind, autoprefixer]))
		.pipe(gulp.dest(dest))
}

export function clean() {
	return del(['/dist'])
}

function watch() {
	gulp.watch(source + 'css/**/*.css', styles).on('change', browserSync.reload)
	gulp.watch(dest + 'index.html', html).on('change', browserSync.reload)
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

var build = gulp.series(gulp.parallel(clean, styles, html), server, watch)
gulp.task('default', build)
