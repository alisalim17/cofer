import { Resolver, UseMiddleware, Mutation, Arg, Ctx } from "type-graphql";
import { CodeReviewRequest } from "../../../../entities/CodeReviewRequest";
import { isAuth } from "../../../middlewares/isAuth";
import { CreateCodeReviewRequestResponse } from "../../types/Response/codeReviewRequest/CreateCodeRequestResponse";
import { CreateCodeReviewRequestInput } from "../../types/Input/CreateCodeReviewRequestInput";
import { MyContext } from "../../../../types/MyContext";
import * as yup from "yup";
import { errorMessages } from "./errorMessages";
import { formatYupError } from "../../../../utils/formatYupError";

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

@Resolver(CodeReviewRequest)
export class CreateCodeReviewRequestResolver {
  @Mutation(() => CreateCodeReviewRequestResponse)
  @UseMiddleware(isAuth)
  async createCodeReviewRequest(
    @Arg("input") input: CreateCodeReviewRequestInput,
    @Ctx() { req }: MyContext
  ): Promise<CreateCodeReviewRequestResponse> {
    try {
      await schema.validate(input, { abortEarly: false });
    } catch (err) {
      return {
        ok: false,
        errors: formatYupError(err),
      };
    }

    const codeReviewRequest = await CodeReviewRequest.create({
      ...input,

      creatorId: req.session.userId,
    }).save();
    return {
      ok: true,
      codeReviewRequest,
    };
  }
}
