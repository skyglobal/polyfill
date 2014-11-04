'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var runSequence = require('run-sequence');
var deploy = require("gulp-gh-pages");
var run = require("gulp-run");
var bower = require('gulp-bower');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var pkg = require('./package.json');
var aws_s3 = require('gulp-aws-s3').setup({bucket: process.env.AWS_SKYGLOBAL_BUCKET});

var paths= {
    "site": {
        html: [    "_site" ],
        css: '_site/css'
    },
    "demo": {
        html: "demo/*.html"
    },
    "dist": {
        css: "dist/css",
        js: "dist/js"
    },
    sass: ['scss','demo/scss'],
    js: ['src/**/*']
};

gulp.task('js', function() {
    gulp.src(paths.js)
        .pipe(concat('polyfill.js'))
        .pipe(gulp.dest(paths.dist.js));
    return gulp.src(paths.js)
        .pipe(concat('polyfill.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist.js));
});



gulp.task('sass', function() {
    browserSync.notify('<span style="color: grey">Running:</span> Sass compiling');
    return gulp.src(paths["sass"] + '/**/*.scss')
        .pipe(sass({
            includePaths: ['scss','bower_components'],
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest(paths.site.css))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('browserSync', function() {
    browserSync({
        port: 3456,
        server: {
            baseDir: "_site"
        }
    });
});



gulp.task('watch', function() {
    gulp.watch(paths.site.html, ['create-site']);
    gulp.watch(paths['sass'], ['sass']);
});

gulp.task('build', function(cb) {
    return runSequence('bower', ['sass', 'js', 'create-site'],
        cb
    );
});


gulp.task('gh-pages', function () {
    gulp.src("./_site/**/*")
        .pipe(deploy({
            cacheDir: '.tmp'
        })).pipe(gulp.dest('/tmp/gh-pages'));
});


gulp.task('bower', function() {
    return bower()
});

gulp.task('create-site', function() {
    gulp.src([paths.demo.html, paths.dist.js + '/**/*'])
        .pipe(gulp.dest('_site'));
});

gulp.task('aws', function() {
    gulp.src(paths.dist.js + '/*.js')
        .pipe(aws_s3.upload({ path:'components/' + pkg.name.replace('bskyb-','') + '/' + pkg.version + '/'} ));
});

gulp.task('run-release-bower', function(cb) {
    run('git tag -a v'+ pkg.version +' -m "release v' + pkg.version +' for bower"; git push origin master v'+ pkg.version).exec();
});


gulp.task('serve', function(callback) {
    return runSequence(
        'build',
        ['browserSync', 'watch'],
        callback
    );
});


gulp.task('release:gh-pages', function(cb) {
    return runSequence(
        'build',
        'gh-pages',
        cb
    );
});

gulp.task('release:bower', function(cb) {
    return runSequence(
        'build',
        'run-release-bower',
        cb
    );
});

gulp.task('release:cdn', function(cb) {
    return runSequence(
        'build',
        'aws',
        cb
    );
});