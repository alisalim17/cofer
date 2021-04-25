import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { customEmojis } from "./EmoteData";
import Input from "./Form/TextField/Input";

interface Props {
  setNotes: any;
  notes: string;
}

const EmotePicker: React.FC<Props> = ({ notes, setNotes }) => {
  const [emojis, setEmojis] = useState(customEmojis);
  const [text, setText] = useState("");

  const handleOnClickEmoji = (e) => {
    const addedEmoji = ` :${e.shortNames[0]}:`;
    setNotes(`${notes}${addedEmoji}`);
  };

  const debouncedSearch = useDebouncedCallback((value) => {
    const newEmojis = customEmojis.filter((emoji) => {
      let include = false;

      for (let i = 0; i < emoji.keywords.length; i += 1) {
        if (emoji.keywords[i].includes(value)) {
          include = true;
          break;
        }
      }
      return include;
    });
    setEmojis(newEmojis);
  }, 1000);

  return (
    <div className="relative">
      <div
        style={{
          height: 200,
          width: 350,
          maxWidth: "100%",
          transform: "translateY(-100%)",
        }}
        className="absolute bg-primary-700 overflow-y-auto"
      >
        <div>
          <div className="sticky top-0 bg-primary-700">
            <div className="p-1">
              <Input
                placeholder="search for emojis"
                name="emote-search-bar"
                noRing
                onChange={(e) => {
                  debouncedSearch(e.target.value);
                  setText(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {emojis && emojis?.length > 0 ? (
              emojis.map((e, i) => {
                return (
                  <button
                    className="flex justify-center"
                    key={`emoji-picker-${Math.random() * 1000}`}
                    type="button"
                    onClick={() => handleOnClickEmoji(e)}
                  >
                    <img
                      alt="emoji"
                      src={`https://dogehouse.tv/${e.imageUrl}`}
                    />
                  </button>
                );
              })
            ) : (
              <div>no option</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotePicker;
