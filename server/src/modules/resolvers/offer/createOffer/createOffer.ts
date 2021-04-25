import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { CreateOfferInput } from "../../types/Input/offer/CreateOfferInput";
import { CreateOfferResponse } from "../../types/Response/codeReview/createOfferResponse";
import { validateCreateOffer } from "../../validations/validateCreateOffer";
import * as yup from "yup";
import { errorMessages } from "../../codeRequest/create/errorMessages";
import { Offer } from "../../../../entities/Offer";
import { isAuth } from "../../../middlewares/isAuth";
import { MyContext } from "../../../../types/MyContext";
import { formatYupError } from "../../../../utils/formatYupError";

const schema = yup.object().shape({
  codeUrl: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      errorMessages.codeUrlBad
    )
    .required("Please enter valid url"),
});

@Resolver(Offer)
export class CreateOfferResolver {
  @Mutation(() => CreateOfferResponse)
  @UseMiddleware(isAuth)
  async createOffer(
    @Arg("input") input: CreateOfferInput,
    @Ctx() { req }: MyContext
  ): Promise<CreateOfferResponse> {
    try {
      await schema.validate(input, { abortEarly: false });
    } catch (err) {
      return {
        ok: false,
        errors: formatYupError(err),
      };
    }

    const { res, valid, review } = await validateCreateOffer(
      input,
      req.session?.userId!
    );
    if (!valid) return res!;

    await Offer.create({
      ...input,
      ownerId: req.session.userId,
      reviewOwnerId: review?.ownerId,
    }).save();

    return {
      ok: true,
    };
  }
}
