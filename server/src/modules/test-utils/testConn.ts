import { createConnection } from "typeorm";

// TODO: what is synchronize

export const testConn = (drop = false) => {
  return createConnection({
    name: "default",
    type: "postgres",
    database: "cofertest",
    username: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    synchronize: drop,
    dropSchema: drop,
    entities: ["dist/entities/*.*"],
  });
};
