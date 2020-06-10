//don't commit
module.exports = {
  BCRYPT_SALT_ROUNDS: 1,
  PORT: 5001,

  MONGODB: {
    uri: "mongodb://localhost:27017/UserDashboard",
    options: {
      useNewUrlParser: true,
      useCreateIndex: true,
      auto_reconnect: true,
      useUnifiedTopology: true,
      keepAlive: true,
    },
  },
  JWT_SECRET: "saoasn89uas98ynuasoy78a8st8viuyas8ty7astuyiusayubiuhsuyj",
  JWT_EXPIRY: "1m", //30Days
};
