import { useState } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import profileApiRequests from "./profileApiRequests";

const EmojiModal = ({
  userId,
  emojiModalIsOpen,
  setEmojiModalIsOpen,
  setUserEmoji,
}) => {
  const [pickedEmoji, setPickedEmoji] = useState("");
  const { patchEmoji } = profileApiRequests(userId);

  const handleClose = () => {
    setPickedEmoji("");
    setEmojiModalIsOpen(false);
  };

  const handleSubmit = async () => {
    if (!pickedEmoji) return;

    await patchEmoji(pickedEmoji);
    localStorage.setItem("emoji", pickedEmoji);
    setUserEmoji(pickedEmoji);
    setPickedEmoji("");
    setEmojiModalIsOpen(false);
  };

  const predefinedEmojis = [
    "😀",
    "😂",
    "🥰",
    "😎",
    "🤔",
    "😴",
    "😇",
    "🤓",
    "😊",
    "😉",
    "🐱",
    "🐶",
    "🦊",
    "🐼",
    "🐨",
    "🐯",
    "🦁",
    "🐮",
    "🐷",
    "🐸",
    "🦄",
    "🐻",
    "🐨",
    "🦝",
    "🦓",
    "🐧",
    "🐯",
    "🐵",
    "🙉",
    "🙈",
  ];

  const modalStyles = {
    overlay: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#252329db",
    },
    content: {
      maxWidth: "95vw",
      maxHeight: "90vh",
    },
  };

  return (
    <Modal
      style={modalStyles}
      className="bg-background flex flex-col items-center gap-5 p-4 sm:p-10 rounded-xl text-white w-full max-w-[450px]"
      isOpen={emojiModalIsOpen}
      onRequestClose={handleClose}
    >
      <div className="w-full">
        <div className="grid grid-cols-5 gap-3 p-4 bg-[#1A1A1A] rounded-lg max-h-[300px] overflow-y-auto">
          {predefinedEmojis.map((emoji, index) => (
            <button
              key={index}
              onClick={() => setPickedEmoji(emoji)}
              className={`text-2xl sm:text-3xl p-2 rounded-lg hover:bg-[#2A2A2A] transition-colors
                ${pickedEmoji === emoji ? "bg-[#2A2A2A] ring-2 ring-primary" : ""}`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      <div className="text-base sm:text-xl flex items-center justify-center w-full gap-3 sm:gap-5 bg-[#1A1A1A] p-4 rounded-lg">
        <h3 className="font-bold text-primary">Selected Emoji</h3>
        <span className="min-w-[40px] h-[40px] flex items-center justify-center text-2xl sm:text-3xl bg-[#2A2A2A] rounded-lg">
          {pickedEmoji}
        </span>
      </div>

      <div className="flex gap-5 sm:gap-10">
        <motion.button
          type="button"
          onClick={handleClose}
          className="border-2 border-error text-error rounded-md font-Righteous px-3 sm:px-4 py-1 sm:py-2 text-base sm:text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Cancel
        </motion.button>
        <motion.button
          type="button"
          onClick={handleSubmit}
          className={`border-2 ${!pickedEmoji ? "border-gray-500 text-gray-500" : "border-success text-success"} rounded-md font-Righteous px-3 sm:px-4 py-1 sm:py-2 text-base sm:text-lg`}
          whileHover={pickedEmoji ? { scale: 1.05 } : {}}
          whileTap={pickedEmoji ? { scale: 0.95 } : {}}
          disabled={!pickedEmoji}
        >
          Validate
        </motion.button>
      </div>
    </Modal>
  );
};

export default EmojiModal;
