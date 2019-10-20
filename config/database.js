var path = require('path');
module.exports = {
  development: {
    dialect: 'sqlite',
    storage: path.resolve(__dirname, 'db.sqlite')
  },
  test: {
    dialect: 'sqlite',
    storage:path.resolve(__dirname, 'db.sqlite')
  },
  production: {
    dialect: 'sqlite',
    storage:path.resolve(__dirname, 'db.sqlite')
  }
};
