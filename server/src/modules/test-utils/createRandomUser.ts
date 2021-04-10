import * as faker from "faker";

export const createRandomUser = () => {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};
