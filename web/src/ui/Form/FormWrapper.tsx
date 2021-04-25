import React from "react";
import {
  SCREEN_COLUMNS_TYPE,
  useScreenType,
} from "../../utils/hooks/useScreenType";
import Logo from "../Navbar/Logo";
import Link from "../utilities/Link";

interface FormValues {
  usernameOrEmail: string;
  password: string;
}

export interface IFormFooterLink {
  href: string;
  text: string;
}

interface FormWrapperProps {
  footerLinks: IFormFooterLink[];
}

const FormWrapper: React.FC<FormWrapperProps> = ({ children, footerLinks }) => {
  const screenType = useScreenType();

  const isMobile = screenType === SCREEN_COLUMNS_TYPE.fullscreen;

  return (
    <div
      className="grid max-w-full"
      style={{ gridTemplateRows: "1fr auto 1fr" }}
    >
      <div className="px-4 py-6 flex items-center justify-center">
        {screenType === SCREEN_COLUMNS_TYPE.fullscreen ? <Logo /> : null}
      </div>
      {children}
      <div className="px-2 xs:px-5 py-6 fixed bottom-0 min-w-full">
        <div className={`${!isMobile ? "flex justify-between" : ""}`}>
          {!isMobile ? <Logo showTextDefault /> : <div />}
          <div
            style={{
              gridTemplateColumns: `repeat(${footerLinks.length},minmax(0,1fr))`,
            }}
            className="grid grid-cols-3 gap-x-2 xs:gap-x-6 gap-y-1 text-primary-300 text-lg"
          >
            {footerLinks.map(({ href, text }, i) => (
              <Link
                key={`footer-${i}`}
                noColor
                extraClassName="text-center hover:text-primary-200"
                href={href}
              >
                {text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormWrapper;
