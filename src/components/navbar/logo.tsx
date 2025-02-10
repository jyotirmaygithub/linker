import React from "react";
import LogoIcon from "../../images/link.png";
import { useNavigate } from "react-router-dom";

export default function Logo() {
   const navigation = useNavigate();

  return (
    <div onClick={() => navigation("/")} className="flex space-x-4 items-center cursor-pointer">
     <img src={LogoIcon} alt="logo" className="w-10 h-10" />
      <p className="font-bold text-4xl">Linker</p>
    </div>
  );
}
