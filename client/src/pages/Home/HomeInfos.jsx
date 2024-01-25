import React from "react";
import HomeCards from "../../components/HomeCards";
import { TbLogin } from "react-icons/tb";
import { FaCode } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";

function HomeInfos() {
  return (
    <div className="flex w-80 flex-col items-center gap-20 pt-10">
      <h2 className="text-copy text-5xl text-shadow-lg font-Righteous px-40 py-2 tracking-widest">
        Steps
      </h2>
      <div className="flex items-center justify-center gap-20 sm:flex-col md:flex-row sm:gap-0 md:gap-10 lg:gap-20 xl:gap-32">
        <HomeCards
          headingText={"Sign up"}
          paragraphText={
            "Create your account now for free, Or login if you are already a member."
          }
          icon={TbLogin}
        />
        <HomeCards
          headingText={"Join Room"}
          paragraphText={
            "Join a room with a provided room Id or create one. share it with your friends."
          }
          icon={IoCreate}
        />
        <HomeCards
          headingText={"Code"}
          paragraphText={
            "Start coding with your friends, using our realtime code editor."
          }
          icon={FaCode}
        />
      </div>
    </div>
  );
}

export default HomeInfos;
