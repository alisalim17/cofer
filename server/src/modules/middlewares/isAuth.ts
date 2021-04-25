import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../../types/MyContext";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  console.log("context", context.req.session);
  if (!context.req.session.userId) throw new Error("Not authenticated");
  return next();
};
