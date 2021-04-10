import { Field, ObjectType } from "type-graphql";
import { FieldError } from "./FieldError";
import { User } from "../../../../entities/User";
import { OkResponse } from "../../../shared/OkResponse";

@ObjectType()
export class RegisterResponse extends OkResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}
