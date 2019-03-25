const gulp = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();


sass.compiler = require('node-sass');

gulp.task('html', function (){
  return gulp.src('./src/index.html')
  	.pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
});

gulp.task('sass', function () {
  return gulp.src('./src/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(csso())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))    
    .pipe(browserSync.stream());
});

gulp.task('js', function (){
  return gulp.src('./src/**/*.js')
    .pipe(browserSync.stream());
});

gulp.task('images', () =>
	gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'))
);

gulp.task('default', function () {
  browserSync.init({
      server: {
          baseDir: "./dist"
      }
  });
  gulp.watch('./src/*.sass', gulp.series('sass'));
  gulp.watch('./src/index.html', gulp.series('html'));
  gulp.watch('./src/**/*.js', gulp.series('js'));
  gulp.watch('./src/images/*', gulp.series('images'));
});
