var gulp = require('gulp');
var gulpif = require('gulp-if');
var args = require('yargs').argv;

var src = 'src/';
var dist = 'dist/';

/* CSS */
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var cssClean = require('gulp-clean-css');

/* JS & TS */
var typescript = require('gulp-typescript');

var gzip = require('gulp-gzip');
var del = require('del');
var flatten = require('gulp-flatten');

var tsProject = typescript.createProject('tsconfig.json');

gulp.task('build-css', function () {
    return gulp.src(src + 'app/**/*.scss')
        .pipe(gulpif(!args.production, sourcemaps.init()))
        .pipe(sass({}).on('error', sass.logError))
        .pipe(gulpif(!args.production, sourcemaps.write()))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulpif(args.production, cssClean({compatibility: 'ie8'})))
        .pipe(gulpif(args.production, flatten()))
        .pipe(gulpif(args.production, gulp.dest(dist), gulp.dest(dist + 'app/')));
});

gulp.task('build-ts', function () {
    return gulp.src(src + 'app/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dist + 'app'));
});

gulp.task('build-copy', function () {

    gulp.src([src + 'app/**/*.html', src + 'app/**/*.htm', src + 'app/**/*.css'])
        .pipe(gulpif(args.production, flatten()))
        .pipe(gulpif(args.production, gulp.dest(dist), gulp.dest(dist + 'app/')));

    gulp.src(src + '/index.html')
        .pipe(gulp.dest(dist));

    return gulp.src(src + '/systemjs.config.js')
        .pipe(gulp.dest(dist));
});

gulp.task('clean', function() {
   del([dist + '/**/*.html', dist + '/**/*.htm', dist + '/**/*.css', dist + 'app']);
});

gulp.task('compress', function () {
    return gulp.src(dist + 'app/**/*.js')
        .pipe(gzip())
        .pipe(gulp.dest(dist + 'app/'));
});

gulp.task('vendor', function () {
    // // Angular 2 Framework
    gulp.src('node_modules/@angular/**')
        .pipe(gzip())
        .pipe(gulp.dest(dist + '/vendor/@angular'));

    //ES6 Shim
    gulp.src('node_modules/es6-shim/**')
        .pipe(gzip())
        .pipe(gulp.dest(dist + '/vendor/es6-shim/'));

    //reflect metadata
    gulp.src('node_modules/reflect-metadata/**')
        .pipe(gzip())
        .pipe(gulp.dest(dist + '/vendor/reflect-metadata/'));

    //rxjs
    gulp.src('node_modules/rxjs/**')
        .pipe(gzip())
        .pipe(gulp.dest(dist + '/vendor/rxjs/'));

    //systemjs
    gulp.src('node_modules/systemjs/**')
        .pipe(gzip())
        .pipe(gulp.dest(dist + '/vendor/systemjs/'));

    //zonejs
    return gulp.src('node_modules/zone.js/**')
        .pipe(gzip())
        .pipe(gulp.dest(dist + '/vendor/zone.js/'));
});

gulp.task('watch', function () {
    gulp.watch(src + '**/*.ts', ['build-ts']);
    gulp.watch(src + '**/*.scss', ['build-css']);
    gulp.watch(src + '**/*.(html|htm|css)', ['build-copy']);
});

gulp.task('build', ['build-ts', 'build-css', 'build-copy']);


gulp.task('default', ['build', 'watch']);