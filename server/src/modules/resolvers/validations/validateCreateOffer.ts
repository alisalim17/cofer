import { Review } from "../../../entities/Review";
import { CreateOfferInput } from "../types/Input/offer/CreateOfferInput";
import { CreateOfferResponse } from "../types/Response/codeReview/createOfferResponse";
import { FieldError } from "./../types/Response/FieldError";

type Result = CreateOfferResponse | undefined;

interface Response {
  valid: boolean;
  res: Result;
  review?: Review;
}

export const validateCreateOffer = async (
  input: CreateOfferInput,
  userId: string
): Promise<Response> => {
  const noReviewErr = {
    field: "codeUrl",
    message: "Couldn`t found the review",
  };
  const errors: FieldError[] = [];
  let review;

  try {
    review = await Review.findOne(input.reviewId);
    console.log(review, userId);
    if (review?.ownerId == userId)
      errors.push({
        field: "general",
        message: "You can't give offer to your code review",
      });
    if (!review) errors.push(noReviewErr);
  } catch (err) {
    // invalid uuid
    if (err.code === "22P02") errors.push(noReviewErr);
  }

  const valid = errors.length === 0;
  return {
    valid,
    res: {
      ok: valid,
      errors,
    },
    review,
  };
};
