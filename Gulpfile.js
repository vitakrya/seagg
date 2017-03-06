var gulp = require('gulp');
var jshint = require('gulp-jshint');
var eslint = require('gulp-eslint');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify');
var es = require('event-stream');
var buffer = require('vinyl-buffer');
var del = require('del');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var pump = require('pump');

gulp.task('copyStaticFiles', function() {
  return gulp.src('./src/{html,css}/*.*')
            .pipe(gulp.dest('./build'));
});

gulp.task('clean', function() {
  return del([
    'build/**/*',
    'dist/**/*',
    '!build/css/fr.css'
  ]);
});

gulp.task('build', function() {
  // return es.concat(
  //   browserify({
  //     entries: ['./src/js/index.js']
  //   })
  //   .transform(babelify.configure({
  //     presets: ['es2015', 'react']
  //   }))
  //   .bundle()
  //   .pipe(source('bundle.js'))
  //   .pipe(gulp.dest('./build')),

  //   browserify({
  //     entries: ['./src/js/index.js']
  //   })
  //   .transform(babelify.configure({
  //     presets: ['es2015', 'react']
  //   }))
  //   .bundle()
  //   .pipe(source('bundle.js'))
  //   .pipe(rename('bundle.min.js'))
  //   .pipe(streamify(uglify()))
  //   .pipe(gulp.dest('./build'))
  // );
  browserify({
    entries: ['./src/js/index.js']
  })
  .transform(babelify.configure({
    presets: ['es2015', 'react']
  }))
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./build'))
  .pipe(connect.reload());
});

gulp.task('build:min', function(cb) {
  pump([
    browserify({
      entries: ['./src/js/index.js']
    })
    .transform(babelify.configure({
      presets: ['es2015', 'react']
    }))
    .bundle(),
    uglify(),
    gulp.dest('./build')
  ], cb);
});

gulp.task('build:mini', function() {
  return browserify({
      entries: ['./src/js/index.js']
    })
    .transform(babelify.configure({
      presets: ['es2015', 'react']
    }))
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(rename('bundle.min.js'))
    .pipe(gulp.dest('./build'));
});

gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  });
});

gulp.task('scripts', function() {
  return gulp.src('./src/js/**/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter(require('jshint-stylish')));
});

gulp.task('sass', function() {
  return es.concat(
      gulp.src('src/scss/**/*.scss')
          .pipe(sass().on('error', sass.logError))
          .pipe(gulp.dest('./build/css')),
      gulp.src('src/scss/**/*.scss')
          .pipe(sass().on('error', sass.logError))
          .pipe(rename('app.min.css'))
          .pipe(csso())
          .pipe(gulp.dest('./build/css'))
          .pipe(connect.reload())
  );
});

gulp.task('eslint', function() {
  return gulp.src(['./src/js/**/*.js'])
              .pipe(eslint())
              .pipe(eslint.format());
});

gulp.task('watch', function() {
  gulp.watch('src/js/**/*.js', ['eslint', 'build']);
  gulp.watch('src/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['connect', 'watch']);
