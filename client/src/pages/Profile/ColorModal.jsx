import { HexColorPicker } from "react-colorful";
import Modal from "react-modal";
import profileApiRequests from "./profileApiRequests";
import { motion } from "framer-motion";

function ColorModal({
  userId,
  userColor,
  setUserColor,
  colorModalIsOpen,
  setColorModalIsOpen,
}) {
  const { patchColor } = profileApiRequests(userId);
  const closeColorModal = () => {
    setColorModalIsOpen(false);
  };

  const handleValidate = () => {
    patchColor(userColor);
    localStorage.setItem("color", userColor);
    setColorModalIsOpen(false);
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
      isOpen={colorModalIsOpen}
      className="bg-background flex flex-col items-center gap-5 p-10 rounded-xl text-white"
    >
      <HexColorPicker color={userColor} onChange={setUserColor} />
      <div className="flex gap-10">
        <motion.button
          onClick={closeColorModal}
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
          onClick={handleValidate}
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

export default ColorModal;
