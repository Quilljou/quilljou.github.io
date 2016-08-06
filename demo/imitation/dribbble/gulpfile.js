var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();


gulp.task('sass', function() {
    return gulp.src('src/sass/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './dist/'
        },
    })
});

gulp.task('index', function() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist'))
})

gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
})

gulp.task('watch', ['browserSync', 'sass', 'index', 'fonts'], function() {
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/index.html', ['index']);
    gulp.watch('src/fonts/**/*', ['fonts']);
    gulp.watch('src/index.html', browserSync.reload);
});
