
//======================================================
// OVERVIEW
//======================================================

// gulp compiles sass, runs autoprefixer, concats js, watches 
// for changes and serves with livereload... simple
 
// DISCLAIMER

// clearly, this process does not concatenate/minify css or js
// this is meant for display purposes only 
// and would not be the case on a production site

//======================================================
// SETUP
//======================================================

// gulp
var gulp = require('gulp'); 

// plugins
var sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean');


// paths
var app = './app',
    dist = './bertie',
    deploy = '../../../Dropbox/Apps/bertie',
    css = '/css',
    js = '/js',
    img = '/img';

//======================================================
// PROCESS
//======================================================

// compile scss and autoprefix
gulp.task('css', function() {
    gulp.src(app + css + '/*.scss')
        .pipe(sass())
        .pipe(prefix(["last 2 versions", "> 1%", "ie 8", "ie 7"], { cascade: true }))
        .pipe(gulp.dest(dist + css))
        .pipe(connect.reload());
});

// concat js
gulp.task('js', function() {
    gulp.src(app + js + '/*.js')
        .pipe(gulp.dest(dist + js))
        .pipe(connect.reload());
    gulp.src(app + js + '/vendor/*.js')
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dist + js))
        .pipe(connect.reload());
});

// minify images
gulp.task('images', function () {
    return gulp.src(app + img + '/*.jpg')
        .pipe(imagemin())
        .pipe(gulp.dest(dist + img))
        .pipe(connect.reload());
});

// move other files
gulp.task('move', function () {
    gulp.src(app + '/*.{txt,html,ico}')
        .pipe(gulp.dest(dist))
        .pipe(connect.reload());
    gulp.src(app + css + '/fonts/*')
        .pipe(gulp.dest(dist + css + '/fonts'))
        .pipe(connect.reload());
});

//======================================================
// SERVE
//======================================================

// clean
gulp.task('clean', function () {
    return gulp.src(dist, {read: false})
        .pipe(clean());
});

// watch
gulp.task('watch', function() {
    gulp.watch(app + css + '/*.scss', ['css']);
    gulp.watch(app + js + '/*.js', ['js']);
    gulp.watch(app + img + '/*.jpg', ['images']);
    gulp.watch(app + '/*.{txt,html,ico}', ['move']);
});

// serve
gulp.task('connect', function() {
  connect.server({
    root: dist,
    port: 9000,
    livereload: true
  });
});

// build
gulp.task('build', [ 'clean', 'css', 'js', 'images', 'move' ]);

// default
gulp.task('default', [ 'build', 'watch', 'connect' ]);

//======================================================
// DEPLOY
//======================================================

// clean the deployment repo
gulp.task('cleandeploy', function () {
    return gulp.src(deploy, {read: false})
        .pipe(clean({force: true}));
});

// build and copy dist to the deploy repo
gulp.task('deploy', ['build', 'cleandeploy'], function () {
    gulp.src(dist + '/**/*.*', { base: './' })
        .pipe(gulp.dest(deploy + '/..'));
});