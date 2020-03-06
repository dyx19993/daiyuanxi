// 压缩sass文件规范

// 基本步骤
// 1,加载第三方依赖包
// 项目作用域的   gulp   gulp-sass  gulp-cssmin   gulp-autoprefixer  del  

// 2,准备gulp规范
// 找sass文件 ---> 编译为css文件 ---> 加兼容前缀 ---> 压缩 ---> 写入文件夹

// 3,准备一个监听,如果sass文件改变,css文件也改变

// 4,准备一个删除事件

// 5,导入默认事件


// 1,加载依赖包

// gulp依赖包
const gulp = require('gulp');

// sass转化包
const sass = require('gulp-sass');

// css压缩包
const cssmin = require('gulp-cssmin');

// css前缀包
const autoprefixer = require('gulp-autoprefixer');

// 删除包
const del = require('del');


// 2,定制规范

// 2-1,sass编译压缩规范

const sassHandler = function(){
    return gulp.src('./src/sass/*.scss')   // 找sass文件
           .pipe(sass())                   // 将sass文件内容,编译为css
           .pipe(autoprefixer())           // 加前缀
           .pipe(cssmin())                 // 压缩
           .pipe(gulp.dest('./dist/css'))  // 将编译压缩之后的css文件,写入到css文件夹
}

// 2-2,删除规范
const delHandler = function(){
    return del(['./dist']);
}

// 3,时时监听
const watchHandler = function(){
    gulp.watch('./src/sass/*.scss' , sassHandler);
}

// 4,定义导出的默认程序

module.exports.default = gulp.series(
    delHandler,                   // 先删除原始的压缩文件
    gulp.parallel(sassHandler),   // 执行新的压缩程序
    watchHandler                  // 执行监听
);