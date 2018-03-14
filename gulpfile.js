var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync").create();

gulp.task("styles", function() {
  gulp
    .src("docs/sass/*.scss")
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 5 versions"],
        cascade: false
      })
    )
    .pipe(gulp.dest("docs/css"))
    .pipe(browserSync.reload({ stream: true }));
  // .pipe(browserSync.stream());
});

gulp.task("serve", function() {
  browserSync.init({
    server: {
      baseDir: "docs"
    }
  });

  gulp.watch("docs/sass/*.scss", ["styles"]);
  gulp.watch("docs/*.html").on("change", browserSync.reload);
});

gulp.task("default", ["styles", "serve"]);
