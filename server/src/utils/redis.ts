import Redis from "ioredis";
import connectRedis from "connect-redis";
import session from "express-session";

export const RedisStore = connectRedis(session);

export const redis =
  process.env.NODE_ENV === "production"
    ? new Redis(process.env.REDIS_URL)
    : new Redis();
