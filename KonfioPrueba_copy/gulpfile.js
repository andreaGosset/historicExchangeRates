var gulp = require('gulp');
var concat = require('gulp-concat');
 
gulp.task('build-js', function() {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/d3/d3.min.js', 'node_modules/c3/c3.min.js', 'myScript.js'])
        .pipe(concat('all-scripts.js'))
        .pipe(gulp.dest('.'));
});

gulp.task('build-css', function() {
    return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css', 'node_modules/c3/c3.css'])
        .pipe(concat('all-styles.css'))
        .pipe(gulp.dest('.'));
});