module.exports = {
  development: {
    url: process.env.DATABASE_URL || 'mysql://user_consents:user_consents@127.0.0.1:3306/user_consents',
    dialect: 'mysql',
  },
  test: {
    url: 'sqlite://:memory',
    dialect: 'sqlite',
  },
}
