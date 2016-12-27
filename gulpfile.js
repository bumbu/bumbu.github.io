// Sort alphabetically
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const exec = require('child_process').exec
const gulp = require('gulp')
const gutil = require('gulp-util')
const livereload = require('gulp-livereload')
const nib = require('nib')
const path = require('path')
const plumber = require('gulp-plumber')
const sourcemaps = require('gulp-sourcemaps')
const stylus = require('gulp-stylus')
const webpackStream = require('webpack-stream')

const PATHS = {
  SRC: '_source',
  SITE: '_site',
  CSS: {
    SRC: '_source/styles/',
    DIST: 'assets/css/',
  },
  JS: {
    SRC: '_source/scripts/',
    DIST: 'assets/js/',
  },
}

/**
 * Styles
 */

gulp.task('dev:styles', function() {
  return gulp.src(PATHS.CSS.SRC + 'main.styl')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus({use: [nib()], 'include css': true}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.join(PATHS.SITE, PATHS.CSS.DIST)))
    .pipe(gulp.dest(PATHS.CSS.DIST))
    .pipe(livereload());
})

gulp.task('build:styles', function() {
  return gulp.src(PATHS.CSS.SRC + 'main.styl')
    .pipe(plumber())
    .pipe(stylus({use: [nib()], 'include css': true}))
    .pipe(autoprefixer({browsers: ['last 2 versions', 'ie >= 10']}))
    .pipe(gulp.dest(PATHS.CSS.DIST))
})

/**
 * Scripts
 */

gulp.task('dev:scripts', function() {
  return gulp.src(PATHS.JS.SRC + 'main.js')
    .pipe(webpackStream({
      devtool: 'inline-source-map',
      output: {
        filename: 'main.js',
      },
    }))
    .on('error', function handleError() {
      this.emit('end'); // Recover from errors
    })
    .pipe(gulp.dest(PATHS.JS.DIST))
})

gulp.task('build:scripts', function() {
  return gulp.src(PATHS.JS.SRC + 'main.js')
    .pipe(webpackStream({
      output: {
        filename: 'main.js',
      },
      plugins: [
        new webpackStream.webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false
          }
        })
      ]
    }))
    .pipe(gulp.dest(PATHS.JS.DIST))
})

/**
 * Jekyll
 */

gulp.task('dev:jekyll', function() {
  const shellCommand = 'bundle exec jekyll serve --config _config.yml,_source/dev_config.yml'
  const executed = exec(shellCommand);

  executed.stdout.on('data', function (data) {
    console.log(data.toString());
  });
})

/**
 * Watch
 */

gulp.task('dev:watch', function() {
  livereload.listen();
  gulp.watch([PATHS.JS.SRC + '**/*.js'], ['dev:scripts'])
    .on('change', function(event) {
      gutil.log('File changed', event.path);
    });
  gulp.watch([PATHS.CSS.SRC + '**/*.styl'], ['dev:styles']);
})

gulp.task('default', ['dev:styles', 'dev:scripts', 'dev:watch', 'dev:jekyll'])
gulp.task('build', ['build:styles', 'build:scripts'])
