import React, { useState } from "react";
import {
  RegularOfferSnippetFragment,
  RegularUserSnippetFragment,
  useUpdateOfferStatusMutation,
} from "../../../generated/graphql";
import Header from "../../Header";
import Link from "../../utilities/Link";
import { gql } from "@apollo/client";
import Button from "../../Form/Button";

interface OfferCardProps {
  offer: RegularOfferSnippetFragment & { owner: RegularUserSnippetFragment };
}

// TODO:Implement yarn workspaces
const STATUS = {
  1: "approved",
  "-1": "declined",
};

const commonButtonStyle =
  "border-default hover:text-button px-4 py-1 rounded-sm transition-colors duration-300";

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
  const [loading, setLoading] = useState<
    "up-loading" | "down-loading" | "not-loading"
  >("not-loading");

  const statusUp = async () => {
    if (status === STATUS[1]) return;
    setLoading("up-loading");
    await updateStatus({
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
    setLoading("not-loading");
  };
  const statusDown = async () => {
    if (status === STATUS["-1"]) return;
    setLoading("down-loading");
    await updateStatus({
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
    setLoading("not-loading");
  };

  return (
    <div className="w-full bg-primary-800 hover:bg-primary-850 rounded-lg transition-colors duration-300 ease-in-out px-4 pt-3 pb-4 cursor-pointer">
      <Header headerType="h2" fontWeight="bold" size="2xl">
        {username}
      </Header>
      <Link href={codeUrl} target="_blank">
        {codeUrl}
      </Link>

      <div className="mt-2 flex items-center">
        <Button
          fontWeight="normal"
          ring="focus:ring-2"
          block={false}
          loading={loading === "up-loading"}
          extraClassName={`border-r-none border-green ${commonButtonStyle} ${
            status === STATUS[1]
              ? "bg-green text-button"
              : "hover:bg-green text-green hover:text-button"
          }`}
          onClick={statusUp}
          type="submit"
        >
          Approve
        </Button>

        <Button
          fontWeight="normal"
          ring="focus:ring-2"
          block={false}
          loading={loading === "down-loading"}
          extraClassName={`border-accent ${commonButtonStyle} ${
            status === STATUS["-1"]
              ? "bg-accent text-button"
              : "hover:bg-accent text-accent hover:text-button"
          }`}
          onClick={statusDown}
          type="submit"
        >
          Decline
        </Button>
      </div>
    </div>
  );
};

export default OfferCard;
