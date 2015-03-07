(function () {
    
    'use strict';

    var gulp = require('gulp'),
        sass = require('gulp-sass'),
        plumber = require('gulp-plumber');

    gulp.task('sass', function () {
        return gulp.src('scss/**/*.scss')
                    .pipe(plumber())
                    .pipe(sass({
                        outputStyle: 'compressed',
                        errLogToConsole: true
                    }))
                    .pipe(gulp.dest('css'));
    });

    gulp.task('watch', function () {
        gulp.watch('scss/**/*.scss', ['sass']);
    });
    
    gulp.task('default', ['watch']);
    
}());