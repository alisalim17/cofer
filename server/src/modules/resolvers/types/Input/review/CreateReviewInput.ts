import { Field, InputType, Int } from "type-graphql";

@InputType()
export class CreateReviewInput {
  @Field(() => Int, { nullable: true })
  numDays: number;

  @Field(() => String)
  codeUrl!: string;

  @Field(() => [String!]!)
  tags!: string[];

  @Field(() => String, { nullable: true })
  notes: string;
}
