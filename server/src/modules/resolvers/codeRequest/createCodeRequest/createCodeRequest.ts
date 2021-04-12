import { Resolver, UseMiddleware, Mutation, Arg, Ctx } from "type-graphql";
import { CodeReviewRequest } from "../../../../entities/CodeReviewRequest";
import { isAuth } from "../../../middlewares/isAuth";
import { CreateCodeReviewRequestResponse } from "../../types/Response/codeReviewRequest/CreateCodeRequestResponse";
import { CreateCodeReviewRequestInput } from "../../types/Input/CreateCodeReviewRequestInput";
import { MyContext } from "../../../../types/MyContext";

@Resolver(CodeReviewRequest)
export class CreateCodeReviewRequestResolver {
  @Mutation(() => CreateCodeReviewRequestResponse)
  @UseMiddleware(isAuth)
  async createCodeReviewRequest(
    @Arg("input") input: CreateCodeReviewRequestInput,
    @Ctx() { req }: MyContext
  ): Promise<CreateCodeReviewRequestResponse> {
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
