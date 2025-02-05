import React from "react";
import HomeCards from "../../components/HomeCards";
import { TbLogin } from "react-icons/tb";
import { FaCode } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";

function HomeInfos() {
  return (
    <div className="flex w-full flex-col items-center gap-12 py-16">
      <h2 className="text-copy text-4xl font-Righteous text-center px-4">
        How It Works
      </h2>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-20 px-4">
        <HomeCards
          headingText="Sign up"
          paragraphText="Create your account now for free, or login if you are already a member."
          icon={TbLogin}
        />
        <HomeCards
          headingText="Join Room"
          paragraphText="Join a room with a provided room ID or create one. Share it with your friends."
          icon={IoCreate}
        />
        <HomeCards
          headingText="Code"
          paragraphText="Start coding with your friends, using our realtime code editor."
          icon={FaCode}
        />
      </div>
    </div>
  );
}

export default HomeInfos;
