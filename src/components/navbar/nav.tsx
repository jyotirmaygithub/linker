import React from "react";
import Logo from "./logo";
import SearchLogo from "./search/searchLogo";
import Login from "./auth/login";
import SignIn from "./auth/signIn";
import Toggle from "./menu/toggle";
import UserAvatar from "../Links/utils/avatar";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function Nav() {
  const user = useSelector((state: RootState) => state.userData);

  console.log("nav userdata = ", user); // Correct way to access user data

  return (
    <div className="flex justify-between p-4">
      <Logo />
      <div className="flex items-center space-x-4 justify-end">
        <SearchLogo />
        {user.username ? (
          <UserAvatar name={user.username} size={38} />
        ) : (
          <>
            <Login />
            <SignIn />
          </>
        )}
        <Toggle />
      </div>
    </div>
  );
}
