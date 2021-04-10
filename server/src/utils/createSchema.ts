import { buildSchema } from "type-graphql";
import { LoginResolver } from "../modules/resolvers/user/login/login";
import { RegisterResolver } from "../modules/resolvers/user/register/register";
import { MeResolver } from "../modules/resolvers/user/me/me";
import { LogoutResolver } from "../modules/resolvers/user/logout/logout";

export const createSchema = () =>
  buildSchema({
    resolvers: [RegisterResolver, LoginResolver, MeResolver, LogoutResolver],
    validate: false,
  });
