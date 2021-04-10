import { createRandomUser } from "../../../test-utils/createRandomUser";
import { AddedUser, TestClient } from "../../../test-utils/TestClient";

const addedUser: AddedUser = createRandomUser();
const client = new TestClient();

describe("login", () => {
  test("user not found send back error", async () => {
    const { data } = await client.login(addedUser);
    expect(data.ok).toBe(false);
  });

  test("expect login without error", async () => {
    const {} = await client.register(addedUser);
    const { data } = await client.login(addedUser);
    expect(data.ok).toEqual(true);
  });
});
