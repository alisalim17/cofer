import React from "react";
import {
  RegularOfferSnippetFragment,
  RegularUserSnippetFragment,
  useUpdateOfferStatusMutation,
} from "../../../generated/graphql";
import Header from "../../Header";
import Link from "../../utilities/Link";
import { gql } from "@apollo/client";
import Button from "./../../Form/Button";

interface OfferCardProps {
  offer: RegularOfferSnippetFragment & { owner: RegularUserSnippetFragment };
}

// TODO:Implement yarn workspaces
const STATUS = {
  1: "approved",
  "-1": "declined",
};

const OfferCard: React.FunctionComponent<OfferCardProps> = ({
  offer: {
    id,
    codeUrl,
    status,
    reviewId,
    owner: { username },
  },
}) => {
  const [updateStatus] = useUpdateOfferStatusMutation();

  const statusUp = async () => {
    if (status === STATUS[1]) return;
    const offer = await updateStatus({
      variables: {
        input: { value: 1, reviewId },
      },
      update: (cache) => {
        const oId = `Offer:${id}`;
        const fragment = gql`
          fragment _ on Offer {
            id
            status
          }
        `;
        const data = cache.readFragment({
          id: oId,
          fragment,
        }) as RegularOfferSnippetFragment;
        if (data) {
          cache.writeFragment({
            id: oId,
            fragment,
            data: { id, status: STATUS[1] },
          });
        }
      },
    });
  };
  const statusDown = async () => {
    if (status === STATUS["-1"]) return;
    const offer = await updateStatus({
      variables: {
        input: { value: -1, reviewId },
      },
      update: (cache) => {
        const oId = `Offer:${id}`;
        const fragment = gql`
          fragment _ on Offer {
            id
            status
          }
        `;
        const data = cache.readFragment({
          id: oId,
          fragment,
        }) as RegularOfferSnippetFragment;
        if (data) {
          cache.writeFragment({
            id: oId,
            fragment,
            data: { id, status: STATUS["-1"] },
          });
        }
      },
    });
  };

  if (!status) return <div>loading...</div>;

  return (
    <div className="w-full bg-primary-800 hover:bg-primary-850 rounded-lg transition-colors duration-300 ease-in-out px-4 pt-3 pb-4 cursor-pointer">
      <Header fontWeight="bold" size="2xl">
        {username}
      </Header>
      <Link href={codeUrl} target="_blank">
        {codeUrl}
      </Link>

      <div className="mt-2">
        <Button
          extraClassName={`border-default border-r-none border-green ${
            status === STATUS[1]
              ? "bg-green text-button"
              : "hover:bg-green text-green hover:text-button"
          } hover:text-button px-4 py-1 rounded-sm transition-colors duration-300`}
          onClick={statusUp}
          type="submit"
        >
          Approve
        </Button>
        <button
          onClick={statusDown}
          className={`border-default border-accent ${
            status === STATUS["-1"]
              ? "bg-accent text-button"
              : "hover:bg-accent text-accent hover:text-button"
          } rounded-sm px-4 py-1 transition-colors duration-300`}
          type="submit"
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default OfferCard;
