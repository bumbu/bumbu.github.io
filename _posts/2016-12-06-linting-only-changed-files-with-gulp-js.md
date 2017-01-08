---
title: Linting only changed files with Gulp.js
date: 2016-12-06T22:00:33+00:00
author: bumbu
layout: post
permalink: /linting-only-changed-files-with-gulp-js/
categories: development
---
Many gulp projects I saw are set-up with a generic SASS lint task that lints all the files (usually on start/build and when any of the SASS files changes:

```js
var gulp = require('gulp);
var sassLint = require('gulp-sass-lint');
var SASS_FILES = ['source/**/*.scss'];

gulp.task('sass', function() {
  // compile SASS
});

gulp.task('sass-lint', function() {
  return gulp.src(SASS_FILES)
    .pipe(sassLint())
    .pipe(sassLint.format());
});

gulp.task('watch', function() {
  gulp.watch(SASS_FILES, ['sass', 'sass-lint']); // compile and lint
});

gulp.task('default, ['sass', 'sass-lint', 'watch']);
```

While this setup is fine, it has few drawbacks:
* If you have lots of SASS files and a not-so-powerful computer, then linting all the files may be significantly slow (for one project I had 3 seconds solely for this task). This, paired with SASS compilation slows down the development as with most projects I get instant feedback on my changes (with the help of livereload/browsersync/hot modules).
* Adding linting to a project that has a significant amount of files will spit lots of warnings. Most probably developers will tend to ignore warnings instead of trying to fix them for those files they're working on.

## Linting only changed files

It is actually quite easy to lint only files that change. To do that we listen for changed files, and when a file changes, we lint just that one file:

```js
gulp.task('watch', function() {
  gulp.watch(SASS_FILES, function(ev) {
      if (ev.type === 'added' || ev.type === 'changed') {
        lintFile(ev.path);
      }
  });
}

function lintFile(file) {
  gulp.src(file)
    .pipe(sassLint())
    .pipe(sassLint.format());
}
```

You can see that we're listening only for added/changed events. We're not interested in deleted files.

> Tip! If you want to have newly added files to be watched automatically then do not prefix your files' paths with `./`: instead of `./source/**/*.scss` use `source/**/*.scss`.

## Debouncing watch function

If you're working with a SCM system (e.g. GIT) then you may end up with lots of files changing really quick (e.g. when you switch between branches). That may have an unpleasant surprise of slowing your computer as multiple lint task will run in parallel. A solution is to debounce gulp.watch:

```js|hl=2
gulp.task('watch', function() {
  gulp.watch(SASS_FILES, {debounceDelay: 200}, function(ev) {
      if (ev.type === 'added' || ev.type === 'changed') {
        lintFile(ev.path);
      }
  });
}
```

## Showing system notifications for linting warnings

You can have system notifications for any gulp events, but only for some things they're really useful. One of such things are compilation and linting errors. Actually instead of linting errors notifications it is better to have a IDE plugin that will show them right in the editor, but you can't force all the developers to do that. On the other hand all developers have to run Gulp :evil:.

To do that we'll use node-notifier. Following example is for macOS but it is easy to adjust for other platforms:

```js
var notifier = require('node-notifier');
var through = require('through2');

function lintFile(file) {
  gulp.src(file)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(through.obj(function(file, encoding, cb) {
      // Lint only first warning
      if (file.sassLint.length && file.sassLint[0].warningCount) {
        let lint = file.sassLint[0];
        let shortPath = lint.filePath.split('/').slice(-3).join('/');

        notifier.notify({
          'title': `SCSS Warnings`,
          'subtitle': `${shortPath}`,
          'message': `${lint.warningCount} warnings`,
          'wait': true,
          'file': path.join(__dirname, lint.filePath),
        });
      }
      cb();
    }));
}
```

That will trigger following system notification:
<img src="{{site.root}}/assets/images/2016/12/sass-linting-warnings.png" alt="sass-linting-warnings" width="341" height="86" class="alignnone size-full wp-image-1080" />

You can see that we passed the `file` attribute to the notifier. It is actually not necessary, but we'll use it to have a one more nice functionality - clicking on the notification will open that file in the editor (you have to set up in your system preferences to open `.scss` files by default with your preferred editor).

For that we'll need this piece of code:
```js
notifier.on('click', function (notifierObject, options) {
  if (options.file) {
    require('child_process').exec(`open "${options.file}"`);
  }
});
```

You can use the same principle for linting/processing other types of files (e.g. JS) and for other types of errors (e.g. compilation errors).
