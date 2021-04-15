import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { CodeReviewRequest } from "../../../../entities/CodeReviewRequest";
import { isAuth } from "../../../middlewares/isAuth";
import { MyContext } from "../../../../types/MyContext";

@Resolver(CodeReviewRequest)
export class CodeReviewRequestsResolver {
  @Query(() => [CodeReviewRequest], { nullable: true })
  @UseMiddleware(isAuth)
  async codeReviewRequests(@Ctx() { req }: MyContext) {
    return getConnection().query(
      `
      select * from code_review_request where "creatorId" = $1
      `,
      [req.session?.userId]
    );
  }
}
