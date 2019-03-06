const defer = require('config/defer').deferConfig;
const path = require('path');

module.exports = {
  mailer: {
    transport: 'gmail',
    gmail: {
      user: 'hello.world.testuser',
      password: 'testgmailQ!@W'
    },
    senders:  {
      // transactional emails, register/forgot pass etc
      default:  {
        from: 'hello.world.testuser@gmail.com',
        from:  'KoaLetter',
        signature: "<em>Hello friends,<br>from Me</em>"
      },
      /* newsletters example
      informer: {
        fromEmail: 'informer@gmail.com',
        fromName:  'Newsletters',
        signature: "<em>Have fun!</em>"
      }
      */
    }
  },
  template: {
    // template.root uses config.root
    root: defer(function(cfg) {
      return path.join(cfg.root, 'mail', 'templates');
    })
  },
  root: process.cwd()
};
