import React from "react";
import { useOffersQuery } from "../../../generated/graphql";
import CenteredLoader from "../../Loader/CenteredLoader";
import OfferCard from "./OfferCard";

interface OfferCardWrapperProps {}

const OfferCardWrapper: React.FC<OfferCardWrapperProps> = () => {
  const { loading, data, variables } = useOffersQuery();
  if (loading) return <CenteredLoader />;

  return (
    <div className="flex flex-col space-y-8 pb-8">
      {data?.offers.map((offer) => (
        <OfferCard key={`offer-${offer.id}`} offer={offer} />
      ))}
    </div>
  );
};

export default OfferCardWrapper;
