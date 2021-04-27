import { ApolloServer } from "apollo-server-express";
import {
  getComplexity,
  fieldExtensionsEstimator,
  simpleEstimator,
} from "graphql-query-complexity";
import { MyContext } from "src/types/MyContext";
import { redis } from "./redis";
import { createSchema } from "./createSchema";

export const createApolloServer = async () => {
  const schema = await createSchema();
  return new ApolloServer({
    schema,
    context: ({ req, res }: MyContext) => ({
      req,
      res,
      redis,
    }),
    plugins: [
      {
        requestDidStart: () => ({
          didResolveOperation({ request, document }) {
            const complexity = getComplexity({
              schema,
              operationName: request.operationName,
              query: document,
              variables: request.variables,
              estimators: [
                fieldExtensionsEstimator(),
                simpleEstimator({ defaultComplexity: 1 }),
              ],
            });
            const maximumComplexity = 20;
            if (complexity > maximumComplexity) {
              throw new Error(
                `Sorry, too complicated query! ${complexity} is over ${maximumComplexity} that is the max allowed complexity.`
              );
            }
          },
        }),
      },
    ],
    uploads: false,
  });
};
