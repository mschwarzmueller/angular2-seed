var gulp = require('gulp');

var src = 'src/';
var dist = 'dist/';

/* CSS */
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var cssClean = require('gulp-clean-css');

/* JS & TS */
var typescript = require('gulp-typescript');

var tsProject = typescript.createProject('tsconfig.json');

gulp.task('build-css', function () {
    return gulp.src(src + 'css/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(cssClean({compatibility: 'ie8'}))
        .pipe(gulp.dest(dist + 'css/'));
});

gulp.task('build-ts', function () {
    return gulp.src(src + 'app/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dist + 'app/'));
});

gulp.task('prepare-serve', function() {

    // systemjs.config
    gulp.src(src + '/systemjs.config.js')
        .pipe(gulp.dest(dist));

    // index.html
    gulp.src(src + '/**/*.html')
        .pipe(gulp.dest(dist));

    // Angular 2 Framework
    gulp.src('node_modules/@angular/**')
        .pipe(gulp.dest(dist + '/vendor/@angular'));
    
    //ES6 Shim
    gulp.src('node_modules/es6-shim/**')
        .pipe(gulp.dest(dist + '/vendor/es6-shim/'));

    //reflect metadata
    gulp.src('node_modules/reflect-metadata/**')
        .pipe(gulp.dest(dist + '/vendor/reflect-metadata/'));

    //rxjs
    gulp.src('node_modules/rxjs/**')
        .pipe(gulp.dest(dist + '/vendor/rxjs/'));

    //systemjs
    gulp.src('node_modules/systemjs/**')
        .pipe(gulp.dest(dist + '/vendor/systemjs/'));
    
    //zonejs
    return gulp.src('node_modules/zone.js/**')
        .pipe(gulp.dest(dist + '/vendor/zone.js/'));
});

gulp.task('watch', function () {
    gulp.watch(src + '**/*.ts', ['build-ts']);
    gulp.watch(src + 'css/**/*.scss', ['build-css']);
    gulp.watch(src + '**/*.html', ['build-html']);
});

gulp.task('build', ['build-ts', 'build-css']);

gulp.task('default', ['build', 'watch']);