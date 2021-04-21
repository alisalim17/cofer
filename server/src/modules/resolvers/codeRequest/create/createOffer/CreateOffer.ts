import { CreateOfferResponse } from "../../../types/Response/codeReview/createOfferResponse";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { MyContext } from "../../../../../types/MyContext";
import { isAuth } from "../../../../middlewares/isAuth";
import { CreateOfferInput } from "../../../types/Input/codeReview/CreateOfferInput";
import { Offer } from "../../../../../entities/Offer";
import { errorMessages } from "../errorMessages";
import * as yup from "yup";
import { formatYupError } from "../../../../../utils/formatYupError";
import { Review } from "../../../../../entities/Review";
import { validateCreateOffer } from "./../../../validations/createOffer";

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

    const { res, valid } = await validateCreateOffer(input);
    console.log(res, valid);
    if (!valid) return res!;

    await Offer.create({
      ...input,
      ownerId: req.session.userId,
    }).save();

    return {
      ok: true,
    };
  }
}
