import { motion } from "framer-motion";
import { React, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { FaCode } from "react-icons/fa";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { IoColorPaletteSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { io } from "socket.io-client";
import CodeEditor from "../../components/CodeEditor";
import UserCard from "../../components/UserCard";
import useAuth from "../../hooks/useAuth";
import roomApiRequests from "../RoomAccess/roomApiRequests";
import langOptions from "./langOptions";
import initializeSocket from "./socketInit";
import themeOptions from "./themeOptions";

function Room() {
  const [langSelectedOption, setLangSelectedOption] = useState(langOptions[0]);
  const [themeSelectedOption, setThemeSelectedOption] = useState(
    themeOptions[0]
  );
  const userId = localStorage.userId;
  const [roomName, setRoomName] = useState("");
  const [cookies] = useCookies(["access_token"]);
  const isInitialRender = useRef(true);
  const { id } = useParams();
  const { user, isUserLoggedIn } = useAuth(true, userId);
  const { joinRoom } = roomApiRequests();
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState();
  const navigate = useNavigate();
  const socket = io(import.meta.env.VITE_API_URL);

  useEffect(() => {
    initializeSocket(socket, id, setUsers);

    return () => {
      socket.off("JOINED");
      socket.off("DISCONNECTED");
    };
  }, []);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    joinRoom(id, true);
  }, []);

  const copyIdToClipboard = () => {
    navigator.clipboard.writeText(id);
    toast("Id copied to clipboard", { icon: "📋", position: "top-center" });
  };

  const selectStyles = {
    control: (provided, state, base) => ({
      ...provided,
      color: "white",
      display: "flex",
      flexWrap: "nowrap",
      background: "#7c3aed",
      width: "100%",
      ...base,
      border: 0,
      boxShadow: "none",
    }),
    menu: (provided) => ({
      ...provided,
      width: "100%",
      background: "#19181b",
      color: "white",
      padding: "2px",
      boxShadow: "0px 0px 20px 5px rgba(0,0,0,0.4)",
    }),
    option: (styles, { isSelected, isFocused }) => ({
      ...styles,
      padding: ".5rem",
      background: isFocused ? "#9b69f1" : isSelected ? "#5f14e0" : "inherit",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "white",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "white",
    }),
  };

  return (
    <section className="h-full w-full flex">
      <aside className="min-w-[260px] p-4 border-r border-primary/10 bg-[#1A1A1A]">
        <div className="flex flex-col gap-8">
          {/* Connected Users Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <HiOutlineStatusOnline className="text-primary text-xl" />
              </div>
              <h3 className="font-medium text-primary-light">
                Connected Users
              </h3>
            </div>
            <ul className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
              {users.map((user) => (
                <li key={user.socketId}>
                  <UserCard
                    emoji={user.emoji}
                    color={user.color}
                    name={user.username}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Language Selection */}
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <FaCode className="text-primary text-lg" />
              </div>
              <h4 className="font-medium text-primary-light">Language</h4>
            </div>
            <Select
              styles={selectStyles}
              isSearchable={false}
              defaultValue={langSelectedOption}
              onChange={setLangSelectedOption}
              options={langOptions}
              className="w-full"
            />
          </div>

          {/* Theme Selection */}
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <IoColorPaletteSharp className="text-primary text-lg" />
              </div>
              <h4 className="font-medium text-primary-light">Theme</h4>
            </div>
            <Select
              styles={selectStyles}
              isSearchable={false}
              defaultValue={themeSelectedOption}
              onChange={setThemeSelectedOption}
              options={themeOptions}
              className="w-full"
            />
          </div>

          {/* Room ID Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={copyIdToClipboard}
            className="group flex items-center gap-3 p-3 bg-primary/10 hover:bg-primary/20 rounded-lg text-primary-light transition-all"
          >
            <div className="p-1.5 rounded-md bg-primary/10 group-hover:bg-primary/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="font-medium">Copy Room ID</span>
          </motion.button>
        </div>
      </aside>

      <div className="flex-1">
        <CodeEditor
          langSelectedOption={langSelectedOption}
          themeSelectedOption={themeSelectedOption}
          socket={socket}
          roomId={id}
          users={users}
        />
      </div>
    </section>
  );
}

// Add this CSS to your global styles or component
const customStyles = `
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(124, 58, 237, 0.2);
  border-radius: 20px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(124, 58, 237, 0.4);
}
`;

export default Room;
