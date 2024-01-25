import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import Modal from "react-modal";
import profileApiRequests from "./profileApiRequests";
import { motion } from "framer-motion";

function EmojiModal({
  userId,
  emojiModalIsOpen,
  setEmojiModalIsOpen,
  setUserEmoji,
}) {
  const [pickedEmoji, setPickedEmoji] = useState("");
  const { patchEmoji } = profileApiRequests(userId);

  const closeEmojiModal = () => {
    setEmojiModalIsOpen(false);
  };

  const handleValidate = (pickedEmoji) => {
    patchEmoji(pickedEmoji);
    setUserEmoji(pickedEmoji);
    setEmojiModalIsOpen(false);
    localStorage.setItem("emoji", pickedEmoji);
  };

  const modalStyles = {
    overlay: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#252329db",
    },
  };
  return (
    <Modal
      style={modalStyles}
      className="bg-background flex flex-col items-center gap-5 p-10 rounded-xl text-white"
      isOpen={emojiModalIsOpen}
    >
      <EmojiPicker
        onEmojiClick={(emojiData) => setPickedEmoji(emojiData.emoji)}
        width={"400px"}
        height={"300px"}
        emojiVersion={"3.0"}
        suggestedEmojisMode="recent"
        theme="dark"
      />
      <div className="text-xl flex items-center gap-5 border-2 border-border p-3 rounded-sm">
        <h3 className="font-bold p-1 rounded-sm">Picked Emoji :</h3>
        <span className="text-2xl">{pickedEmoji}</span>
      </div>
      <div className="flex gap-10">
        <motion.button
          onClick={closeEmojiModal}
          className="border-2 border-error text-error rounded-md font-Righteous px-4 py-2 text-lg"
          whileHover={{
            backgroundColor: "#ed3a3a",
            color: "white",
            scale: 1.05,
            y: -3,
          }}
          whileTap={{ scale: 0.9 }}
        >
          Cancel
        </motion.button>
        <motion.button
          onClick={() => {
            handleValidate(pickedEmoji);
          }}
          className="border-2 border-success text-success rounded-md font-Righteous px-4 py-2 text-lg"
          whileHover={{
            backgroundColor: "#3aed3a",
            color: "black",
            scale: 1.05,
            y: -3,
          }}
          whileTap={{ scale: 0.9 }}
        >
          Validate
        </motion.button>
      </div>
    </Modal>
  );
}

export default EmojiModal;
