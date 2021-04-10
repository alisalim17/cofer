"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const createTypeormConn_1 = require("./utils/createTypeormConn");
const createSchema_1 = require("./utils/createSchema");
const redis_1 = require("./utils/redis");
const sessionMiddleware_1 = require("./utils/sessionMiddleware");
const PORT = process.env.PORT || 4000;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield createTypeormConn_1.createTypeormConn();
    const app = express_1.default();
    app.use(cors_1.default({
        origin: "http://localhost:3000",
        credentials: true,
    }));
    app.use(sessionMiddleware_1.sessionMiddleware);
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield createSchema_1.createSchema(),
        context: ({ req, res }) => ({
            req,
            res,
            redis: redis_1.redis,
        }),
        uploads: false,
    });
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });
    app.listen(PORT, () => {
        console.log(`server listening on port ${PORT}`, process.env.NODE_ENV);
    });
});
exports.startServer = startServer;
exports.startServer().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map