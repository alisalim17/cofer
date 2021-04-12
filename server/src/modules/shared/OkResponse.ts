import { Field, ObjectType } from "type-graphql";
import { FieldError } from "../resolvers/types/Response/FieldError";

@ObjectType()
export class OkResponse {
  @Field(() => Boolean)
  ok!: boolean;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
