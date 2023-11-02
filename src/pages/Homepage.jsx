import React, { useContext } from "react";
import {NavLink,useNavigate } from "react-router-dom";
import img from "../assets/3.png";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { logout } from "../Slice/Userslice";
import Postcard from "../component/Postcard";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { useFirebaseContext } from "../firebase/FirebaseProvider";

let posts = [
  {
    id: 1,
    title: "The law comes for Bankman-Fried.",
    summary:
      "Less than a week after telling a BBC journalist that he didn't think he'd be arrested for his role in crypto...",
    thumbnail: "/src/assets/sam.jpg",
    author: "Sam",
    category: "Tech",
  },
  {
    id: 2,
    title: "The law comes for Bankman-Fried",
    summary:
      "Less than a week after telling a BBC journalist that he didn't think he'd be arrested for his role in crypto...",
    thumbnail: "/src/assets/sam.jpg",
    author: "Sam",
    category: "Tech",
  },
  {
    id: 3,
    title: "The law comes for Bankman-Fried",
    summary:
      "Less than a week after telling a BBC journalist that he didn't think he'd be arrested for his role in crypto...",
    thumbnail: "/src/assets/sam.jpg",
    author: "Sam",
    category: "Tech",
  },
  {
    id: 4,
    title: "The law comes for Bankman-Fried",
    summary:
      "Less than a week after telling a BBC journalist that he didn't think he'd be arrested for his role in crypto...",
    thumbnail: "/src/assets/sam.jpg",
    author: "Sam",
    category: "Tech",
  },
];

const Homepage = () => {
  const firebase = useFirebaseContext()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userstate);

  const handlelogout = async () => {
    try {
      let result = await firebase.logout();
      if (result) {
        dispatch(logout());
        toast.success("Logged out successfully");
        navigate("/");
      }
    } catch (error) {
      console.log("Error in logout", error);
      toast.error(error.message);
    }
  };

  return (
<>

      <section className="flex">
        <div className="h-[602px] w-full mt-[50px] ml-[56px] bg-[url('src/assets/2.png')] flex">
          <img
            className="ml-[200px] mt-[20px] h-[400px] "
            src={img}
            alt="Your Company"
          />
          <div className="ml-0">
            <h1 className="text-[90px] text-right ml-[0px] ">
              Write Your
              <br />
              <span className="text-[#3652E1]">Article</span>
              <br />
              Here
              <div className="flex text-[22px] gap-6 ml-[20px]">
                {user ? (
                  <>
                  <button
                    onClick={() => navigate("/addarticle")}
                    className="bg-[#3652E1] text-white px-[42px]  py-1 rounded-[35px]"
                  >
                    Add Article
                  </button>
                  <NavLink
                    onClick={handlelogout}
                    className="bg-[#3652E1] text-white px-[48px]  py-1 rounded-[35px]"
                  >
                    Logout
                  </NavLink></>
                ) : (
                  <>
                    <NavLink
                      to={"/signup"}
                      className="bg-[#3652E1] text-white px-[48px] py-1 rounded-[35px]"
                    >
                      SignUp
                    </NavLink>
                    <NavLink
                      to={"/login"}
                      className="bg-[#3652E1] text-white px-[48px] py-1 rounded-[35px]"
                    >
                      SignIn
                    </NavLink>
                  </>
                )}
              </div>
            </h1>
          </div>
        </div>
      </section>
      <section className="banner min-h-[575px] py-[80px] mx-auto flex items-center relative bg-gradient-to-br from-indigo-600 to-[#7851E8]">
        <div className="bg-section-bg h-full w-full absolute bg-full bg-no-repeat bg-center"></div>
        <div className="max-w-[1190px] mx-auto relative flex gap-[20px]">
          <div className="w-[35%]">
            <h1 className="text-[90px] font-[500] text-start leading-[110px]">
              Best <br /> <span className="text-white ">Articles</span>
              <br /> Today
            </h1>
            <div className="flex justify-start mt-5">
              <button
                onClick={() => navigate("/article")}
                className="text-indigo-600 py-3 font-semibold px-5 rounded-full bg-white"
              >
                See All Articles
              </button>
            </div>
          </div>
          <Swiper
            className="w-[65%]"
            spaceBetween={20}
            slidesPerView={3}
            loopedSlides
            autoplay
            modules={[A11y, Autoplay]}
          >
            {posts.map((post, i) => (
              <SwiperSlide>
                <Postcard post={post} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Homepage;
