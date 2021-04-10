import session from "express-session";
import { COOKIE_NAME, isProduction } from "./constants";
import { redis, RedisStore } from "./redis";

// TODO: Move session secret to .env file
const SESSION_SECRET = "zbbhzhgudhfsfsdfusdufhaohfsdh";

export const sessionMiddleware = session({
  name: COOKIE_NAME,
  store: new RedisStore({
    client: redis as any,
    disableTouch: true,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 366 * 10, //10 years
    httpOnly: true,
    sameSite: "lax", //csrf
    secure: isProduction, // cookie only works in https
  },
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
});
