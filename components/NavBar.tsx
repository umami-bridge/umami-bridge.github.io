import React from "react";
import Image from "next/image";

function NavBar() {

  return (
    <div className="bg-white w-full min-h-[8vh] nav flex flex-row justify-between">
      <div className="flex flex-row items-center gap-[8.65px]">
        <div className="flex-shrink-0 h-8 flex items-center">
          <Image
            height="34px"
            width="32px"
            src="/logo.png"
            alt="Umami Finance"
          />
        </div>
        <div className="flex-grow">
          <h1 className="navlogotext">UMAMI.FINANCE</h1>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
