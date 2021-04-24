import { Resolver } from "node:dns";
import { Offer } from "src/entities/Offer";
import { isAuth } from "src/modules/middlewares/isAuth";
import { errorMessages } from "src/modules/shared/registirationErrorMessages";
import { MyContext } from "src/types/MyContext";
import { formatYupError } from "src/utils/formatYupError";
import { Mutation, UseMiddleware, Arg, Ctx } from "type-graphql";
import { CreateOfferInput } from "../../types/Input/offer/CreateOfferInput";
import { CreateOfferResponse } from "../../types/Response/codeReview/createOfferResponse";
import { validateCreateOffer } from "../../validations/validateCreateOffer";

const schema = yup.object().shape({
  codeUrl: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      errorMessages.codeUrlBad
    )
    .required("Please enter website"),
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

    const { res, valid, review } = await validateCreateOffer(input);
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
