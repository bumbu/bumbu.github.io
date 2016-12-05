// Sort alphabetically
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const gulp = require('gulp')
const gutil = require('gulp-util')
const plumber = require('gulp-plumber')
const nib = require('nib')
const run = require('gulp-run')
const sourcemaps = require('gulp-sourcemaps')
const stylus = require('gulp-stylus')
const webpackStream = require('webpack-stream')

const PATHS = {
  SRC: '_source',
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
    .pipe(gulp.dest(PATHS.CSS.DIST))
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
  var shellCommand = 'bundle exec jekyll serve --config _config.yml,_source/dev_config.yml'

  return gulp.src('.')
    .pipe(run(shellCommand))
    .on('error', gutil.log)
})

/**
 * Watch
 */

gulp.task('dev:watch', function() {
  gulp.watch([PATHS.JS.SRC + '**/*.js'], ['dev:scripts'])
    .on('change', function(event) {
      gutil.log('File changed', event.path);
      // console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
  gulp.watch([PATHS.CSS.SRC + '**/*.styl'], ['dev:styles']);
})

gulp.task('default', ['dev:styles', 'dev:scripts', 'dev:watch', 'dev:jekyll'])
gulp.task('build', ['build:styles', 'build:scripts'])
