import { parse } from "twemoji-parser";
import React from "react";
import { emoteMap, customEmojis } from "./EmoteData";
import Input from "./Form/TextField/Input";

interface Props {
  setNotes: any;
  notes: string;
}

const EmotePicker: React.FC<Props> = ({ notes, setNotes }) => {
  const handleOnClickEmoji = (e) => {
    setNotes(`${notes} :${e.shortNames[0]}:`);
  };

  return (
    <div
      style={{
        maxHeight: 200,
        maxWidth: 350,
        transform: "translateY(50%)",
      }}
      className="absolute bg-primary-700 overflow-y-auto"
    >
      <div className="grid grid-cols-7 gap-2">
        {customEmojis.map((e, i) => {
          return (
            <button
              id={`emoji-picker-${i}-${Math.random() * 1000}`}
              type="button"
              onClick={() => handleOnClickEmoji(e)}
            >
              <img alt="emoji" src={`https://dogehouse.tv/${e.imageUrl}`} />
            </button>
          );
        })}
        <div>
            {/* TODO ADD THE LIBRARY WHICH YOU TYPE THEN EVENT TRIGGRED(SLAYT APP-SELMAN K.) */}
          <Input name="emote-search-bar" onChange={() =>}/>
        </div>
      </div>
    </div>
  );
};

export default EmotePicker;
