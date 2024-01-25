import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import { FaUser } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { IoCreate } from "react-icons/io5";
import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Navbar() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  return (
    <nav>
      <ul
        className="flex list-none gap-10  sm:justify-around md:justify-between items-center px-6 py-2 border-b-2 border-primary-light text-copy
      text-[1.4em]"
      >
        <li className="flex-[3]">
          <Logo />
        </li>

        <motion.li whileHover={{ scale: 1.1 }}>
          <Link to="/">
            <GoHomeFill className="text-primary-light sm:size-8 md:size-10" />
          </Link>
        </motion.li>

        <motion.li whileHover={{ scale: 1.1 }}>
          <Link to="/room">
            <IoCreate className="text-primary-light sm:size-8 md:size-10" />
          </Link>
        </motion.li>

        <motion.li whileHover={{ scale: 1.1 }}>
          {!cookies.access_token ? (
            <Link to={"/signup"}>
              <motion.button
                whileHover={{
                  backgroundColor: "#7c3aed",
                  color: "white",
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                className="text-primary-light sm:w-20 sm:px-1 sm:py-2 sm:text-xs md:text-lg font-Righteous border-2 border-primary p-3 rounded-md "
              >
                sign up
              </motion.button>
            </Link>
          ) : (
            <Link to={"/profile"}>
              <FaUser className="text-primary-light sm:size-7" />
            </Link>
          )}
        </motion.li>
      </ul>
    </nav>
  );
}
