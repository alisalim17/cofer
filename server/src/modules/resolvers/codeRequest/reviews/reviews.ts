import {
  Ctx,
  FieldResolver,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Review } from "../../../../entities/Review";
import { isAuth } from "../../../middlewares/isAuth";
import { MyContext } from "../../../../types/MyContext";
import { User } from "../../../../entities/User";

@Resolver(Review)
export class ReviewsResolver {
  @Query(() => [Review], { nullable: true })
  @UseMiddleware(isAuth)
  async reviews(@Ctx() { req }: MyContext) {
    return getConnection().query(
      `
      select * from review order by "createdAt" DESC
      `
    );
  }

  @FieldResolver(() => User)
  async owner(@Root() root: Review) {
    console.log(root);
    const user = await User.findOne(root.ownerId);

    if (user) return user;

    return {
      email: "deleted",
      username: "deleted",
    };
  }

  @FieldResolver(() => String)
  notes(@Root() root: Review) {
    return root.notes.slice(0, 150);
  }

  @FieldResolver(() => String)
  tags(@Root() root: Review) {
    return root.tags.slice(0, 4);
  }
}
