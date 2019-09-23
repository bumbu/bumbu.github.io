// Sort alphabetically
const autoprefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')
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
  HG: { // Highlighter
    SRC: './node_modules/prismjs/'
  },
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
 * Highlighter
 */

let highlighterFilesJs = ['prism.js']

// Languages
const highlighterLangs = ['bash', 'clike', 'coffeescript', 'c', 'cpp', 'css', 'css-extras', 'elixir', 'git', 'haml', 'html', 'handlebars', 'java', 'javascript', 'json', 'jsx', 'less', 'markdown', 'markup', 'markup-templating', 'php', 'processing', 'python', 'ruby', 'sass', 'scss', 'sql', 'stylus', 'swift', 'typescript', 'yaml']
for (let lang of highlighterLangs) {
  highlighterFilesJs.push(`components/prism-${lang}.js`)
}

// Plugins
highlighterFilesJs.push('plugins/line-highlight/prism-line-highlight.js')
highlighterFilesJs.push('plugins/line-numbers/prism-line-numbers.js')
highlighterFilesJs.push('plugins/autolinker/prism-autolinker.js')
highlighterFilesJs.push('plugins/toolbar/prism-toolbar.js')
highlighterFilesJs.push('plugins/show-language/prism-show-language.js')
highlighterFilesJs.push('plugins/normalize-whitespace/prism-normalize-whitespace.js')

// Add folder prefix
for (let i = 0; i < highlighterFilesJs.length; i++) {
  highlighterFilesJs[i] = PATHS.HG.SRC + highlighterFilesJs[i]
}

// Secondary scripts
let secondaryJs = []
secondaryJs.push('node_modules/jquery/dist/jquery.min.js')
secondaryJs.push('node_modules/imagelightbox/dist/imagelightbox.min.js')
secondaryJs.push('_source/scripts/inpage.js')

const highlighterFilesCss = [
  PATHS.HG.SRC + 'themes/prism.css',
  // Plugins
  PATHS.HG.SRC + 'plugins/line-highlight/*.css',
  PATHS.HG.SRC + 'plugins/line-numbers/*.css',
  PATHS.HG.SRC + 'plugins/autolinker/*.css',
  PATHS.HG.SRC + 'plugins/show-language/*.css',
  PATHS.HG.SRC + 'plugins/toolbar/*.css'
]

gulp.task('build:secondary', ['build:secondary:js', 'build:secondary:css'])

gulp.task('build:secondary:js', function() {
  const sources = [].concat(highlighterFilesJs).concat(secondaryJs)

  return gulp.src(sources)
    .pipe(concat('secondary.js'))
    .pipe(gulp.dest(PATHS.JS.DIST))
})

gulp.task('build:secondary:css', function() {
  return gulp.src(highlighterFilesCss)
    .pipe(concat('highlighter.css'))
    // .pipe(csso(false))
    .pipe(gulp.dest(PATHS.CSS.DIST))
})

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
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            include: __dirname,
            query: {
              presets: ["react", "es2015"],
              plugins: ['transform-decorators-legacy'],
            }
          }
        ]
      }
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
        new webpackStream.webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
        }),
        new webpackStream.webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        })
      ],
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            include: __dirname,
            query: {
              presets: ["react", "es2015"],
              plugins: ['transform-decorators-legacy'],
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest(PATHS.JS.DIST))
})

/**
 * Jekyll
 */

gulp.task('dev:jekyll', function() {
  const shellCommand = 'bundle exec jekyll serve --host 0.0.0.0 --port 4000 --config _config.yml,_source/dev_config.yml'
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

gulp.task('default', ['build:secondary', 'dev:styles', 'dev:scripts', 'dev:watch', 'dev:jekyll'])
gulp.task('build', ['build:secondary', 'build:styles', 'build:scripts'])
