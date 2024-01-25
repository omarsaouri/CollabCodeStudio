import { Link } from "react-router-dom";
import Home from "../pages/Home/Home";

export default function logo() {
  return (
    <Link className="group text-copy flex gap-5  items-center" to={"/"}>
      <h1 className="group-hover:shadow-[0px] font-bold inline bg-primary shadow-[0px_2px_10px_2px_var(--primary-dark)] transition-all duration-300 ease-[ease-in-out] px-[0.8em] py-[0.3em] rounded-[5px]">
        ;
      </h1>
      <h1 className="text-[1.7em]  font-bold hover:text-shadow-none text-shadow-primary-dark transition-all duration-300 ease-[ease-in-out]">
        <span className=" font-Righteous text-primary-light">C</span>
        <span className="font-Righteous text-primary">C</span>
        <span className="font-Righteous text-primary-dark">S</span>
      </h1>
    </Link>
  );
}
