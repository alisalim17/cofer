import { buildSchema } from "type-graphql";
import { CreateReviewResolver } from "../modules/resolvers/codeRequest/create/createReview/createReview";
import { LoginResolver } from "../modules/resolvers/user/login/login";
import { LogoutResolver } from "../modules/resolvers/user/logout/logout";
import { MeResolver } from "../modules/resolvers/user/me/me";
import { RegisterResolver } from "../modules/resolvers/user/register/register";
import { ReviewsResolver } from "../modules/resolvers/codeRequest/reviews/reviews";
import { CreateOfferResolver } from "../modules/resolvers/codeRequest/create/createOffer/createOffer";

export const createSchema = () =>
  buildSchema({
    resolvers: [
      RegisterResolver,
      LoginResolver,
      MeResolver,
      LogoutResolver,
      CreateReviewResolver,
      ReviewsResolver,
      CreateOfferResolver,
    ],
    validate: false,
  });
