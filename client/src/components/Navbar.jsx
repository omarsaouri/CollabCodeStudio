import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import { RiUserLine, RiHome4Fill, RiAddCircleLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

export default function Navbar() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const location = useLocation();
  const isRoomPage = location.pathname.includes("/room/");

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 group ${
        isRoomPage
          ? "bg-[#1A1A1A] border-b border-primary/10"
          : "bg-background/95 backdrop-blur-md border-b border-primary/20"
      }`}
    >
      <ul
        className={`mx-auto flex items-center justify-between h-14 ${
          isRoomPage
            ? "pl-4 pr-4 opacity-50 group-hover:opacity-100 transition-opacity"
            : "container px-4 sm:px-6"
        }`}
      >
        <li className={`flex-1 ${isRoomPage ? "w-[260px]" : ""}`}>
          <Logo />
        </li>

        <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
          <motion.li whileHover={{ scale: 1.05 }}>
            <Link to="/">
              <RiHome4Fill
                className={`w-[22px] h-[22px] sm:w-6 sm:h-6 transition-colors duration-200 ${
                  isRoomPage
                    ? "text-gray-400 group-hover:text-primary-light"
                    : "text-primary-light"
                }`}
              />
            </Link>
          </motion.li>

          <motion.li whileHover={{ scale: 1.05 }}>
            <Link to="/room">
              <RiAddCircleLine
                className={`w-[22px] h-[22px] sm:w-6 sm:h-6 transition-colors duration-200 ${
                  isRoomPage
                    ? "text-gray-400 group-hover:text-primary-light"
                    : "text-primary-light"
                }`}
              />
            </Link>
          </motion.li>

          <motion.li whileHover={{ scale: 1.05 }}>
            {!cookies.access_token ? (
              <Link to={"/signup"}>
                <motion.button
                  whileHover={{
                    backgroundColor: isRoomPage
                      ? "rgba(75, 75, 75, 0.1)"
                      : "rgb(124 58 237 / 0.1)",
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 text-sm sm:text-base font-Righteous border rounded-md transition-colors ${
                    isRoomPage
                      ? "text-gray-400 border-gray-600/20 group-hover:text-primary group-hover:border-primary/40"
                      : "text-primary-light border-primary/20 hover:border-primary/40"
                  }`}
                >
                  Sign up
                </motion.button>
              </Link>
            ) : (
              <Link to={"/profile"}>
                <RiUserLine
                  className={`w-[22px] h-[22px] sm:w-6 sm:h-6 transition-colors duration-200 ${
                    isRoomPage
                      ? "text-gray-400 group-hover:text-primary-light"
                      : "text-primary-light"
                  }`}
                />
              </Link>
            )}
          </motion.li>
        </div>
      </ul>
    </nav>
  );
}
