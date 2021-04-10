import { TestClient } from "../../../test-utils/TestClient";
import { createRandomUser } from "../../../test-utils/createRandomUser";
import { COOKIE_NAME } from "../../../../utils/constants";

test("logging out a user", async () => {
  const user = createRandomUser();
  const client = new TestClient();

  const { cookie } = await client.register(user);

  const { data } = await client.me(cookie);

  expect(data).toBeDefined();
  expect(data).toMatchObject({ username: user.username });

  const { cookie: logoutCookie } = await client.logout();
  expect(logoutCookie[0].split(";")[0]).toEqual(`${COOKIE_NAME}=`);
  const { data: data2 } = await client.me();
  expect(data2).toEqual(null);
});
