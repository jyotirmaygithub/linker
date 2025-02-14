import React, { useEffect } from "react";
import Nav from "../components/navbar/nav";
import Links from "../components/Links/link";
import { getAuthToken } from "../redux/authToken";
import { useDispatch } from "react-redux";
import axios from "axios";
import { storeUserData } from "../redux/userData";


export default function Main() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      axios
        .get(`${process.env.REACT_APP_DEV_URL}/api/user/user-data`, {
          headers: {
            "auth-token": token, // Send the auth token in the headers
          },
        })
        .then((response) => {
          const userData = response.data.user_data;
          console.log(userData);
          dispatch(storeUserData(userData));
        })
        .catch((error) => console.error("Error:", error));
    }
  }, []);

  return (
    <div>
      <Nav />
      <Links />
    </div>
  );
}
