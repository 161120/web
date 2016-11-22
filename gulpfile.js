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
gulp.task('js', function() {
	// return js.out({
	// 	src: './lib/assets/js/**/*',
	// 	dest: './lib/public/js'
	// });
});

gulp.task('default', ['css', 'js', 'img']);
