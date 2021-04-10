import { gql } from "graphql-request";
import * as rp from "request-promise";
import { callRequest } from "./callRequest";

export interface AddedUser {
  email: string;
  username: string;
  password: string;
}

export class TestClient {
  url: string;
  options: {
    jar: any;
    withCredentials: boolean;
    json: boolean;
  };
  constructor() {
    this.url = "http://localhost:4000/graphql";
    this.options = {
      withCredentials: true,
      jar: rp.jar(),
      json: true,
    };
  }

  async login(addedUser: AddedUser) {
    const { cookie, data } = await callRequest(
      gql`
        mutation Login($input: LoginInput!) {
          login(input: $input) {
            ok
          }
        }
      `,
      {
        input: {
          usernameOrEmail: addedUser.email,
          password: addedUser.password,
        },
      }
    );
    return { cookie, data: data.data.login };
  }

  async me(Cookie?: any) {
    const { data, cookie } = await callRequest(
      gql`
        query Me {
          me {
            id
            username
          }
        }
      `,
      {},
      Cookie
        ? {
            headers: {
              Cookie,
            },
          }
        : undefined
    );
    return { cookie, data: data.data.me };
  }

  async register(addedUser: AddedUser) {
    const { cookie, data } = await callRequest(
      gql`
        mutation Register($input: RegisterInput!) {
          register(input: $input) {
            ok
            errors {
              field
              message
            }
            user {
              id
              username
              email
            }
          }
        }
      `,
      {
        input: addedUser,
      }
    );
    return {
      cookie,
      data: data.data.register,
    };
  }

  async logout() {
    const { cookie, data } = await callRequest(
      gql`
        mutation {
          logout
        }
      `
    );
    return {
      cookie,
      data: data.data.register,
    };
  }
}
