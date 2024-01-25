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
  const [cookies] = useCookies(["access_token"]);
  const isInitialRender = useRef(true);
  const { id } = useParams();
  const { user, isUserLoggedIn } = useAuth(true, userId);
  const { joinRoom } = roomApiRequests();
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState();
  const navigate = useNavigate();
  const socket = io("http://localhost:3000");

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
  }, [id]);

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
      width: "11em",
      ...base,
      border: 0,
      boxShadow: "none",
    }),
    menu: (provided) => ({
      ...provided,
      width: "11em ",
      background: "#19181b",
      color: "white",
      padding: "2px",
      boxShadow: "0px 0px 20px 5px rgba(0,0,0,0.4)",
    }),
    option: (styles, { isSelected, isFocused }) => ({
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
    <section className="h-full w-full flex ">
      <aside className="min-w-52 p-3 flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2 text-2xl text-primary text-shadow-md">
            <HiOutlineStatusOnline className="text-secondary text-3xl" />
            <h2 className="font-Righteous">Connected</h2>
          </div>
          <ul className="flex max-w-48 max-h-52 flex-wrap gap-2 overflow-scroll ">
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

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xl text-primary underline text-shadow-md">
              <FaCode className="text-primary-dark text-2xl" />
              <h3 className="font-Righteous">Select language</h3>
            </div>
            <Select
              styles={selectStyles}
              isSearchable={false}
              defaultValue={langSelectedOption}
              onChange={setLangSelectedOption}
              options={langOptions}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xl text-primary underline text-shadow-md">
              <IoColorPaletteSharp className="text-primary-dark text-2xl" />
              <h3 className="font-Righteous">Select Theme</h3>
            </div>
            <Select
              styles={selectStyles}
              isSearchable={false}
              defaultValue={themeSelectedOption}
              onChange={setThemeSelectedOption}
              options={themeOptions}
            />
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-primary-dark rounded-lg text-copy font-Righteous p-3 shadow-lg text-shadow-lg"
          onClick={copyIdToClipboard}
        >
          Copy room Id
        </motion.button>
      </aside>
      <div className="">
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
export default Room;
