import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Keywords from "../components/Links/utils/keywords";
import Loader from "../utils/loader/loading";
import CommentBox from "../components/comment/box";
import Comments from "../components/comment/comments/comment";
import Stepper from "../components/stepper/steps";
import axios from "axios";

interface Link {
  title: string;
  keywords: string[];
  content: string;
  id: string;
}

const LinkDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract the id from URL parameters
  const [link, setLink] = useState<Link | null>(null); // State to hold the fetched link
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const fetchLinkDetails = async () => {
      setLoading(true);
      try {
        console.log("id = ", id);
        // Send GET request to fetch the link details by id
        axios
          .get(`http://localhost:5000/api/linkRetrive/singleLink/${id}`)
          .then((response) => {
            console.log("link response = ", response);
            setLink(response.data.link); // Set the fetched data into the state
            setLoading(false); // Set loading to false after fetching
          });
      } catch (error) {
        console.error("Error fetching link details: ", error);
        setLoading(false);
      }
    };

    fetchLinkDetails();
  }, [id]); // Only re-run when `id` changes

  return (
    <>
      {loading && (
        <div className="flex justify-center items-center h-screen w-full">
          {<Loader loaderColor={"black"} loaderSize={60} />}
        </div>
      )}
      {link ? (
        <div className="flex">
          <div className="px-20 py-3">
            <div className="space-y-4">
              <div className="p-4">
                <h2 className="text-xl font-semibold">{link?.title}</h2>
                <p className="text-gray-800 mt-2">{link?.content}</p>
                <Keywords keywords={link?.keywords} />
              </div>
            </div>
            <hr className="border-t-4 border-gray-200 p-2" />
            <div className="space-y-4">
              <CommentBox />
              <Comments />
            </div>
          </div>
          <div className="px-20 py-3 ">
            <Stepper />
          </div>
        </div>
      ) : (
        <div>
          <h1>Link not found</h1>
        </div>
      )}
    </>
  );
};

export default LinkDetails;
