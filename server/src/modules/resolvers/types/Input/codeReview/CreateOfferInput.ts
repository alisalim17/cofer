import { Field, InputType } from "type-graphql";

@InputType()
export class CreateOfferInput {
  @Field(() => String)
  userId!: string;

  @Field(() => String)
  codeReviewRequestId!: string;
}
