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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTypeormConn = void 0;
const typeorm_1 = require("typeorm");
const setup_1 = require("../modules/test-utils/setup");
const createTypeormConn = () => __awaiter(void 0, void 0, void 0, function* () {
    return process.env.NODE_ENV === "test" ? setup_1.setupDB() : typeorm_1.createConnection();
});
exports.createTypeormConn = createTypeormConn;
//# sourceMappingURL=createTypeormConn.js.map