import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigation = useNavigate();

  return (
    <>
      <button
        className="bg-blue-400 text-white text-lg px-3 py-2 hover:bg-blue-500"
        onClick={()=> navigation("signin")}
      >
        Sign In
      </button>
    </>
  );
}
