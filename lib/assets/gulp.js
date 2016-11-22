'use strict';

const gulp = require('gulp');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const rev = require('gulp-rev');
const foo = require('gulp-empty');
const less = require('gulp-less');
const mincss = require('gulp-minify-css');

function optionalConcat(options) {
	if (options.name) {
		return concat({
			path: options.name,
			cwd: ''
		});
	}
	return foo();
}

exports.js = function() {
	const js = {
		/**
		 * Output js files
		 * @param  {string} options.src Source path
		 * @param  {string} options.dest Destination path
		 * @param  {string} [options.base] Source base path
		 * @param  {string} [options.name] Concat file name
		 */
		out: function(options) {

			if (options.rev) {
				return gulp.src(options.src)
					.pipe(optionalConcat(options))
					.pipe(gulp.dest(options.dest))
					.pipe(uglify())
					.pipe(rename({
						extname: '.min.js'
					}))
					.pipe(gulp.dest(options.dest))
					.pipe(rev())
					.pipe(gulp.dest(options.dest))
					.pipe(rev.manifest({
						merge: true
					}))
					.pipe(gulp.dest(options.dest));
			}

			return gulp.src(options.src)
				.pipe(optionalConcat(options))
				.pipe(gulp.dest(options.dest))
				.pipe(uglify())
				.pipe(rename({
					extname: '.min.js'
				}))
				.pipe(gulp.dest(options.dest));
		}
	};

	return js;
};

exports.css = function() {
	const css = {
		/**
		 * Output css files
		 * @param  {string} options.src Source path
		 * @param  {string} options.dest Destination path
		 * @param  {string} [options.base] Source base path
		 * @param  {string} [options.name] Concat file name
		 */
		less: function(options) {

			if (options.rev) {
				return gulp.src(options.src)
					.pipe(less())
					.pipe(optionalConcat(options))
					.pipe(gulp.dest(options.dest))
					.pipe(mincss())
					.pipe(rename({
						extname: '.min.css'
					}))
					.pipe(gulp.dest(options.dest))
					.pipe(rev())
					.pipe(gulp.dest(options.dest))
					.pipe(rev.manifest({
						merge: true
					}))
					.pipe(gulp.dest(options.dest));
			}

			return gulp.src(options.src)
				.pipe(less())
				.pipe(optionalConcat(options))
				.pipe(gulp.dest(options.dest))
				.pipe(mincss())
				.pipe(rename({
					extname: '.min.css'
				}))
				.pipe(gulp.dest(options.dest));
		}
	};

	return css;
};

exports.img = function() {
	const img = {
		/**
		 * Output img files
		 * @param  {string} options.src Source path
		 * @param  {string} options.dest Destination path
		 */
		out: function(options) {
			return gulp.src(options.src)
				.pipe(imagemin({
					optimizationLevel: 5
				}))
				.pipe(gulp.dest(options.dest));
		}
	};

	return img;
};
