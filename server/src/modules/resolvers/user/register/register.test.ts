import * as faker from "faker";
import { errorMessages } from "../../../shared/registirationErrorMessages";
import { createRandomUser } from "../../../test-utils/createRandomUser";
import { AddedUser, TestClient } from "../../../test-utils/TestClient";

const addedUser: AddedUser = createRandomUser();

describe("register", () => {
  const client = new TestClient();

  it("invalid email", async () => {
    const { data } = await client.register({ ...addedUser, email: "a" });
    expect(data).toMatchObject({
      ok: false,
      errors: [
        { field: "email", message: errorMessages.emailShort },
        {
          field: "email",
          message: errorMessages.invalidEmail,
        },
      ],
      user: null,
    });
  });

  it("duplicate username", async () => {
    const newU = createRandomUser();
    const {} = await client.register(newU);
    const { data } = await client.register(newU);
    expect(data).toMatchObject({
      ok: false,
      errors: [{ field: "username", message: "this username already taken" }],
      user: null,
    });
  });

  it("duplicate email", async () => {
    const newU = createRandomUser();

    const {} = await client.register(newU);
    const { data } = await client.register({
      ...newU,
      username: faker.internet.userName(),
    });

    expect(data).toMatchObject({
      ok: false,
      errors: [{ field: "email", message: "this email already taken" }],
      user: null,
    });
  });

  it("create user", async () => {
    const newU = createRandomUser();
    const { data } = await client.register(newU);

    expect(data.user).toBeDefined();

    expect(data).toMatchObject({
      ok: true,
      errors: null,
      user: {
        email: newU?.email,
        username: newU?.username,
      },
    });
  });
});
