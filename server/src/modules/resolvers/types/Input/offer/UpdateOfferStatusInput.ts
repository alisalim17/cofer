import { Field, InputType, Int } from "type-graphql";

@InputType()
export class UpdateOfferStatusInput {
  @Field(() => String)
  reviewId!: string;

  @Field(() => Int)
  value!: number;
}
