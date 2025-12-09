import dotenv from "dotenv";
dotenv.config();

const Credentials = () => {
  return {
    port: process.env.PORT || 3000,
    credentials: process.env.CREDENTIALS || "username:password",
    apiPrefix: process.env.API_PREFIX || "/api/v1/petcare/",
    client: process.env.CLIENT || "localhost:5000",
    redisUrl: process.env.REDIS_URL || "redis://localhost:6379",
    secret: process.env.SECRET || "testsecret",
  };
};

export default Credentials;
