import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../../utils/loader/loading";

export default function Link() {
  const [loading, setLoading] = useState(false);
  const [linkData, setLinkData] = useState([]);

  useEffect(() => {
    retrieveLinks();
  }, []);

  const retrieveLinks = () => {
    setLoading(true);

    axios
      .get("http://localhost:5000/api/linkRetrive/linkRetrive")
      .then((response) => {
        setLinkData(response.data.links);
        setLoading(false);
        console.log("link response = ", response.data.links);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);

        // Example: Handling server-side error responses
        if (error.response) {
          console.error("Server responded with an error:", error.response.data);
        } else if (error.request) {
          console.error(
            "No response from server. Request details:",
            error.request
          );
        } else {
          console.error(
            "Error occurred while making the request:",
            error.message
          );
        }
      });
  };

  return (
    <div>
      {linkData.length === 0 && (
        <div className="flex justify-center items-center h-screen w-full">
          {<Loader loaderColor={"black"} loaderSize={60} />}
        </div>
      )}
    </div>
  );
}
