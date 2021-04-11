import React, { InputHTMLAttributes, LinkHTMLAttributes, Props } from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

type LinkProps = NextLinkProps & {
  extraClassName?: string;
  target?: string;
};
const Link: React.FC<LinkProps> = ({
  children,
  extraClassName,
  target,
  ...props
}) => {
  return (
    <NextLink {...props} passHref>
      <a target={target} className={`${extraClassName} text-accent`}>
        {children}
      </a>
    </NextLink>
  );
};
export default Link;
