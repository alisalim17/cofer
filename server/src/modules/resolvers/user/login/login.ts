import argon2 from "argon2";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import * as yup from "yup";
import { User } from "../../../../entities/User";
import { MyContext } from "../../../../types/MyContext";
import { formatYupError } from "../../../../utils/formatYupError";
import { errorMessages } from "../../../shared/registirationErrorMessages";
import { LoginInput } from "../../types/Input/LoginInput";
import { FieldError } from "../../types/Response/FieldError";
import { RegisterResponse } from "../../types/Response/RegisterResponse";

const schema = yup.object().shape({
  usernameOrEmail: yup.string().min(2, errorMessages.usernameShort),
  password: yup.string().min(3, errorMessages.passwordShort),
});

@Resolver(User)
export class LoginResolver {
  @Mutation(() => RegisterResponse)
  async login(
    @Arg("input") input: LoginInput,
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

    const errors: Array<FieldError> = [];
    let user: User;
    let valid = false;
    user = (
      await getConnection().query(
        `select * from "user" where username = $1 or email = $1`,
        [input.usernameOrEmail]
      )
    )[0];

    if (user) valid = await argon2.verify(user.password, input.password);

    if (!valid)
      errors.push({ field: "password", message: "Password is incorrect" });
    if (!user)
      errors.push({
        field: "usernameOrEmail",
        message: "Username or email doesn't exist",
      });

    if (errors.length)
      return {
        ok: false,
        errors,
      };

    req.session.userId = user.id;
    return {
      ok: true,
      user,
    };
  }
}
