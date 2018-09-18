const gulp = require('gulp');

const imagemin = require('gulp-imagemin');

const uglify = require('gulp-uglify');

const sass = require('gulp-sass');

const concat = require('gulp-concat');

// Defining Message Task
gulp.task('message',function(){
    return console.log('Gulp is running');
});

gulp.task('default',['message','copyHtml','imageMin', 'sass', 'scripts']);

//copy All Html files
gulp.task('copyHtml', function(){
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

//optimize the images
gulp.task('imageMin', ()=>{
    gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

//compile saas
gulp.task('sass',function(){
    gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

//defining scripts tasks and performing actions
gulp.task('scripts',function(){
    gulp.src('src/js/*.js')
    .pipe(uglify())//removes all whitespace
    .pipe(concat('main.js'))//concatinates all files
    .pipe(gulp.dest('dist/js'));//send to destination
});

//watching task which checks for any file changes
gulp.task('watch',function(){
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/images/*', ['imageMin']);
    gulp.watch('src/saas/*.scss', ['sass']);
    gulp.watch('src/*.html', ['copyHtml']);
});

