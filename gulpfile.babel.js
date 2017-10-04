var gulp = require( 'gulp' );
var gulp_jspm = require('gulp-jspm');
var sass = require('gulp-sass');

gulp.task('default', ['sass'], function() {

    return gulp.src('scripts/main.js')
        .pipe(gulp_jspm())
        .pipe(gulp.dest('./'));
});

gulp.task('sass', function () {
    return gulp.src('./css/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('watch', ['default'], function(){
    return gulp.watch(['scripts/*','css/**/*.scss','lib/*','json/*','jspm_packages/**/*'],['default'])
})
