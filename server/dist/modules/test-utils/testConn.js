"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConn = void 0;
const typeorm_1 = require("typeorm");
const testConn = (drop = false) => {
    return typeorm_1.createConnection({
        name: "default",
        type: "postgres",
        database: "cofertest",
        username: "postgres",
        password: "postgres",
        host: "localhost",
        port: 5432,
        synchronize: drop,
        dropSchema: drop,
        entities: ["dist/entities/*.*"],
    });
};
exports.testConn = testConn;
//# sourceMappingURL=testConn.js.map