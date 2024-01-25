import { motion } from "framer-motion";

function RoomAccessCards({ bgColor, headingText, paragraphText, borderColor }) {
  const vari = "bg-primary-dark";
  return (
    <motion.div
      initial={{ y: -300 }}
      animate={{ y: 0 }}
      whileHover={{ opacity: 1, scale: 1.1 }}
      className={`opacity-70  overflow-hidden shadow-xl sm:h-52 sm:w-52 md:h-52 md:w-72 lg:h-72 lg:w-96 p-10 rounded-lg flex 
          flex-col items-center md:gap-5 lg:gap-10  border-2 ${borderColor} ${bgColor} `}
    >
      <h3 className="text-center sm:text-md md:text-xl lg:text-2xl font-Righteous text-copy text-shadow-md underline">
        {headingText}
      </h3>
      <p className="text-center sm:text-[10px] md:text-lg lg:text-xl text-copy-light font-bold">
        {paragraphText}
      </p>
    </motion.div>
  );
}

export default RoomAccessCards;
