import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class OkResponse {
  @Field(() => Boolean)
  ok!: boolean;
}
