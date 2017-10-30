const env = process.env.NODE_ENV || 'development';

const config = require(`./dev.${env}`);

module.exports = config;
