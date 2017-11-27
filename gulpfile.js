
// lägg till alla plugins till variabler så man kan använda dem
var gulp   = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass   = require('gulp-sass'),
    maps   = require('gulp-sourcemaps'),
    del    = require('del'),
    connect= require('gulp-connect'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    uglifycss = require('gulp-uglifycss');

// denna tar alla javascript filer och gör dem till app.js
gulp.task("concatJS", function(){
    //return gör så att denna görs innan minifyScripts
    // under src lägger du dina javascript filer som skall tas med
    return gulp.src(['node_modules/jquery/dist/jquery.js', 'js/main.js'])
    //skapa en map fil för att se exakt vilken fil koden kommer från i webbläsaren
    .pipe(maps.init())
    //skapa en app.js fil för all kombinerad data
    .pipe(concat('app.js'))
    //lägg detta i root directory
    .pipe(maps.write('./'))
    //under mappen /js/
    .pipe(gulp.dest('js'))
    .pipe(connect.reload());
});

//Minify all javascript till en ny fil
gulp.task('minifyScripts', ['concatJS'], function(){
    //tar app.js filen
    gulp.src('js/app.js')
    //minimerar den
    .pipe(uglify())
    //skapar ny fil med app.min.js
    .pipe(rename('app.min.js'))
    //skickar den till mappen /js/
    .pipe(gulp.dest('js'));
});

//Minify all css till en ny fil OBS DEMO. kan bara ändra outputstyle i sass till compressed
gulp.task('minifyCSS', function(){
    //tar app.js filen
    gulp.src('css/*.css')
    //minimerar den
    .pipe(uglifycss())
    //skapar ny fil med app.min.js
    .pipe(rename('main.min.css'))
    //skickar den till mappen /js/
    .pipe(gulp.dest('./'));
});

//gör om sass/scss till css
gulp.task('compileSass', function(){
    // tar allt från filen main.scss (den har @imports i sig för alla mixins)
    gulp.src('scss/main.scss')
    //skapar en map fil för att se exakt vilken fil koden kommer från i webbläsaren
    //.pipe(maps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    //skriv till root
    //.pipe(maps.write('./'))
    //prefix css
    .pipe( postcss( [ autoprefixer( { browsers: ["> 0%"] } ) ] ) )﻿
    //under mappen /css/
    .pipe(gulp.dest('css'))
    .pipe(connect.reload());
});
//autoprefixer
gulp.task('autoprefixer', function(){
    gulp.src('css/main.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'))
});
// kolla för html ändringar
gulp.task('html', function(){
    gulp.src('*.html')
    .pipe(connect.reload());
});

// watchFiles kollar efter ändringar
gulp.task('watchFiles', function(){
    // kollar under scss mappen och alla submappar för förändringar till .scss filer
    gulp.watch(['scss/**/*.scss'], ['compileSass']);
    // kollar efter main.js ändringar och sedan kör concatJS tasken
    gulp.watch('js/main.js', ['concatJS']);
    // kolla html index.html
    gulp.watch('*.html', ['html']);
});

//tar bort all genererad data, som dist mappen, css filen och app filen så man får alltid nya filer vid build metoden
gulp.task('clean', function(){
    del(['dist', 'css/main.css*', 'js/app*.js*']);
});

//connect för liveserver/reload
gulp.task('connect', function(){
    return connect.server({
        root: './',
        port: 8888, // optional
        livereload: true
    });
});
gulp.task('serve', ['connect','compileSass','concatJS', 'watchFiles']);
// default task som först clean task och sedan kör build
gulp.task("default", ['clean'], function(){
    gulp.start('build');
});

// bygger distributions mappen med alla filer
gulp.task('build', ['compileSass', 'minifyScripts'], function(){
    // efter minifyScripts och compileSass är klar så return tar den alla följande filer och spottar ut dem till root directory
    // base i slutet gör så att allt kommer i sina korrekta folders annars kommer allt i en och samma folder
    return gulp.src(['css/main.css', 'js/app.js', 'index.html', 'img/**','fonts/**'], { base: './'})
    // spotta ut allt till dist mappen 
    .pipe(gulp.dest('dist'));
});