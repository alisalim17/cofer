import React from "react";
import Header from "../Header";
import Link from "../utilities/Link";
import {
  useScreenType,
  SCREEN_COLUMNS_TYPE,
} from "../../utils/hooks/useScreenType";

interface LogoProps {
  showTextDefault?: boolean;
}

const Logo: React.FC<LogoProps> = ({ showTextDefault = false }) => {
  const screenType = useScreenType();

  const isShowText = showTextDefault || screenType === SCREEN_COLUMNS_TYPE[3];

  return (
    <Link noColor href="/">
      <div className={`flex  ${isShowText ? "md:items-center" : ""}`}>
        <svg
          width="40"
          height="40"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.061 0h7.878C14.189 0 16 1.81 16 4.061v7.878C16 14.189 14.19 16 11.939 16H4.06A4.051 4.051 0 010 11.939V4.06C0 1.811 1.81 0 4.061 0z"
            fill="#EFE7DC"
          />
          <path
            d="M2.153 8.856a.823.823 0 01.44-.831 2.288 2.288 0 012.104-.147c.245.147.49.244.734.44.245.147.343.49.196.783a4.142 4.142 0 01-.685.93c-.538.685-1.517.782-2.25.244-.05-.049-.148-.098-.197-.195-.244-.343-.391-.783-.342-1.224zM10.422 7.046c-.294-.049-.538-.049-.783-.147-.245-.098-.342-.342-.293-.636.146-.685.733-1.174 1.418-1.321.734-.147 1.468.245 1.81.93.05.097-.048.293-.048.44h-.098v-.391l-.49.587c-.293.293-.684.44-1.125.391-.195 0-.244-.147-.244-.342 0-.245 0-.44.049-.685.049-.196.146-.44.244-.637-.293-.146-.685.098-.978.588-.196.391-.05.734.538 1.223zM9.199 12.526c-.832.245-1.664.685-2.594.49l-.44-.148a6.632 6.632 0 00-2.153-.538 4.567 4.567 0 01-1.614-.587c.097-.049.195-.049.293-.049.49-.098 1.028 0 1.517.196.587.293 1.174.44 1.761.783.392.147.832.195 1.224.049.44-.098.831-.196 1.272-.294h.734v.098zM5.382 4.355a.848.848 0 00-1.125-.49c-.049 0-.049 0-.098.05-.391.146-.587.489-.636.88 0 .049 0 .147-.049.196-.098.44.049.587.49.636h.44c.44 0 .831-.294.978-.734a1 1 0 000-.538zM4.208 5.529c-.294-.049-.49-.294-.49-.538.05-.49.392-.88.881-.93-.782.343-.685.88-.391 1.468z"
            fill="#000"
          />
        </svg>
        {isShowText ? (
          <Header
            headerType="h5"
            extraClassName="ml-2"
            color="text-accent-hover"
            size="3xl"
            fontWeight="bold"
          >
            Cofer
          </Header>
        ) : null}
      </div>
    </Link>
  );
};

export default Logo;
