var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');

gulp.task('sass', function() {
    return gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './dist/',
            open: "external"
        },
    })
});

// 传送src中的index至dist
gulp.task('index', function() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist'))
})

gulp.task('js', function() {
    return gulp.src('src/js/*')
        .pipe(gulp.dest('dist/js/'))
})

// gulp.task('fonts', function() {
//     return gulp.src('src/fonts/**/*')
//         .pipe(gulp.dest('dist/fonts'))
// })


gulp.task('watch', ['browserSync', 'sass', 'index','js'], function() {
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/index.html', ['index']);
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch('src/index.html', browserSync.reload);
    // gulp.watch('src/fonts/**/*', ['fonts']);
});
