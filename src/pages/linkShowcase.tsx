import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Keywords from "../components/Links/utils/keywords";
import Loader from "../utils/loader/loading";
import CommentBox from "../components/comment/box";
import Comments from "../components/comment/comments/comment";
import Stepper from "../components/stepper/steps";
import CustomAvatar from "../utils/avatar";
import CustomLine from "../utils/line";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface Link {
  title: string;
  keywords: string[];
  content: string;
  id: string;
}

const LinkDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [link, setLink] = useState<Link | null>(null);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log("Fetching data for ID:", id);
        
        // 🔹 Fetch both link and user data in a single request
        const response = await axios.get(`http://localhost:5000/api/linkRetrive/link-userData/${id}`);
        console.log("🔹 Response:", response.data);

        setLink(response.data.link);
        setUserName(response.data.userData.username);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen w-full">
          <Loader loaderColor={"black"} loaderSize={60} />
        </div>
      ) : link ? (
        <div className="flex">
          <div className="px-20 py-3">
            <div className="space-y-4">
              <div className="p-4">
                <div className="space-y-3">
                  <h2 className="text-3xl font-semibold">{link?.title}</h2>
                  <CustomLine />
                </div>
                <div className="flex items-center space-x-2">
                  <CustomAvatar name={userName} size={34} />
                  <p className="text-lg text-gray-400">{userName}</p>
                </div>
                <p className="text-gray-800 mt-2">{link?.content}</p>
                <Keywords keywords={link?.keywords} />
              </div>
            </div>
            <CustomLine />
            <div className="space-y-4">
              <CommentBox />
              <Comments />
            </div>
          </div>
          <div className="px-20 py-3">
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
