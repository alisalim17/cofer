import React, { InputHTMLAttributes, LinkHTMLAttributes, Props } from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

type LinkProps = NextLinkProps & {
  extraClassName?: string;
  target?: string;
  noColor?: boolean;
};
const Link: React.FC<LinkProps> = ({
  children,
  extraClassName = "",
  target,
  noColor = false,
  ...props
}) => {
  return (
    <NextLink {...props} passHref>
      <a
        target={target}
        className={`${noColor ? "" : "text-accent"} ${extraClassName}`}
      >
        {children}
      </a>
    </NextLink>
  );
};
export default Link;
