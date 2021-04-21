import { Review } from "../../../entities/Review";
import { CreateOfferInput } from "../types/Input/review/CreateOfferInput";
import { CreateOfferResponse } from "../types/Response/codeReview/createOfferResponse";

type Result = CreateOfferResponse | undefined;

interface Response {
  valid: boolean;
  res: Result;
  review?: Review;
}

export const validateCreateOffer = async (
  input: CreateOfferInput
): Promise<Response> => {
  const cantFoundReviewErrs = [
    { field: "codeUrl", message: "Couldn`t found the review" },
  ];

  let res;
  let review;

  try {
    review = await Review.findOne(input.reviewId);
    if (!review) {
      res = {
        ok: false,
        errors: cantFoundReviewErrs,
      };
    }
  } catch (err) {
    if (err.code === "22P02") {
      res = {
        ok: false,
        errors: cantFoundReviewErrs,
      };
    }
  }
  return {
    valid: res ? false : true,
    res,
    review,
  };
};
