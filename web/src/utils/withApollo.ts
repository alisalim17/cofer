import { ApolloClient, InMemoryCache } from "@apollo/client";
import { parse } from "cookie";
import { NextPageContext } from "next";
import createWithApollo from "./createWithApollo";
import { isServer } from "./isServer";

const createClient = (ctx: NextPageContext) => {
  let cookie;
  try {
    if (isServer) {
      cookie = parse(ctx?.req?.headers.cookie);
    }
  } catch (error) {}
  return new ApolloClient({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
    headers: {
      // TODO: add yarn workspace,get cookie name(now it's qid) from server
      authorization: isServer ? `Bearer ${cookie?.qid}` : undefined,
    },
    cache: new InMemoryCache(),
  });
};

export const withApollo = createWithApollo(createClient);
