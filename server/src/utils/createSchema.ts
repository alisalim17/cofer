import { buildSchema } from "type-graphql";
import { CreateOfferResolver } from "../modules/resolvers/codeRequest/create/createOffer/createOffer";
import { CreateReviewResolver } from "../modules/resolvers/codeRequest/create/createReview/createReview";
import { ReviewsResolver } from "../modules/resolvers/codeRequest/reviews/reviews";
import { OffersResolver } from "../modules/resolvers/offer/offers/offers";
import { LoginResolver } from "../modules/resolvers/user/login/login";
import { LogoutResolver } from "../modules/resolvers/user/logout/logout";
import { MeResolver } from "../modules/resolvers/user/me/me";
import { RegisterResolver } from "../modules/resolvers/user/register/register";
import { UpdateOfferStatusResolver } from "./../modules/resolvers/offer/updateOfferStatus/updateOfferStatus";

export const createSchema = () =>
  buildSchema({
    resolvers: [
      // user
      RegisterResolver,
      LoginResolver,
      MeResolver,
      LogoutResolver,
      // review
      CreateReviewResolver,
      ReviewsResolver,
      // offer
      CreateOfferResolver,
      OffersResolver,
      UpdateOfferStatusResolver,
    ],
    validate: false,
  });
