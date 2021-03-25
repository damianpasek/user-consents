const { env } = process

export default {
  env: env.NODE_ENV,
  port: env.PORT || 4000,
  databaseConnection: env.NODE_ENV === 'test'
    ? 'sqlite://:memory:'
    : env.DATABASE_URL || 'mysql://user_consents:user_consents@127.0.0.1:3306/user_consents',
  verbose: env.VERBOSE === 'true' || false,
}
