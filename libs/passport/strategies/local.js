const LocalStrategy = require('passport-local');
const User = require('../../../models/User');

module.exports = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async function(email, password, done) {
    try {
      
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'We couldn\'t find your email'});
      };

      const isValidPassword = await user.checkPassword(password);

      if (!isValidPassword) {
        return done(null, false, { message: 'Your password isn\'t right'});
      };

      if(user.verifiedToken) {
        return done(null, false, { message: ' Check you email and follow the link' });

      } else if(!user.verifiedToken) {
        return done(null, user, { message: 'Nice to see you here' });

      };
    } catch (err) {
      
      console.error(err);
      done(err);
    }
  }
);