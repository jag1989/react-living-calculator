var gulp = require('gulp'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream');


gulp.task('browserify', function() {
    
    var b = browserify({
            entries: ['src/index.js'], //entry file
            debug: true
        });
    
    b.transform([babelify, reactify]); // use the reactify transform
    
    return b.bundle()
            .pipe(source('calculator.js'))
            .pipe(gulp.dest('./public'));
});

gulp.task('watch', function() {
    gulp.watch('src/*.js', ['browserify']);
    gulp.watch('src/*.jsx', ['browserify']);
});

gulp.task('default', ['watch','browserify']);