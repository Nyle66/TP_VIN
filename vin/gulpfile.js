var gulp = require('gulp');
var ts = require('gulp-typescript');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('ts', function () {
    return gulp.src('TS/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts({
            noImplicitAny: true,
            outFile: 'main.js',
            module : "system",
            target: "es6"
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('JS'))
        .pipe(livereload());
});

gulp.task("watch", function(){
    livereload.listen();
    gulp.watch( ["./TS/**/*.ts"], ["ts"] );
});