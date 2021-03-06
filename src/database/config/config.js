require('dotenv').config();

const { DEV_DATABASE_URL, DATABASE_URL, TEST_DATABASE_URL } = process.env;
module.exports = {
  development: {
    url: DEV_DATABASE_URL,
    logging: false,
    dialect: 'postgres',
  },
  test: {
    url: TEST_DATABASE_URL,
    logging: false,
    dialect: 'postgres',
  },
  production: {
    url: DATABASE_URL,
    logging: false,
    dialect: 'postgres',
  },
};
