import { CreateOfferResponse } from "../../../types/Response/codeReview/createOfferResponse";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { MyContext } from "../../../../../types/MyContext";
import { isAuth } from "../../../../middlewares/isAuth";
import { CreateOfferInput } from "../../../types/Input/codeReview/CreateOfferInput";
import { Offer } from "../../../../../entities/Offer";

@Resolver(Offer)
export class CreateOfferResolver {
  @Mutation(() => CreateOfferResponse)
  @UseMiddleware(isAuth)
  async createOffer(
    @Arg("input") input: CreateOfferInput,
    @Ctx() { req }: MyContext
  ): Promise<CreateOfferResponse> {
    return {
      ok: true,
    };
  }
}
