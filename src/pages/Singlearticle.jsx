import { Facebook, Instagram, StarIcon, Twitter } from "lucide-react";
import React, { useEffect, useState } from "react";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setpost } from "../Slice/singlepostslice";
import toast from "react-hot-toast";
import { ScaleLoader } from "react-spinners";
import Parser from "html-react-parser";
// import { format } from "date-fns";
import { useFirebaseContext } from "../firebase/FirebaseProvider";
import preview from "../assets/preview.png";

const Singlearticle = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.singlepoststate);
  const { user } = useSelector((state) => state.userstate);
  const [image, setImage] = useState();
  const firebase = useFirebaseContext();
  const [isloding, setIsLoading] = useState(true);

  const handledelete = async () => {
    try {
      if (id) {
        let res = await firebase.deletePost(id);
        if (res) {
          toast.success("Post Deleted Successfully");
          navigate("/article");
        } else {
          toast.error("Somthing Went Wrong");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Somthing Went Wrong");
    }
  };

  useEffect(() => {
    if (id) {
      firebase
        .getSinglePost(id)
        .then((post) => {
          dispatch(setpost(post));
          return firebase.getImage(post.thumbnail);
        })
        .then((url) => setImage(url))
        .catch((err) => toast.error(err.message || "Something went wrong"))
        .finally(() => setIsLoading(false));
    }
  }, [id]);
  console.log(post);

  return post ? (
    <div>
      <div className="w-[980px] mx-auto">
        <div className="flex w-full items-center justify-between mb-5">
          <div className="flex  gap-3">
            <h2 className="flex gap-3 text-[20px] leading-5 font-[400] items-center">
              {post?.name || "Guest"} <StarIcon size={18} />
            </h2>
            <button className="bg-[#3652E1] text-white rounded-3xl px-4 py-0">
              Follow
            </button>
          </div>
          <div className="flex gap-3 items-center">
            <Instagram size={18} /> <Facebook size={18} />
            <Twitter size={18} />
            <AiOutlineWhatsApp size={18} />
          </div>
        </div>
        <div className="w-full mb-5  flex justify-between items-center">
          <h1 className="text-[38px] font-[700]">{post?.Title}</h1>
          {post?.userid === user?.uid && (
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  navigate(`/addarticle?postid=${id}`);
                }}
                className="bg-purple-600 rounded-xl px-3 py-1 text-white"
              >
                Update
              </button>
              <button
                onClick={handledelete}
                className="bg-indigo-600  rounded-xl px-3 py-1 text-white"
              >
                Delete
              </button>
            </div>
          )}
        </div>
        <div className="w-full">
          <p className="text-[#8E8E8E] font-[500] mb-3">
            PUBLISHED:{" "}
            {/* {format(
              new Date(post?.$createdAt),
              "eee,MMM d  yyyy "
            ).toUpperCase()} */}
          </p>
          <img src={image || preview} className="my-2" />
          <p className="text-[15px] font-[500] leading-5 text-[#8E8E8E]">
            {post?.summary}
          </p>
          <div className="w-[70%]"></div>
          <contant className="font-[200] w-full items-center  text-[20px] align-middle mb-2">
            {Parser(post?.Content)}
          </contant>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen min-w-full">
      <ScaleLoader
        color="#4f46e5"
        height={50}
        margin={4}
        radius={2}
        speedMultiplier={2}
        width={4}
      />
    </div>
  );
};

export default Singlearticle;
