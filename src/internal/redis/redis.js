import { createClient } from "redis";

const redisClient = async (redisUrl) => {
  const client = createClient({
    url: redisUrl,
  });
  client.on("error", (err) => console.error("redis", err));
  await client.connect();
  console.log("connected successfuly to redis");
  return client;
};
export default redisClient;
