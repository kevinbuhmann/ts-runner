import {Gulpclass, Task} from 'gulpclass/Decorators';
import * as gulp from 'gulp';
import * as filter from 'gulp-filter';
import * as tslint from 'gulp-tslint';
import * as jshint from 'gulp-jshint';
import * as jscs from 'gulp-jscs';
import * as jscsStylish from 'gulp-jscs-stylish';

let config = {
  typescript: {
    src: [
      './**/*.ts',
      '!./node_modules/**/*.ts'
    ]
  },
  javascript: {
    src: [
      './**/*.js',
      '!./node_modules/**/*.js'
    ]
  }
};

@Gulpclass()
export class Gulpfile {
  @Task()
  public lint() {
    const tsFilter = filter('**/*.ts', { restore: true });
    const jsFilter = filter('**/*.js', { restore: true });

    return gulp
      .src([].concat(config.typescript.src.concat(config.javascript.src)))
      .pipe(tsFilter)
      .pipe(tslint())
      .pipe(tslint.report('prose'))
      .pipe(tsFilter.restore)
      .pipe(jsFilter)
      .pipe(jshint())
      .pipe(jscs({ configPath: './.jscsrc', esnext: true }))
      .pipe(jscsStylish.combineWithHintResults())
      .pipe(jshint.reporter('jshint-stylish'))
      .pipe(jshint.reporter('fail'))
      .pipe(jsFilter.restore);
  }
}
