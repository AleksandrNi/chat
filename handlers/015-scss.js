const sass = require('koa-sass');

exports.init = app => app.use(sass({
  src:  process.cwd() + '/public/scss/',
  dest: process.cwd() + '/public/'
}));
 