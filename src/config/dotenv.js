import dotenv from "dotenv";
// this file is used to get information from the .env file
// (mostly confidential info that wont be deployed for security reasons)
dotenv.config();

const Credentials = () => {
  return {
    port: process.env.PORT || 3000,
    credentials: process.env.CREDENTIALS || "username:password",
    apiPrefix: process.env.API_PREFIX || "/api/v1/petcare/",
    client: process.env.CLIENT || "localhost:5000",
    redis: process.env.REDIS || "redis://localhost:6379",
    secret: process.env.SECRET || "testsecret",
  };
};

export default Credentials;
