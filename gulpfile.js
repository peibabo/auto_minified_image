var gulp = require('gulp');

var imagemin = require("gulp-imagemin");
var pngquant  = require('imagemin-pngquant');
var mozjpeg  = require('imagemin-mozjpeg');
var del = require('del');
var watch = require("gulp-watch");
var imageResize = require('gulp-image-resize');
var plumber = require('gulp-plumber');
var vinylPaths = require('vinyl-paths');

// clean
gulp.task('clean', function() {
  return gulp.src('images/*')
        .pipe(plumber())
        .pipe(vinylPaths(del));
});

// resize & min
gulp.task("imagemin", function() {
      gulp.src("images/*.{png,jpg,PNG,JPG,JPEG,jpeg}")
      .pipe(plumber())
      .pipe(imageResize({
         width : 700,
        // height : 1000,
         gravity : 'Center',
         crop : false,
         upscale : false,
         imageMagick : true
      }))
      .pipe(imagemin([
        pngquant({
          quality: '65-80',
          speed: 1,
          floyd:0
        }),
        mozjpeg({
          quality:85,
          progressive: true
        }),
        imagemin.svgo(),
        imagemin.optipng(),
        imagemin.gifsicle()
     ]
   ))
  .pipe(gulp.dest("./minified_image/"));
});

// watch
gulp.task('watch', () => {
  return watch(['./images/**'], () => {
    return gulp.start(['clean', 'imagemin']);
  });
});
