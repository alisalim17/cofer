import { Field, ObjectType } from "type-graphql";
import { OkResponse } from "../../../../shared/OkResponse";
import { CodeReviewRequest } from "../../../../../entities/CodeReviewRequest";

@ObjectType()
export class CreateCodeReviewRequestResponse extends OkResponse {
  @Field(() => CodeReviewRequest, { nullable: true })
  codeReviewRequest?: CodeReviewRequest;
}
