import { Field, InputType } from "type-graphql";

@InputType()
export class CreateOfferInput {
  @Field(() => String)
  codeUrl!: string;

  @Field(() => String)
  reviewId!: string;
}
