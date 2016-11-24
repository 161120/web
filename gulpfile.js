'use strict';

const gulp = require('gulp');
const assets = require('./lib/assets/gulp');
const img = assets.img();
const css = assets.css();
const js = assets.js();

gulp.task('img', function() {
	return img.out({
		src: './lib/assets/img/**/*',
		dest: './lib/public/img'
	});
});


// css
//
gulp.task('css-main', function() {
	return css.less({
		src: ['./lib/assets/less/_main.less'],
		dest: './lib/public/css',
		name: 'main.css'
	});
});

gulp.task('css', ['css-main']);

// js
//
gulp.task('js-main', function() {
	return js.out({
		src: ['./lib/assets/js/popup.js', './lib/assets/js/informer.js', './lib/assets/js/soclog.js', './lib/assets/js/api.js', './lib/assets/js/api-form.js', './lib/assets/js/api-action.js'],
		dest: './lib/public/js',
		name: 'main.js'
	});
});

gulp.task('js', ['js-main']);

// Rerun the task when a file changes
gulp.task('watch', function() {
	gulp.watch('./lib/assets/js/**/*', ['js']);
	gulp.watch('./lib/assets/img/**/*', ['img']);
	gulp.watch('./lib/assets/less/**/*', ['css']);
});

gulp.task('default', ['css', 'js', 'img', 'watch']);
