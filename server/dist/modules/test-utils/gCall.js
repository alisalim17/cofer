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
exports.gCall = void 0;
const graphql_1 = require("graphql");
const createSchema_1 = require("../../utils/createSchema");
let schema;
const gCall = ({ source, variableValues }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!schema)
        schema = yield createSchema_1.createSchema();
    return graphql_1.graphql({
        schema,
        source,
        variableValues,
    });
});
exports.gCall = gCall;
//# sourceMappingURL=gCall.js.map