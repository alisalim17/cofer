import * as yup from "yup";
import { errorMessages } from "../errorMessages";
import { Resolver, Mutation, UseMiddleware, Ctx, Arg } from "type-graphql";
import { Review } from "../../../../../entities/CodeReview";
import { CreateReviewResponse } from "../../../types/Response/codeReview/CreateReviewResponse";
import { isAuth } from "../../../../middlewares/isAuth";
import { CreateReviewInput } from "../../../types/Input/codeReview/CreateReviewInput";
import { MyContext } from "../../../../../types/MyContext";
import { formatYupError } from "../../../../../utils/formatYupError";

const schema = yup.object().shape({
  numDays: yup.number().min(1, errorMessages.numDaysShort).required(),
  codeUrl: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      errorMessages.codeUrlBad
    )
    .required("Please enter website"),
  tags: yup.array().min(1, errorMessages.tagsShort),
  notes: yup.string(),
});

@Resolver(Review)
export class CreateReviewResolver {
  @Mutation(() => CreateReviewResponse)
  @UseMiddleware(isAuth)
  async createReview(
    @Arg("input") input: CreateReviewInput,
    @Ctx() { req }: MyContext
  ): Promise<CreateReviewResponse> {
    try {
      await schema.validate(input, { abortEarly: false });
    } catch (err) {
      return {
        ok: false,
        errors: formatYupError(err),
      };
    }

    const codeReview = await Review.create({
      ...input,
      ownerId: req.session.userId,
    }).save();
    return {
      ok: true,
      codeReview: codeReview,
    };
  }
}
