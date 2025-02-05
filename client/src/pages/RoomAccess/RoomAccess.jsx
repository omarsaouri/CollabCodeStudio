import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";
import roomApiRequests from "./roomApiRequests";
import RoomAccessCards from "../../components/RoomAccessCards";

function RoomAccess() {
  const [cookies] = useCookies(["access_token"]);
  const { isUserLoggedIn, user } = useAuth(false);
  const { joinRoom, createRoom } = roomApiRequests();
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);

  return (
    <section className="w-full min-h-screen flex flex-col md:flex-row">
      <motion.div
        initial={{ y: 400 }}
        animate={{ y: 0 }}
        className="flex-1 flex flex-col justify-center gap-8 items-center py-10 md:py-20 border-b md:border-b-0 md:border-r border-primary-light"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary-dark font-Righteous text-shadow-lg text-center px-4">
          Create a room
        </h2>
        <input
          className="p-3 w-4/5 max-w-xs md:max-w-sm rounded-md outline-none placeholder:text-primary-light placeholder:opacity-50 placeholder:font-bold border border-primary-dark bg-copy shadow-lg"
          placeholder="Room name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <motion.button
          whileHover={{ scale: 1.1, textShadow: "none" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => createRoom(roomName)}
          className="bg-primary-dark shadow-bg px-6 md:px-9 py-2 md:py-3 font-Righteous text-shadow-lg text-copy text-xl md:text-2xl rounded-md"
        >
          Create
        </motion.button>
        <div className="px-4 md:px-8">
          <RoomAccessCards
            bgColor="bg-primary-dark"
            borderColor="border-primary-light"
            headingText="Name your room"
            paragraphText="After you create your room, copy the provided room ID, share it with your friends, and start coding!"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 400 }}
        animate={{ y: 0 }}
        className="flex-1 flex flex-col justify-center gap-8 items-center py-10 md:py-20"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-secondary-dark font-Righteous text-shadow-lg text-center px-4">
          Join a room
        </h2>
        <input
          className="p-3 w-4/5 max-w-xs md:max-w-sm rounded-md outline-none placeholder:text-secondary-light placeholder:opacity-50 placeholder:font-bold border border-secondary-dark bg-copy shadow-lg"
          placeholder="room id"
          value={roomId}
          onChange={(e) => {
            setRoomId(e.target.value);
          }}
        />
        <motion.button
          onClick={() => {
            joinRoom(roomId);
          }}
          whileHover={{ scale: 1.1, textShadow: "none" }}
          whileTap={{ scale: 0.9 }}
          disabled={disableBtn}
          className="bg-secondary-dark shadow-bg px-6 md:px-9 py-2 md:py-3 font-Righteous text-shadow-lg text-copy text-xl md:text-2xl rounded-md"
        >
          Join
        </motion.button>
        <div className="px-4 md:px-8">
          <RoomAccessCards
            bgColor="bg-secondary-dark"
            borderColor="border-secondary-light"
            headingText="Enter a room"
            paragraphText="After you paste the provided room ID, you can join your friends and start coding!"
          />
        </div>
      </motion.div>
    </section>
  );
}

export default RoomAccess;
