import { Ctx, Query, Resolver } from "type-graphql";
import { User } from "../../../../entities/User";
import { MyContext } from "../../../../types/MyContext";

@Resolver(User)
export class MeResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) return null;
    console.log("mee");
    return User.findOne(req.session.userId);
  }
}
