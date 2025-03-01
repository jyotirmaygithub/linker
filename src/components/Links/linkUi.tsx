import React from "react";
import { Link } from "react-router-dom";
import PostedDate from "./utils/postedDate";
import Keyword from "./utils/keywords";
import LinkId from "./utils/linkId";
import Views from "./utils/views";
import PostedBy from "../../utils/avatar";

interface Link {
  title: string;
  keywords: string[];
  content: string;
  _id: string; // Unique identifier for navigation
  clickCount: number;
  linkerName: string;
  linkUploadedDate: string;
}

interface LinkData {
  links: Link | null;
}

const truncateText = (text: string, wordLimit: number): string => {
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};

const LinkUi: React.FC<LinkData> = ({ links }) => {
  return (
    <div className="px-32 py-3">
      <div className="mt-6 space-y-4">
        <div className="border p-4 rounded shadow-sm bg-gray-50">
          <h2 className="text-xl font-semibold">{links?.title}</h2>
          <p className="text-gray-800 mt-2">
            {/* {truncateText(links?.content || "", 80)} */}
            {/* {links && links.content.split(" ").length > 50 && ( */}
              <LinkId Id={links && links._id} Content={links && links.content} />
            {/* )} */}
          </p>
          <Keyword keywords={links?.keywords} />
          <div className="flex justify-end items-center space-x-4">
            <PostedDate date={links?.linkUploadedDate} />
            <Views views={links?.clickCount} />
            <PostedBy name={links && links.linkerName} size={28}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkUi;
