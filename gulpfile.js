var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-ruby-sass'),
    templateCache = require('gulp-angular-templatecache'),
    imageMin = require('gulp-imagemin'),
    connect = require('gulp-connect'),
    open = require('open'),
    liveReload = require('gulp-livereload'),
    inject = require('gulp-inject'),
    concat = require('gulp-concat'),
    ngConfig = require('gulp-ng-config'),
    injectString = require('gulp-inject-string'),
    streamqueue = require('streamqueue'),
    runSequence = require('run-sequence'),
    autoPrefix = require('gulp-autoprefixer'),//css根据设置浏览器版本自动处理浏览器前缀,参考：http://www.ydcss.com/archives/94
    uglifyjs = require('gulp-uglifyjs');

var appName = 'zeus';
var config = require('./src/config/config.json');
var serverUrl = config.local;

//sass压缩
gulp.task('sass', function () {
    return sass('src/styles/app.scss')
        .on('error', sass.logError)
        .pipe(autoPrefix())
        .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('vendor-css', function () {
    var vendorCssFiles = require('./vendorCss.json');
    gulp.src(vendorCssFiles)
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('.tmp/styles'));
});
//图片压缩
gulp.task('imageMin', function () {
    gulp.src('src/images/**/*.*', {base: 'src'})
        .pipe(imageMin())
        .pipe(gulp.dest('.tmp'));
});

//debug模式js文件复制
gulp.task('jsCopy', function () {
    var configStream = gulp.src('src/config/config.json')
        .pipe(ngConfig(appName, {
            createModule: false
        }))
        .pipe(gulp.dest('.tmp/scripts'));

    //options.base:设置输出路径以某个路径的某个组成部分为基准向后拼接
    var jsStream = gulp.src('src/scripts/**/*.js', {base: 'src'})
        .pipe(gulp.dest('.tmp'));

    return streamqueue({
        objectMode: true
    }, configStream, jsStream)
});

//html放到angular $templateCache服务中
gulp.task('templateCache', function () {
    gulp.src('src/views/**/*.html')
        .pipe(templateCache({module: appName}))
        .pipe(gulp.dest('.tmp/scripts'));
});

gulp.task('vendor', function () {
    var vendorFiles = require('./vendor.json');
    gulp.src(vendorFiles)
        //.pipe(uglifyjs()) //暂定不能使用多文件压缩
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('.tmp'));
});
gulp.task('inject', function () {
    return gulp.src('src/index.html')
        .pipe(inject(gulp.src('vendor*.js', {cwd: '.tmp'}), {name: 'bower'}))
        .pipe(inject(gulp.src('styles/*.css', {cwd: '.tmp'})))
        .pipe(inject(gulp.src('scripts/**/*.js', {cwd: '.tmp'})))
        .pipe(gulp.dest('.tmp'));
});

gulp.task('server', function () {
    connect.server({
        root: '.tmp',
        livereload: true,
        port: 8888
    });
    open('http://localhost:8888/index.html');
});

gulp.task('clean', function () {
    del('.tmp');
});

gulp.task('watch', function () {
    liveReload.listen();
    gulp.watch('src/views/**/*.html', ['templateCache']);
    gulp.watch('src/styles/**/*.scss', ['sass']);
    gulp.watch('src/scripts/**/*.js', ['jsCopy']);
    gulp.watch('src/images/**/*', ['imageMin']);
    gulp.watch(['src/index.html', 'vendor.json'], ['inject']);
    gulp.watch('src/**')
        .on('change', liveReload.changed);
});
gulp.task('default', function () {
    runSequence(
        'clean',
        ['vendor', 'vendor-css', 'jsCopy', 'sass', 'imageMin', 'templateCache'],
        'inject',
        'server',
        'watch');
});