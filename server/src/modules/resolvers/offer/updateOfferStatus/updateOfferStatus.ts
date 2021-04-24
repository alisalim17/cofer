import { Arg, Mutation, Resolver } from "type-graphql";
import { UpdateOfferStatusInput } from "../../types/Input/offer/UpdateOfferStatusInput";
import { Offer } from "../../../../entities/Offer";

const STATUS = {
  1: "approved",
  "-1": "declined",
};

@Resolver(Offer)
export class UpdateOfferStatusResolver {
  @Mutation(() => Offer, { nullable: true })
  async updateOfferStatus(
    @Arg("input") { reviewId, value }: UpdateOfferStatusInput
  ): Promise<Offer | null> {
    const offer = await Offer.findOne({ where: { reviewId } });
    if (!offer) return null;

    const realValue = value === 1 ? 1 : -1;

    const { raw } = await Offer.update(
      { reviewId },
      { status: STATUS[realValue] }
    );
    console.log("raw", raw);
    return raw[0];
  }
}
