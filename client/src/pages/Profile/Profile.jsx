import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoIosColorFill } from "react-icons/io";
import { MdEmojiEmotions, MdLogout } from "react-icons/md";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../../components/ProfileCard.jsx";
import useAuth from "../../hooks/useAuth.js";
import ColorModal from "./ColorModal.jsx";
import EmojiModal from "./EmojiModal.jsx";
import useAxiosClient from "../../hooks/useAxiosClient";
import { format } from "date-fns";

function Profile() {
  const userId = localStorage.userId;
  const { user, isUserLoggedIn } = useAuth(true, userId);
  const client = useAxiosClient();
  const [userEmoji, setUserEmoji] = useState();
  const [userColor, setUserColor] = useState();
  const [emojiModalIsOpen, setEmojiModalIsOpen] = useState(false);
  const [colorModalIsOpen, setColorModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies();

  const openEmojiModal = () => {
    setEmojiModalIsOpen(true);
  };
  const openColorModal = () => {
    setColorModalIsOpen(true);
  };
  useEffect(() => {
    user.emoji && setUserEmoji(user.emoji);
  }, [user.emoji]);

  useEffect(() => {
    user.color && setUserColor(user.color);
  }, [user.color]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("userId");
    localStorage.removeItem("emoji");
    localStorage.removeItem("color");
    setCookies("access_token", null);
    navigate("/");
  };

  useEffect(() => {
    console.log("User data:", user); // For debugging
  }, [user]);

  // Function to get creation date from MongoDB _id
  const getCreationDate = (objectId) => {
    // Extract timestamp from ObjectId (first 4 bytes)
    const timestamp = parseInt(objectId.substring(0, 8), 16) * 1000;
    return new Date(timestamp);
  };

  // Format the user's join date
  const formattedJoinDate = user?.createdAt
    ? format(new Date(user.createdAt), "MMMM yyyy")
    : "Loading...";

  return (
    <motion.section
      className="min-h-screen flex items-center justify-center p-3 sm:p-8 mt-8 sm:mt-0"
      initial={{ y: 400 }}
      animate={{ y: 0 }}
    >
      <div className="bg-[#1A1A1A] p-4 sm:p-10 rounded-2xl w-full max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-[1fr_2fr] gap-6 lg:gap-12">
          {/* Left Section - Profile Info */}
          <div className="flex flex-col gap-6 p-6 sm:p-8 bg-[#222] rounded-xl">
            <div className="flex flex-col items-center gap-6 mt-12">
              <ProfileCard emoji={userEmoji} color={userColor} />
              <div className="text-center w-full">
                <h2 className="text-xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">
                  {user.name}
                </h2>
                <p className="text-sm sm:text-base text-gray-400">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="border-t border-primary/10 pt-6">
              <h3 className="text-primary-light text-base font-semibold mb-4">
                Account Details
              </h3>
              <div className="space-y-4">
                <div className="bg-[#1A1A1A] p-4 rounded-lg hover:bg-[#1D1D1D] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="text-primary/40">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-400 mb-1">Member since</p>
                      <p className="text-sm font-medium text-white">
                        {user && user._id
                          ? format(getCreationDate(user._id), "MMMM yyyy")
                          : "Loading..."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1A1A1A] p-4 rounded-lg hover:bg-[#1D1D1D] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="text-primary/40">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-400 mb-1">
                        Account Status
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <p className="text-sm font-medium text-white">Active</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex flex-col justify-center gap-4 sm:gap-6">
            <h3 className="text-lg sm:text-2xl font-semibold text-primary-light mb-2 sm:mb-4">
              Profile Settings
            </h3>

            <div className="flex flex-col gap-3">
              <button
                onClick={openEmojiModal}
                className="group flex items-center gap-4 p-4 bg-[#2A2A2A] hover:bg-[#333] rounded-xl text-white transition-all border border-primary/10"
              >
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <MdEmojiEmotions size={22} className="text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <span className="font-medium text-base sm:text-lg block">
                    Change Emoji
                  </span>
                  <p className="text-sm text-gray-400">
                    Update your avatar emoji
                  </p>
                </div>
              </button>

              <button
                onClick={openColorModal}
                className="group flex items-center gap-4 p-4 bg-[#2A2A2A] hover:bg-[#333] rounded-xl text-white transition-all border border-primary/10"
              >
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <IoIosColorFill size={22} className="text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <span className="font-medium text-base sm:text-lg block">
                    Change Color
                  </span>
                  <p className="text-sm text-gray-400">Pick your theme color</p>
                </div>
              </button>

              <button
                onClick={handleLogout}
                className="group flex items-center gap-4 p-4 bg-red-500/5 hover:bg-red-500/10 rounded-xl text-red-500 transition-all border border-red-500/20 mt-6"
              >
                <div className="p-2 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                  <MdLogout size={22} className="text-red-500" />
                </div>
                <div className="flex-1 text-left">
                  <span className="font-medium text-base sm:text-lg block">
                    Logout
                  </span>
                  <p className="text-sm text-red-400/80">
                    Sign out of your account
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <EmojiModal
        userId={userId}
        emojiModalIsOpen={emojiModalIsOpen}
        setEmojiModalIsOpen={setEmojiModalIsOpen}
        setUserEmoji={setUserEmoji}
      />

      <ColorModal
        userId={userId}
        userColor={userColor}
        setUserColor={setUserColor}
        colorModalIsOpen={colorModalIsOpen}
        setColorModalIsOpen={setColorModalIsOpen}
      />
    </motion.section>
  );
}

export default Profile;
