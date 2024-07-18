import React from "react";

function navbar() {
  return (
    <div>
      <nav className="flex justify-between bg-[#282828] text-[#E0E0E0] py-2">
        <div className="logo">
          <span className="font-bold text-2xl mx-8">iTask</span>
        </div>
        <ul className="flex gap-8 mx-9 font-medium">
          <li className="cursor-pointer">
            Home
          </li>
          <li className="cursor-pointer">
            Your Tasks
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default navbar;
