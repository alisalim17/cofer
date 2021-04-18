import React, { Fragment } from "react";
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
          key={`emoji-${Math.random() * 100}`}
          className="emoji"
          alt="emoji"
          src={`https://dogehouse.tv/${matched[0]?.imageUrl}`}
        />
      );
    }
    const textWithSpace = `${t} `;
    return (
      <Fragment key={`emoji-${Math.random() * 1000}`}>{textWithSpace}</Fragment>
    );
  });
  return result;
};

export default Twemoji;
