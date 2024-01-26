import React, { useState } from "react";

function UserCard({ color, emoji, name }) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div
      style={{ backgroundColor: color }}
      className="text-3xl rounded-xl text-center p-2 shadow-md text-shadow-md border-2 border-border flex flex-col flex-wrap items-center"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {emoji}
      <span className="text-xs text-copy-light font-semibold w-12 h-4 break-words overflow-scroll	">
        {name}
      </span>
    </div>
  );
}

export default UserCard;
