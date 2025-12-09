import express from "express";
import rateLimit from "express-rate-limit";
import Credentials from "./config/dotenv.js";
import MongoDb from "./internal/db/database.js";
import multer from "multer";
import {
  userRoutes,
  petRoutes,
  authRoutes,
  vetRoutes,
  appointmentRoutes,
  allergiesRoutes,
  dietRoutes,
  reportRoutes,
  mealHistoryRoutes,
  reminderRoutes,
  speciesRoutes,
} from "./routes/index.js";
import cors from "cors";
import redisClient from "./internal/redis/redis.js";
const CREDENTIALS = Credentials();

const InitServer = async () => {
  const DB = new MongoDb(CREDENTIALS.credentials);
  DB.connect();
  const redis = await redisClient(CREDENTIALS.redisUrl);
  const app = express();
  const upload = multer();
  const services = {
    redis: redis,
    db: DB,
    credentials: CREDENTIALS,
    upload: upload,
  };

  // i made this rate limiter to reduce risk of spamming or ddos
  // it will allow max 100 requests per 3 minutes
  const rateLimiter = rateLimit({
    windowMs: 3 * 60 * 1000000000,
    max: 100000,
    message: "Too many requests from this ip, try later",
  });

  // this will prevent other clients to not acces the api
  // it will be only accessed by the client which we will specify in the en
  // await Species.seed();
  app.use(
    cors({
      origin: CREDENTIALS.client,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    }),
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(rateLimiter);

  // i add in here the router for /user path it will contain all the routes for user
  // we will add other routes for other paths
  app.use(`${CREDENTIALS.apiPrefix}/users`, userRoutes(services));
  app.use(`${CREDENTIALS.apiPrefix}/auth`, authRoutes(services));
  app.use(`${CREDENTIALS.apiPrefix}/pets`, petRoutes(services));
  app.use(`${CREDENTIALS.apiPrefix}/vets`, vetRoutes(services));
  app.use(`${CREDENTIALS.apiPrefix}/appointments`, appointmentRoutes(services));
  app.use(`${CREDENTIALS.apiPrefix}/allergies`, allergiesRoutes(services));
  app.use(`${CREDENTIALS.apiPrefix}/diets`, dietRoutes(services));
  app.use(`${CREDENTIALS.apiPrefix}/reports`, reportRoutes(services));
  app.use(`${CREDENTIALS.apiPrefix}/reminders`, reminderRoutes(services));
  app.use(`${CREDENTIALS.apiPrefix}/species`, speciesRoutes(services));
  app.use(
    `${CREDENTIALS.apiPrefix}/meals-history`,
    mealHistoryRoutes(services),
  );
  const server = app.listen(CREDENTIALS.port, () =>
    console.log("listening on port", CREDENTIALS.port),
  );
};
InitServer();
