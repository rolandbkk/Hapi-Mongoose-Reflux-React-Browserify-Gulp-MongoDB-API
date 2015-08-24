// include plug-ins
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');

var minifyCSS = require('gulp-minify-css');
var react = require('gulp-react');
var browserify = require('gulp-browserify');
var nodemon = require('gulp-nodemon');

// include gulp
var gulp = require('gulp'); 
var requireDir  = require('require-dir');

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', { recurse: true });

// Expose runnable and default tasks here
gulp.task('build', ['browserify', 'less']);

var jshint = require('gulp-jshint');

// JS hint task
gulp.task('jshint', function() {
  gulp.src('./assets/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// minify new images
gulp.task('imagemin', function() {
  var imgSrc = './assets/images/**/*',
      imgDst = './assets/images/min/';

  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});

// minify new or changed HTML pages
gulp.task('htmlpage', function() {
  var htmlSrc = './assets/*.html',
      htmlDst = './assets/min/';

  gulp.src(htmlSrc)
    .pipe(changed(htmlDst))
    .pipe(minifyHTML())
    .pipe(gulp.dest(htmlDst));
});
gulp.task('develop', function () {
  nodemon({ script: 'index.js'
    
         } )
 
})
// JS concat, strip debugging and minify
gulp.task('scripts', function() {
        return gulp.src('template.jsx')
        .pipe(react())
        .pipe(gulp.dest('dist'));
  gulp.src(['./src/js/lib.js','./src/j/*.js'])
    .pipe(concat('script.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./assets/js/min/'));
     gulp.src('assets/js/main.js')
        .pipe(browserify({
          insertGlobals : true,
          debug : !gulp.env.production
        }))
        .pipe(gulp.dest('./assets/js/min/'))
});

// CSS concat, auto-prefix and minify
gulp.task('styles', function() {
  gulp.src(['./assets/css/*.css'])
    .pipe(concat('main.css'))
  
    .pipe(minifyCSS())
    .pipe(gulp.dest('./assets/css/min/'));
});
gulp.task('styles2', function() {
  gulp.src(['./assets/css/*.css'])
    .pipe(concat('full-width-pics.css'))
  
    .pipe(minifyCSS())
    .pipe(gulp.dest('./assets/css/min/'));
});
// default gulp task
gulp.task('default', ['imagemin', 'htmlpage', 'scripts', 'styles','styles2','develop','build' ], function() { 
  // watch for HTML changes
  gulp.watch('./assets/*.html', function() {
    gulp.run('htmlpage');
  });

  // watch for JS changes
  gulp.watch('./assets/js/*.js', function() {
    gulp.run('jshint', 'scripts');
  });

  // watch for CSS changes
  gulp.watch('./assets/css/*.css', function() {
    gulp.run('styles');
  });
});