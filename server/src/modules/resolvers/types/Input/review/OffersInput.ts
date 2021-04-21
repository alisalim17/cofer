import { Field, InputType } from "type-graphql";

@InputType()
export class OffersInput {
  @Field()
  reviewId: string;
}
