import { Review } from "../../../entities/Review";
import { CreateOfferInput } from "../types/Input/codeReview/CreateOfferInput";
import { CreateOfferResponse } from "../types/Response/codeReview/createOfferResponse";

type Result = CreateOfferResponse | undefined;

interface Response {
  valid: boolean;
  res: Result;
}

export const validateCreateOffer = async (
  input: CreateOfferInput
): Promise<Response> => {
  const cantFoundReviewErrs = [
    { field: "codeUrl", message: "Couldn`t found the review" },
  ];

  let res;

  try {
    const review = await Review.findOne(input.reviewId);
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
  };
};
