require('dotenv').config();

const {
  PORT = 3000,
  JWT_SECRET,
  NODE_ENV,
} = process.env;

module.exports = {
  PORT,
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'JWT_SECRET',
};
