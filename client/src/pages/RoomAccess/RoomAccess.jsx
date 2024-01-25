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
    <section className="w-full h-screen flex ">
      <motion.div
        initial={{ y: 400 }}
        animate={{ y: 0 }}
        className="flex-1 flex flex-col justify-around gap-10 items-center md:pt-20 lg:pt-30 sm:pt-10 border-r border-primary-light"
      >
        <h2 className=" sm:text-2xl md:text-5xl text-primary-dark font-Righteous text-shadow-lg">
          Create a room
        </h2>
        <input
          className="p-3 lg:w-72 md:w-52 sm:w-32 rounded-md outline-none placeholder:text-primary-light placeholder:opacity-50 placeholder:font-bold border border-primary-dark bg-copy shadow-lg"
          placeholder="Room name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        ></input>
        <motion.button
          whileHover={{ scale: 1.1, textShadow: "none" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => createRoom(roomName)}
          className="bg-primary-dark shadow-bg px-9 py-3 font-Righteous text-shadow-lg text-copy text-2xl rounded-md"
        >
          Create
        </motion.button>
        <RoomAccessCards
          bgColor="bg-primary-dark"
          borderColor="border-primary-light"
          headingText="Name your room"
          paragraphText="After you create your room. Copy the provided room ID, share it with your friends, and start coding!"
        />
      </motion.div>

      <motion.div
        initial={{ y: 400 }}
        animate={{ y: 0 }}
        className="flex-1 flex flex-col justify-around gap-10 items-center md:pt-20 lg:pt-30 sm:pt-10"
      >
        <h2 className=" sm:text-2xl md:text-5xl text-secondary-dark font-Righteous text-shadow-lg">
          Join a room
        </h2>
        <input
          className="p-3 lg:w-72 md:w-52 sm:w-32 rounded-md outline-none placeholder:text-secondary-light placeholder:opacity-50 placeholder:font-bold border border-secondary-dark bg-copy shadow-lg"
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
          className="bg-secondary-dark shadow-bg px-9 py-3 font-Righteous text-shadow-lg text-copy text-2xl rounded-md"
        >
          Join
        </motion.button>
        <RoomAccessCards
          bgColor="bg-secondary-dark"
          borderColor="border-secondary-light"
          headingText="Enter a room"
          paragraphText="Paste the provided room ID, and join your friends. Have fun coding !"
        />
      </motion.div>
    </section>
  );
}

export default RoomAccess;
