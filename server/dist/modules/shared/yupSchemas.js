"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPasswordValidation = void 0;
const yup_1 = __importDefault(require("yup"));
const errorMessages_1 = require("../resolvers/user/register/errorMessages");
exports.registerPasswordValidation = yup_1.default
    .string()
    .min(3, errorMessages_1.errorMessages.passwordNotLongEnough)
    .max(255, errorMessages_1.errorMessages.passwordLong);
//# sourceMappingURL=yupSchemas.js.map