import { User } from "../../../../../entities/User";
import { Field, ObjectType } from "type-graphql";
import { OkResponse } from "../../../../shared/OkResponse";

@ObjectType()
export class RegisterResponse extends OkResponse {
  @Field(() => User, { nullable: true })
  user?: User;
}
