"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionMiddleware = void 0;
const express_session_1 = __importDefault(require("express-session"));
const constants_1 = require("./constants");
const redis_1 = require("./redis");
const SESSION_SECRET = "zbbhzhgudhfsfsdfusdufhaohfsdh";
exports.sessionMiddleware = express_session_1.default({
    name: constants_1.COOKIE_NAME,
    store: new redis_1.RedisStore({
        client: redis_1.redis,
        disableTouch: true,
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 366 * 10,
        httpOnly: true,
        sameSite: "lax",
        secure: constants_1.isProduction,
    },
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
});
//# sourceMappingURL=sessionMiddleware.js.map