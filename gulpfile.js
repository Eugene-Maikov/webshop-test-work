// Импорт пакетов
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const ts = require("gulp-typescript");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const imageminWebP = require("gulp-webp");
const newer = require("gulp-newer");
const browsersync = require("browser-sync").create();
const del = require("del");
const fileInclude = require("gulp-file-include");
const plumber = require("gulp-plumber");

// Пути исходных файлов src и пути к результирующим файлам dest
const paths = {
  html: {
    src: ["src/*.html"],
    dest: "dist/",
  },
  styles: {
    src: ["src/styles/**/*.sass", "src/styles/**/*.scss", "src/styles/**/*.css"],
    dest: "dist/css/",
  },
  scripts: {
    src: ["src/scripts/**/*.ts", "src/scripts/**/*.js"],
    dest: "dist/js/",
  },
  images: {
    src: "src/assets/img/**",
    dest: "dist/assets/img/",
  },
  plugins: {
    src: ["src/assets/plugins/**"],
    dest: "dist/assets/plugins/",
  },
  video: {
    src: "src/assets/video/**",
    dest: "dist/assets/video/",
  },
  audio: {
    src: "src/assets/audio/**",
    dest: "dist/assets/audio/",
  },
  include: {
    watch: ["src/*.html", "src/_include/*.html"],
    src: "src/*.html",
    dest: "dist/",
  },
};

// Обработка plugins
const plugins = () => {
  return gulp.src(paths.plugins.src).pipe(gulp.dest(paths.plugins.dest)).pipe(browsersync.stream());
};

// Обработка video
const video = () => {
  return gulp.src(paths.video.src).pipe(gulp.dest(paths.video.dest)).pipe(browsersync.stream());
};

// Обработка audio
const audio = () => {
  return gulp.src(paths.audio.src).pipe(gulp.dest(paths.audio.dest)).pipe(browsersync.stream());
};

// Очистить каталог dist, удалить все кроме изображений
const clean = () => {
  return del(["dist/*", "!dist/assets/img"]);
};

// // Обработка html
// const html = () => {
//   return gulp.src(paths.html.src).pipe(gulp.dest(paths.html.dest)).pipe(browsersync.stream());
// };

// Обработка препроцессоров стилей
const styles = () => {
  return gulp
    .src(paths.styles.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 3 versions", "> 5%"],
        cascade: false,
      }),
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browsersync.stream());
};

// Обработка Java Script, Type Script
const scripts = () => {
  return (
    gulp
      .src(paths.scripts.src)
      .pipe(sourcemaps.init())
      // .pipe
      //  ts({
      //    noImplicitAny: true,
      //  }),
      // ()
      .pipe(
        babel({
          presets: ["@babel/env"],
        }),
      )
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest(paths.scripts.dest))
      .pipe(browsersync.stream())
  );
};

// тут добавил инклюды
const gulpinclude = () => {
  return gulp
    .src(paths.include.src)
    .pipe(plumber())
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file",
      }),
    )
    .pipe(gulp.dest(paths.include.dest))
    .pipe(browsersync.stream());
};

// Сжатие изображений
const img = () => {
  return gulp
    .src(paths.images.src)
    .pipe(newer(paths.images.dest))
    .pipe(
      imagemin({
        progressive: true,
      }),
    )
    .pipe(gulp.dest(paths.images.dest));
};

// Добавление формата webp
const imgWebP = () => {
  return gulp
    .src(paths.images.src)
    .pipe(newer(paths.images.dest))
    .pipe(imageminWebP())
    .pipe(gulp.dest(paths.images.dest));
};

// Svg
const svg = () => {
  return gulp
    .src("src/assets/svg/*.svg")
    .pipe(gulp.dest("dist/assets/svg/"))
    .pipe(browsersync.stream());
};

const fonts = () => {
  return gulp.src("src/styles/fonts/**/*").pipe(gulp.dest("dist/css/fonts"));
};

// Отслеживание изменений в файлах и запуск лайв сервера
const watch = () => {
  browsersync.init({
    server: {
      baseDir: "./dist",
    },
  });
  gulp.watch(paths.include.watch, gulpinclude);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.scripts.src, svg);
  gulp.watch(paths.images.src, img);
  gulp.watch(paths.plugins.src, plugins);
  gulp.watch(paths.video.src, video);
  gulp.watch(paths.audio.src, audio);
};

// Таски для ручного запуска с помощью gulp clean, gulp styles и т.д.
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.img = img;
exports.watch = watch;
exports.imgWebP = imgWebP;

// Таск, который выполняется по команде gulp
exports.default = gulp.series(
  clean,
  gulp.parallel(gulpinclude, styles, scripts, img, imgWebP, svg, fonts, plugins, video, audio),
  watch,
);
