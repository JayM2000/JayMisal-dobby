const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  uris: process.env.MONGODB_URI,
  port: process.env.PORT
};