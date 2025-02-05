import { motion } from "framer-motion";

function RoomAccessCards({ bgColor, headingText, paragraphText, borderColor }) {
  return (
    <motion.div
      initial={{ y: -300 }}
      animate={{ y: 0 }}
      className={`
        w-full
        min-h-[220px]
        p-8 
        rounded-xl
        flex 
        flex-col 
        items-center 
        justify-center
        gap-5
        border
        shadow-lg
        ${borderColor} 
        ${bgColor}
      `}
    >
      <h3 className="text-xl font-Righteous text-white">{headingText}</h3>
      <p className="text-base text-white/80 text-center max-w-md">
        {paragraphText}
      </p>
    </motion.div>
  );
}

export default RoomAccessCards;
