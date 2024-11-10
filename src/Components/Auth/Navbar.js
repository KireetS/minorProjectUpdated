import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed w-full h-10 bg-primary-color flex items-center justify-between px-3 py-4">
      <div>logo</div>
      <section className="flex items-center justify-center p-2 space-x-2 text-white font-semibold text-lg">
        <Link to={"/login"}>Login</Link>
      </section>
    </nav>
  );
};

export default Navbar;
