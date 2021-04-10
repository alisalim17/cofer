import axios, { AxiosRequestConfig } from "axios";

interface CallRequest {
  cookie: any;
  data: any;
}

export const callRequest = async (
  query: any,
  variables?: any,
  config?: AxiosRequestConfig
): Promise<CallRequest> => {
  const { data, headers } = await axios.post(
    "http://localhost:4000/graphql",
    {
      query,
      variables,
    },
    {
      withCredentials: true,
      ...config,
    }
  );
  return {
    data,
    cookie: headers["set-cookie"],
  };
};
