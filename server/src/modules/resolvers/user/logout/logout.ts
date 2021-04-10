import { Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../../../entities/User";
import { MyContext } from "../../../../types/MyContext";
import { COOKIE_NAME } from "../../../../utils/constants";

@Resolver(User)
export class LogoutResolver {
  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err: Error) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }
}
