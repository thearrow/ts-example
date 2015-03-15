var browserSync = require('browser-sync');
var concat      = require('gulp-concat');
var gulp        = require('gulp');
var sourcemaps  = require('gulp-sourcemaps');
var ts          = require('gulp-typescript');
var tsProject   = ts.createProject({
    sortOutput: true
});

gulp.task('scripts', function() {
  var tsResult = gulp.src('./*.ts')
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject));

  return tsResult.js
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(''));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('watch', ['scripts', 'browser-sync'], function(){
  gulp.watch('./*.ts', ['scripts', browserSync.reload]);
});

gulp.task('default', ['watch']);