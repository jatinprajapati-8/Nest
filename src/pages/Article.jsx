import React, { useEffect } from "react";
import Articlecard from "../component/Articlecard";
import { useDispatch, useSelector } from "react-redux";
import { getpost } from "../Slice/postslice";
import { ScaleLoader } from "react-spinners";
import { useFirebaseContext } from "../firebase/FirebaseProvider";

const Article = () => {
  const { posts , isloading, error } = useSelector((state) => state.poststate);
  const firebase = useFirebaseContext()

  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      firebase
      .getallposts()
      .then((posts) => dispatch(getpost(posts)))
    }, 1000);
    
  }, []);

  return (
    <div className="flex w-[100%] min-h-auto">
     <div className="left w-[650px]  mx-auto px-0">
        <div>
          <h1 className="text-[50px] font-[700] bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent ">
            For You
          </h1>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="border-none w-[250px] bg-gray-200 rounded-3xl"
        />
        <div className="w-full m-1">
          <ul className="flex gap-12 text-gray-500 text-[20px] font-[500]">
            <li>All</li>
            <li>Technology</li>
            <li>Environment</li>
            <li>Business</li>
            <li>Politics</li>
          </ul>
        </div>
        {isloading ? (
    <div className="flex w-[100%] min-h-auto items-center justify-center l">
      <ScaleLoader
        color="#4f46e5"
        height={50}
        width={4}
      />
    </div>
  ) : ( 
        <div>
          {posts?.map((doc) => {
            return <Articlecard key={doc.id} post={doc.data()} id={doc.id} />;
          })}
        </div>)}
      </div>
      <div className="Right mx-auto w-[350px] my-3 bg-indigo-500 "></div>
    </div>
  );
};

export default Article;
