var gulp = require('gulp'),
    inject = require('gulp-inject'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean');

var jsSources = ['src/js/**/*.js'],
    cssSources = ['src/style/**/*.scss'],
    htmlSources = ['**/*.html'];


gulp.task('clean', function(){
    return gulp.src('./dist/*.*', {read: false})
    .pipe(clean());
});
/**JS gulp tasks*****************************************************************/
gulp.task('concatJs', function(){
    gulp.src(['node_modules/angular/angular.js' ,'./src/js/**/*.js'])
    .pipe(concat('build.js'))
    .pipe(gulp.dest('./dist/'))
});

/**CSS gulp tasks*****************************************************************/
gulp.task('compileSass', function(){
    gulp.src(['node_modules/bulma/bulma.sass', './src/style/*.scss'])
    .pipe(sass())
    //and concatenates them
    .pipe(concat('build.css'))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('inject', function(){
    var sources = gulp.src(['./dist/*.css', './dist/*.js'])
    gulp.src('./src/index.html')
        .pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest('./src'));
});

gulp.task('connect', function(){
    connect.server({
        root: './src',
        livereload: true,
        port: 8888
    })
});

//checks js/html/css on change...
gulp.task('watch', function() {
    gulp.watch(jsSources, ['js']);
    gulp.watch(cssSources, ['css']);
    gulp.watch(htmlSources, ['html']);
});

//...and reloads
gulp.task('js', function() {
    gulp.src(jsSources)
        .pipe(connect.reload())
});

gulp.task('html', function() {
    gulp.src(htmlSources)
        .pipe(connect.reload())
});

gulp.task('css', function() {
    gulp.src(cssSources)
        .pipe(connect.reload())
});

gulp.task('build', ['clean', 'concatJs', 'compileSass']);

gulp.task('serve', ['inject', 'connect', 'watch']);