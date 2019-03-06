const path = require('path');
const defer = require('config/defer').deferConfig;

module.exports = {
  // secret data can be moved to env variables
  // or a separate config
  secret: 'mysecret',
  root: process.cwd(),
  templatesRoot: path.join(process.cwd(), 'templates'),
  publicRoot: path.join(process.cwd(), 'public'),
  crypto: {
    hash: {
      length: 128,
      iterations: 10
    }
  },
  mongodb: {
    debug: true,
    uri: 'mongodb://localhost/user'
  },
  mongodbsocket: {
    debug: true,
    uri: 'mongodb://localhost/socketio'
  },
  redis: {
    uri: 'redis://127.0.0.1:6379'
  },
  server: {
    host: 'http://localhost',
    port: 3000,
  },
  providers: {
    facebook: {
      appId: '1584514044907807',
      appSecret: 'f0f14ef63e0c6b9ec549b9b15f63a808',
      passportOptions: {
        scope: ['email']
      }
    },
    vk: {
      appId: '6726168',
      appSecret: 'vVazHGOUn1NKwTudZbT4',
      passportOptions: {
        scope: ['email']
      }
    }
  },
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
  }
};
