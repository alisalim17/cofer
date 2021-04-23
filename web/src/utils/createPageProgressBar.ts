import Router from "next/router";
import ProgressBar from "@badrap/bar-of-progress";

export const createPageProgressBar = () => {
  const progress = new ProgressBar({
    size: 2,
    color: "#fd4d4d",
    className: "bar-of-progress",
    delay: 100,
  });

  Router.events.on("routeChangeStart", progress.start);
  Router.events.on("routeChangeComplete", progress.finish);
  Router.events.on("routeChangeError", progress.finish);
};
