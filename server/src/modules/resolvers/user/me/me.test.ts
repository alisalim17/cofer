import { createRandomUser } from "../../../test-utils/createRandomUser";
import { AddedUser, TestClient } from "../../../test-utils/TestClient";

const addedUser: AddedUser = createRandomUser();
const client = new TestClient();

describe("me", () => {
  it("return null if no cookie", async () => {
    const { data } = await client.me();

    expect(data).toEqual(null);
  });

  it("get current user", async () => {
    const { cookie } = await client.register(addedUser);
    const { data } = await client.me(cookie);
    expect(data).toBeDefined();
    expect(data).toMatchObject({ username: addedUser.username });
    //    const {} = await client;
  });
});
