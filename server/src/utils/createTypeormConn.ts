import { createConnection } from "typeorm";
import { setupDB } from "../modules/test-utils/setup";

export const createTypeormConn = async () => {
  return process.env.NODE_ENV === "test" ? setupDB() : createConnection();
};
