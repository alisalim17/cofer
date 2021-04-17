/* eslint-disable consistent-return */
// import React, { ReactElement, Fragment } from "react";
// import Grapheme from "grapheme-splitter";
// import { parse } from "twemoji-parser";
// import eRegex from "emoji-regex";

// const splitter = new Grapheme();

// const Twemoji: React.FC<TwemojiProps> = ({
//   text,
//   id: postId,
//   className = "",
//   ...props
// }) => {
//   const regex = eRegex();
//   const chars = splitter.splitGraphemes(text);

//   const parsedChars = chars.map((e, i) => {
//     const key = `emoji-${postId}-${i}`;
//     return regex.test(e) ? (
//       <img
//         {...props}
//         className={`emoji ${className}`}
//         key={key}
//         src={parse(e)[0].url}
//         alt="emoji"
//       />
//     ) : (
//       <Fragment key={key}>{e}</Fragment>
//     );
//   });
//   return <>{parsedChars}</>;
// };

// export default Twemoji;

import React, { useEffect, useState } from "react";
import { customEmojis } from "./EmoteData";

interface TwemojiProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  text: string;
  className?: string;
  id: string;
}

const Twemoji: React.FC<TwemojiProps> = ({ text }) => {
  const emojiRegex = /:[^:\s]*(?:::[^:\s]*)*:/g;

  const splittedText = text.split(" ");

  const result = splittedText.map((t) => {
    if (t.match(emojiRegex)) {
      const matched = customEmojis.filter(
        (customEmoji) => customEmoji.shortNames[0] === t.slice(1, t.length - 1)
      );
      if (!matched) return;
      return (
        <img
          className="emoji"
          alt="emoji"
          src={`https://dogehouse.tv/${matched[0]?.imageUrl}`}
        />
      );
    }
    const textWithSpace = `${t} `;
    return <>{textWithSpace}</>;
  });
  return result;
};

export default Twemoji;
