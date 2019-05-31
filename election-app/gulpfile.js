const gulp = require('gulp');
const electron = require('electron-connect').server.create();
gulp.task('watch:server', function () {
    electron.start();
    gulp.watch('./main.js', electron.restart);
    // gulp.watch(['./index.html','./*.{js,css}'], electron.reload());
    w('./index.html');
    function w(path){
        gulp.watch(path, function () {
            browserSync.reload(path);
            electron.reload(path);
        });
    }
});