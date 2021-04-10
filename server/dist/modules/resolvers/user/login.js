"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.LoginResolver = void 0;
const argon2_1 = __importDefault(require("argon2"));
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const yup = __importStar(require("yup"));
const User_1 = require("../../../entities/User");
const formatYupError_1 = require("../../../utils/formatYupError");
const registirationErrorMessages_1 = require("../../shared/registirationErrorMessages");
const LoginInput_1 = require("../types/Input/LoginInput");
const RegisterResponse_1 = require("../types/Response/RegisterResponse");
const schema = yup.object().shape({
    usernameOrEmail: yup.string().min(2, registirationErrorMessages_1.errorMessages.usernameShort),
    password: yup.string().min(3, registirationErrorMessages_1.errorMessages.passwordShort),
});
let LoginResolver = class LoginResolver {
    login(input, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield schema.validate(input, { abortEarly: false });
            }
            catch (err) {
                return {
                    ok: false,
                    errors: formatYupError_1.formatYupError(err),
                };
            }
            const errors = [];
            let user;
            let valid = false;
            user = (yield typeorm_1.getConnection().query(`select * from "user" where username = $1 or email = $1`, [input.usernameOrEmail]))[0];
            if (user)
                valid = yield argon2_1.default.verify(user.password, input.password);
            if (!valid)
                errors.push({ field: "password", message: "Password is incorrect" });
            if (!user)
                errors.push({
                    field: "usernameOrEmail",
                    message: "Username or email doesn't exist",
                });
            if (errors.length)
                return {
                    ok: false,
                    errors,
                };
            req.session.userId = user.id;
            return {
                ok: true,
                user,
            };
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => RegisterResponse_1.RegisterResponse),
    __param(0, type_graphql_1.Arg("input")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginInput_1.LoginInput, Object]),
    __metadata("design:returntype", Promise)
], LoginResolver.prototype, "login", null);
LoginResolver = __decorate([
    type_graphql_1.Resolver(User_1.User)
], LoginResolver);
exports.LoginResolver = LoginResolver;
//# sourceMappingURL=login.js.map