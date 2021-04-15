import {
  Ctx,
  FieldResolver,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { CodeReviewRequest } from "../../../../entities/CodeReviewRequest";
import { isAuth } from "../../../middlewares/isAuth";
import { MyContext } from "../../../../types/MyContext";
import { User } from "../../../../entities/User";

@Resolver(CodeReviewRequest)
export class CodeReviewRequestsResolver {
  @Query(() => [CodeReviewRequest], { nullable: true })
  @UseMiddleware(isAuth)
  async codeReviewRequests(@Ctx() { req }: MyContext) {
    return getConnection().query(
      `
      select * from code_review_request where "ownerId" = $1
      `,
      [req.session?.userId]
    );
  }

  @FieldResolver(() => User)
  async owner(@Root() root: CodeReviewRequest) {
    console.log(root);
    const user = await User.findOne(root.ownerId);
    console.log("user", user);
    if (user) return user;

    return {
      email: "deleted",
      username: "deleted",
    };
  }

  @FieldResolver(() => String)
  notes(@Root() root: CodeReviewRequest) {
    return root.notes.slice(0, 150);
  }
}
