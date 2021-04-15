import { buildSchema } from "type-graphql";
import { CreateCodeReviewRequestResolver } from "../modules/resolvers/codeRequest/createCodeRequest/createCodeRequest";
import { LoginResolver } from "../modules/resolvers/user/login/login";
import { LogoutResolver } from "../modules/resolvers/user/logout/logout";
import { MeResolver } from "../modules/resolvers/user/me/me";
import { RegisterResolver } from "../modules/resolvers/user/register/register";
import { CodeReviewRequestsResolver } from "../modules/resolvers/codeRequest/codeReviewRequests/codeReviewRequests";

export const createSchema = () =>
  buildSchema({
    resolvers: [
      RegisterResolver,
      LoginResolver,
      MeResolver,
      LogoutResolver,
      CreateCodeReviewRequestResolver,
      CodeReviewRequestsResolver,
    ],
    validate: false,
  });
