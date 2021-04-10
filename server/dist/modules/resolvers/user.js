"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const RegisterResponse_1 = require("./types/Response/RegisterResponse");
const RegisterInput_1 = require("./types/Input/RegisterInput");
class UserResolver {
    register(input) { }
}
__decorate([
    type_graphql_1.Mutation(() => RegisterResponse_1.RegisterResponse),
    __param(0, type_graphql_1.Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof RegisterInput_1.RegisterInput !== "undefined" && RegisterInput_1.RegisterInput) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "register", null);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map