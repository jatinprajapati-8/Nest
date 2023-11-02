import { Heart, MessageSquare, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import preview from "../assets/preview.png"
import { Link } from "react-router-dom";
import { useFirebaseContext } from "../firebase/FirebaseProvider";

const Articlecard = ({ post,id }) => {
  const [image, setImage] = useState("");
  const firebase = useFirebaseContext()
  useEffect(() => {
    firebase
      .getImage(post.thumbnail)
      .then((url) => {
        setImage(url);
      })
      .catch(console.log);
  }, []);

  return (
    <div>
      <div className="w-[620px] h-[150px] rounded-2xl overflow-hidden px-2 py-3 my-2 shadow-lg shadow-indigo-200">
        <div className="card flex w-full gap-4 ">
          <div className="w-[25%] h-[135px] px-2 overflow-hidden  object-center object-cover py-1">
          <img src={image || preview} 
          className="h-full w-full object-cover object-center" alt="" />
          </div>
          <div className="w-[75%]">
            <div className="flex items-center justify-between w-full mb-[6px]">
              <h2 className="font-semibold text-[15px] ">{post.title.length > 50 ? post.summary.slice(0,40) + "..." : post?.title} </h2>
              <p className="text-[13px] text-[#42424264]">12h ago</p>
            </div>
            <p className="text-[13px] text-[#424242] mb-[6px]">
              {post.summary.length > 100 ? post.summary.slice(0,60) + "..." : post?.summary}
            </p>
            <p className="text-[14px] font-medium text-[#1c1c1c] flex items-center gap-2 mb-[8px]">
              "Guest"
              <Star size={20} />
            </p>
            <div className="flex justify-between items-center my-4">
              <div>
                <span className="bg-green-500 text-white tracking-wider rounded-3xl px-3 py-2 font-semibold">
                  Environment
                </span>
              </div>
              <div className="flex gap-4">
                <div className=" flex text-[14px] items-center gap-2">
                  41 <Heart size={18} /> 21
                  <MessageSquare size={18} />{" "}
                </div>
                <div>
                  <Link to={`/article/${id}`} className="bg-indigo-600 text-white py-2 px-4 rounded-full">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articlecard;