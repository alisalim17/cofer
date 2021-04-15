import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { MyContext } from "./types/MyContext";
import { createTypeormConn } from "./utils/createTypeormConn";
import { createSchema } from "./utils/createSchema";
import { redis } from "./utils/redis";
import { sessionMiddleware } from "./utils/sessionMiddleware";
import {
  fieldExtensionsEstimator,
  getComplexity,
  simpleEstimator,
} from "graphql-query-complexity";
const PORT = process.env.PORT || 4000;

export const startServer = async () => {
  await createTypeormConn();

  const app = express();

  // app.set("trust proxy", 1);

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(sessionMiddleware);

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
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
            const maximumComplexity = 10;
            if (complexity > maximumComplexity) {
              throw new Error(
                `Sorry, too complicated query! ${complexity} is over ${maximumComplexity} that is the max allowed complexity.`
              );
            }
            console.log("Used query complexity points:", complexity);
          },
        }),
      },
    ],
    uploads: false,
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`, process.env.NODE_ENV);
  });
};

startServer().catch((err) => {
  console.log(err);
});
