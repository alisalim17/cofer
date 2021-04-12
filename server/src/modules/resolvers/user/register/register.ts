import argon2 from "argon2";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import * as yup from "yup";
import { User } from "../../../../entities/User";
import { MyContext } from "../../../../types/MyContext";
import { formatYupError } from "../../../../utils/formatYupError";
import { errorMessages } from "../../../shared/registirationErrorMessages";
import { RegisterInput } from "../../types/Input/RegisterInput";
import { RegisterResponse } from "../../types/Response/user/RegisterResponse";

const schema = yup.object().shape({
  username: yup
    .string()
    .min(2, errorMessages.usernameShort)
    .max(30, errorMessages.usernameLong),
  email: yup
    .string()
    .min(5, errorMessages.emailShort)
    .max(30, errorMessages.usernameLong)
    .email(errorMessages.invalidEmail),
  password: yup
    .string()
    .min(3, errorMessages.passwordShort)
    .max(255, errorMessages.passwordLong),
});

@Resolver(User)
export class RegisterResolver {
  @Query(() => [User], { nullable: true })
  allUsers() {
    return User.find();
  }

  @Mutation(() => RegisterResponse)
  async register(
    @Arg("input") input: RegisterInput,
    @Ctx() { req }: MyContext
  ): Promise<RegisterResponse> {
    try {
      await schema.validate(input, { abortEarly: false });
    } catch (err) {
      return {
        ok: false,
        errors: formatYupError(err),
      };
    }

    let user;
    try {
      const hashedPassword = await argon2.hash(input.password);
      user = (await User.create({
        ...input,
        password: hashedPassword,
      }).save()) as User;
    } catch (err: any) {
      if (err.code === "23505") {
        // get which field duplicate
        let duplicateKey = err.detail.slice(5).split(")")[0];

        return {
          ok: false,
          errors: [
            {
              field: duplicateKey,
              message: `this ${duplicateKey} already taken`,
            },
          ],
        };
      }
    }

    //store user id in session
    //keep logged in user
    req.session.userId = user?.id;

    return {
      ok: true,
      user,
    };
  }
}
