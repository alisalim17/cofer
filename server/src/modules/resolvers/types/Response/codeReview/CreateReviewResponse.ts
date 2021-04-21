import { Field, ObjectType } from "type-graphql";
import { OkResponse } from "../../../../shared/OkResponse";
import { Review } from "../../../../../entities/Review";

@ObjectType()
export class CreateReviewResponse extends OkResponse {
  @Field(() => Review, { nullable: true })
  review?: Review;
}
