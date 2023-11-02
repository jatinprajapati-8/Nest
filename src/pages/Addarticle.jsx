import React, { useEffect, useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { login } from "../Slice/Userslice";
import { useFirebaseContext } from "../firebase/FirebaseProvider";

const Addarticle = () => {
  const [query] = useSearchParams();
  const navigate = useNavigate();
  const [title, settitle] = useState("");
  const [slug, setslug] = useState("");
  const [thumbnail, setthumbnail] = useState("");
  const [Content, setcontent] = useState("");
  const [summary, setsummary] = useState();
  const { user } = useSelector((state) => state.userstate);
  const postid = query.get("postid");

  useEffect(() => {
    setslug(title.trim().toLowerCase().split(" ").join("-"));
  }, [title]);

  const firebase = useFirebaseContext();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      if (user && title && slug && Content && thumbnail && summary) {
        if (postid) {
          let res = await firebase.updatePost(postid, {
            file: thumbnail,
            title,
            slug,
            Content,
            userid: user?.uid,
            username: user.name || "Guest",
            summary,
          });
          if (res) {
            toast.success("Post Updated Successfully");
            navigate("/");
          } else {
            toast.error("Something went wrong while creating post");
          }
        } else {
          let res = await firebase.uplodefile({
            file: thumbnail,
            title,
            slug,
            Content,
            userid: user?.uid,
            username: user.name || "Guest",
            summary,
          });
          if (res) {
            toast.success("Post Created Successfully");
            navigate("/");
          } else {
            toast.error("Something went wrong while creating post");
          }
        }
      } else {
        toast.error("All Fields are required");
      }
    } catch (error) {
      console.log("ERROR IN ADD ARTICLE", error);
    }
  };
  useEffect(() => {
    if (postid) {
      firebase
        .getSinglePost(postid)
        .then((post) => {
          settitle(post.title);
          setslug(post.slug);
          setsummary(post.summary);
          setthumbnail(post.thumbnail);
          setcontent(post.Content);
        })
        .catch(console.log);
    }
  }, []);

  return (
    <div>
      <div className="max-w-[1080px] mx-auto py-7 ">
        <form className="border-black border-[1px] p-5" onSubmit={handlesubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                <span className="text-indigo-600">Add</span> Post
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be displayed publicly.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Title
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        onChange={(e) => settitle(e.target.value)}
                        autoComplete="title"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Enter a title "
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="slug"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Slug
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="slug"
                        id="slug"
                        disabled
                        value={slug}
                        onChange={(e) => setslug(e.target.value)}
                        autoComplete="slug"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="write a slug for your post"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="thumbnail"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Thumbnail
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                    <UserCircleIcon
                      className="h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("fileinput").click()
                      }
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100"
                    >
                      Upload Thumbnail
                    </button>
                    <input
                      onChange={(e) => {
                        setthumbnail(e.target.files[0]);
                      }}
                      type="file"
                      id="fileinput"
                      accept="image/*"
                      className="sr-only"
                    />
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="summary"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Summary
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="summary"
                        id="summary"
                        value={summary}
                        onChange={(e) => setsummary(e.target.value)}
                        autoComplete="summary"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="write a summary for your post"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Content
                  </label>
                  <Editor
                    initialValue="Please Enter Some text here..."
                    init={{
                      branding: false,
                      toolbar: [
                        "image link lists numlist bullist undo redo | formatselect | bold italic | alignleft aligncentre alignright alignjustify |  copy paste cut emoticons",
                      ],
                    }}
                    plugins={[
                      "anchor",
                      "link",
                      "emoticons",
                      "wordcount",
                      "lists",
                    ]}
                    onEditorChange={(value) => setcontent(value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addarticle;
