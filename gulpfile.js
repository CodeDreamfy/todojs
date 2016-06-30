var gulp = require("gulp");
var postcss = require("postcss");
var gulp_postcss = require("gulp-postcss");
var babel = require("gulp-babel");
var mqpacker = require("css-mqpacker");
var csswring = require("csswring");
var autoprefixer = require("autoprefixer");
var rename = require("gulp-rename");
var cssimport = require("postcss-import");
var cssnested = require("postcss-nested");
var concat = require("gulp-concat");

gulp.task('postcss', ()=>{
  let processors = [
    cssimport,
    cssnested,
    mqpacker,
    autoprefixer,
    csswring({ removeAllcomments: true})
  ];
  return gulp.src('./public/css/main.css')
              .pipe(gulp_postcss(processors))
              .on('error', errorHandler)
              .pipe(rename({suffix: ".min"}))
              .pipe(gulp.dest('./public/css/dest'));
});

gulp.task('babel', ()=>{
  return gulp.src('./public/js/src/**/*.js')
              .pipe(babel({
                presets: ['es2015']
              }))
              .pipe(gulp.dest('./public/js/dest'))
})

gulp.task('watch', ()=>{
  gulp.watch('./public/css/src/**/*.css', ['postcss']);
  gulp.watch('./public/js/src/**/*.js', ['babel']);
})

gulp.task('default', ['postcss', 'babel', 'watch']);

let errorHandler = (error)=>{
  console.log(error.message);
  console.log(error.fileName);
  console.log('line', error.line, 'column:', error.column);
  this.emit('end');
}
