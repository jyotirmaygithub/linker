import React from "react";
import Logo from "../../images/link.png";

export default function logo() {
  return (
    <div className="flex space-x-4 items-center">
     <img src={Logo} alt="logo" className="w-10 h-10" />
      <p className="font-bold text-4xl">Linker</p>
    </div>
  );
}
