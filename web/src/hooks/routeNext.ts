import { useRouter } from "next/router";

export const routeNext = (path: string) => {
  const router = useRouter();
  console.log("router", router.query);
  if (router.query?.next) router.push(router.query.next);
  router.push(path as string);
};
