const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const passport = require('./libs/passport');
const config = require('config');

require('./handlers/01-favicon').init(app);
require('./handlers/015-scss').init(app);
require('./handlers/02-static').init(app);
require('./handlers/03-logger').init(app);
require('./handlers/04-templates').init(app);
require('./handlers/05-errors').init(app);
require('./handlers/06-session').init(app);
require('./handlers/07-bodyParser').init(app);
require('./handlers/08-passport').init(app);
require('./handlers/09-flash').init(app);
require('./handlers/10-csrf').init(app);

const router = new Router();

router.get('/', require('./routes/frontpage').get);

router.post('/login', require('./routes/login').post);
router.post('/logout', require('./routes/logout').post);
router.get('/register', require('./routes/register').get);

router.post('/register', require('./routes/register').post);
router.get('/emailconfirm/:authCode', require('./routes/emailconfirm').get);

router.get('/login/facebook', passport.authenticate('facebook', config.get('providers.facebook.passportOptions')));
router.get('/oauth/facebook', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/',
  successFlash: true,
  failureFlash: true
}));

router.get('/login/vkontakte', passport.authenticate('vkontakte', config.get('providers.vk.passportOptions')));
router.get('/oauth/vkontakte', passport.authenticate('vkontakte', {
  successRedirect: '/',
  failureRedirect: '/',
  successFlash: true,
  failureFlash: true
}));

app.use(router.routes());

module.exports = app;




