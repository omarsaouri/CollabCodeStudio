import React from "react";

function ProfileCard({ color, emoji }) {
  return (
    <div
      style={{ backgroundColor: color }}
      className="text-6xl rounded-full text-center p-7 shadow-md text-shadow-md -mt-32 border-2 border-border"
    >
      {emoji}
    </div>
  );
}

export default ProfileCard;
