/* eslint-disable consistent-return */
import React, { Fragment } from "react";
import { v4 as uuid } from "uuid";
import { customEmojis } from "./EmoteData";

interface TwemojiProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  text: string;
  className?: string;
}

const Twemoji: React.FC<TwemojiProps> = ({ text }) => {
  const emojiRegex = /:[^:\s]*(?:::[^:\s]*)*:/g;

  const splittedText = text.split(" ");

  const result = splittedText.map((t) => {
    const key = `text-${uuid()}`;
    if (t.match(emojiRegex)) {
      const matched = customEmojis.filter(
        (customEmoji) => customEmoji.shortNames[0] === t.slice(1, t.length - 1)
      );
      if (!matched) return;

      return (
        <img
          key={key}
          className="emoji"
          alt="emoji"
          src={`https://dogehouse.tv/${matched[0]?.imageUrl}`}
        />
      );
    }
    const textWithSpace = `${t} `;
    return <Fragment key={key}>{textWithSpace}</Fragment>;
  });
  return result;
};

export default Twemoji;
