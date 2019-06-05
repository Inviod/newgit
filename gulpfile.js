
var gulp=require('gulp');
var cssnano=require('gulp-cssnano');
//src打开文件
/*
 *less编译改成
 *gulp.src(['src/less/*.less','!src/less/_*.less'])
 * .pipe(less())
 * */
//css压缩
//task创建任务
gulp.task('style',function () {
	
	return gulp.src(['src/css/*.css','!src/css/_*.css'])
	.pipe(cssnano())
	//dest创建
	.pipe(gulp.dest('dest/css'))
	//流修改，重新加载浏览器
	.pipe(browserSync.reload({
		stream:true
	}));
});

var concat=require('gulp-concat');
var uglify=require('gulp-uglify');

//2.css合并/压缩/混淆

gulp.task('script',function () {
 	return gulp.src('src/js/*.js')
	//合并
	.pipe(concat('all.js'))
	//压缩
	.pipe(uglify())
	//dest创建
	.pipe(gulp.dest('dest/js'))
	//流修改，重新加载浏览器
	.pipe(browserSync.reload({
		stream:true
	}));
});

//3图片复制
gulp.task('image',function () {
	return gulp.src('src/img/*.*')
	.pipe(gulp.dest('dest/img'))
	//流修改，重新加载浏览器
	.pipe(browserSync.reload({
		stream:true
	}));
});

//4html
var htmlmin=require('gulp-htmlmin');

gulp.task('html',function () {
	return gulp.src('src/*.html')
	.pipe(htmlmin({
		/*压缩字符空格*/
		collapseWhitespace:true,
		/*移除注释*/
		removeComments:true
	}))
	.pipe(gulp.dest('dest'))
	//流修改，重新加载浏览器
	.pipe(browserSync.reload({
		stream:true
	}));
});

var browserSync=require('browser-sync');

gulp.task('serve',function() {
	browserSync({
        server: {
            baseDir: ["dest"]
        }
    },function (err,bs) {
    	console.log(bs.options.getIn(["urls","local"]));
    });
	/*监听文件如果发生改变执行函数*/
	return (function () {
	gulp.watch('src/css/*.css',gulp.series('style'))
	gulp.watch('src/js/*.js',gulp.series('script'))
	gulp.watch('src/img/*.*',gulp.series('image'))
	gulp.watch('src/*.html',gulp.series('html'));
	})()
});
