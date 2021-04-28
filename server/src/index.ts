import cors from "cors";
import express from "express";
import "reflect-metadata";
import { createApolloServer } from "./utils/createApolloServer";
import { createTypeormConn } from "./utils/createTypeormConn";
import { sessionMiddleware } from "./utils/sessionMiddleware";
require("dotenv-safe").config();
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github";
import { User } from "./entities/User";
import { MyContext } from "./types/MyContext";
import { COOKIE_NAME } from "./utils/constants";

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

  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        callbackURL: "http://localhost:4000/oauth/github",
        scope: "user:email", // fetches non-public emails as well
      },
      async (accessToken, refreshToken, profile: any, cb) => {
        console.log("profile", profile);
        let user = await User.findOne({ where: { githubId: profile.id } });

        if (!user) {
          const {
            id,
            _json: { avatar_url, bio },
          } = profile;
          user = await User.create({
            githubId: id,
            pictureUrl: avatar_url,
            bio,
          }).save();
        }
        cb(null, {
          user,
          accessToken,
          refreshToken,
        });
      }
    )
  );
  app.use(passport.initialize());

  app.get("/auth/github", passport.authenticate("github", { session: false }));

  app.get(
    "/oauth/github",
    passport.authenticate("github", {
      failureRedirect: "/login",
      session: false,
    }),
    (req: any, res) => {
      console.log("user", req.user);
      req.session.userId = req.user.user.id;
      req.session.accessToken = req.user.accessToken;
      req.session.refreshToken = req.user.refreshToken;
      // Successful authentication, redirect home.
      res.redirect("http://localhost:3000");
    }
  );

  const apolloServer = await createApolloServer();

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
