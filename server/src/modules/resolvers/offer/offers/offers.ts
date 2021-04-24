import {
  Ctx,
  FieldResolver,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Offer } from "../../../../entities/Offer";
import { MyContext } from "../../../../types/MyContext";
import { isAuth } from "../../../middlewares/isAuth";
import { User } from "../../../../entities/User";

@Resolver(Offer)
export class OffersResolver {
  @Query(() => [Offer])
  @UseMiddleware(isAuth)
  async offers(@Ctx() { req }: MyContext) {
    const res = await getConnection().query(
      `
      select * from review cr join "offer" o on cr."id" = o."reviewId"
      where cr."ownerId" = $1 or o."ownerId" = $1 or o."reviewOwnerId" = $1
      `,
      [req.session?.userId]
    );
    console.log(res);
    return res;
  }

  @FieldResolver(() => User)
  async owner(@Root() root: Offer) {
    const user = await User.findOne(root.ownerId);

    if (user) return user;

    return {
      email: "deleted",
      username: "deleted",
    };
  }
}
