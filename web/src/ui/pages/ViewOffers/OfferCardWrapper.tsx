import React from "react";
import { useOffersQuery } from "../../../generated/graphql";
import CenteredLoader from "../../Loader/CenteredLoader";
import OfferCard from "./OfferCard";

interface OfferCardWrapperProps {}

const OfferCardWrapper: React.FC<OfferCardWrapperProps> = () => {
  const { loading, data, variables } = useOffersQuery();
  if (loading) return <CenteredLoader />;

  console.log(data, variables);
  return (
    <div>
      {data?.offers.map((offer) => (
        <OfferCard key={`offer-${offer.id}`} offer={offer} />
      ))}
    </div>
  );
};

export default OfferCardWrapper;
