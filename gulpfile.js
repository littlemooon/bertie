// gulp
var gulp = require('gulp'); 

// plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserify = require('gulp-browserify');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');
var exec = require('gulp-exec');

// paths
var app = './app';
var dist = './dist';
var site = './_site';
var js = '/js';
var css = '/css';
var img = '/img';

// lint js
gulp.task('lint', function() {
    gulp.src(app + js + '/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// compile sass
gulp.task('css', function() {
    gulp.src(app + css + '/*.sass')
        .pipe(sass())
        .pipe(gulp.dest(dist + css));
    gulp.src(app + css + '/vendor/*.css')
        .pipe(gulp.dest(dist + css));
});

// concat and move js
gulp.task('scripts', function() {
    gulp.src(app + js + '/main.js')
        // .pipe(browserify())
        // .pipe(uglify())
        .pipe(gulp.dest(dist + js));
    gulp.src(app + js + '/vendor/*.js')
        // .pipe(concat('vendor.js'))
        // .pipe(uglify())
        .pipe(gulp.dest(dist + js));
    gulp.src(app + js + '/bower_components/{,*/}*.js')
        // .pipe(concat(dist + js + '/main.js'))
        // .pipe(uglify())
        .pipe(gulp.dest(dist + js));
});

// minify images
gulp.task('images', function () {
    gulp.src(app + img + '/*.jpg')
        .pipe(imagemin())
        .pipe(gulp.dest(dist + img));
});

// move other files
gulp.task('move', function () {
    gulp.src(app + '/*.{txt,html,ico}')
        .pipe(gulp.dest(dist));
    gulp.src(app + '/_layouts/*.html')
        .pipe(gulp.dest(dist + '/_layouts'));
    gulp.src(app + css + '/fonts/*')
        .pipe(gulp.dest(dist + css + '/fonts'));
});

// run jekyll
gulp.task('jekyll', function () {
    gulp.src('.')
        .pipe(exec('jekyll serve'));
});

// clean
gulp.task('clean', function () {
    gulp.src([dist, site], {read: false})
        .pipe(clean({force: true}));
});

// watch
gulp.task('watch', function() {
    gulp.watch(app + js + '/*.js', ['lint', 'scripts', 'jekyll']);
    gulp.watch(app + css + '/*.scss', ['css', 'jekyll']);
    gulp.watch(app + img + '/*.jpg', ['images', 'jekyll']);
    gulp.watch(app + '/*.html', ['move', 'jekyll']);
});

// default task
gulp.task('default', [
            'clean',
            'lint', 
            'css', 
            'scripts',
            'images',
            'move',
            'jekyll',
            'watch'
        ]);