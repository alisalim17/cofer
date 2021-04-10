"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchema = void 0;
const type_graphql_1 = require("type-graphql");
const login_1 = require("../modules/resolvers/user/login/login");
const register_1 = require("../modules/resolvers/user/register/register");
const me_1 = require("../modules/resolvers/user/me/me");
const logout_1 = require("../modules/resolvers/user/logout/logout");
const createSchema = () => type_graphql_1.buildSchema({
    resolvers: [register_1.RegisterResolver, login_1.LoginResolver, me_1.MeResolver, logout_1.LogoutResolver],
    validate: false,
});
exports.createSchema = createSchema;
//# sourceMappingURL=createSchema.js.map