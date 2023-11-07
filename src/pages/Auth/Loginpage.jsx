import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/1.png";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { login} from "../../Slice/userSlice";
import { useFirebaseContext } from "../../firebase/FirebaseProvider";

export default function Loginpage() {
  const firebase = useFirebaseContext()
  const { status } = useSelector((state) => state.userstate);
  const dispatch = useDispatch();
  const [visible, setvisible] = useState(false);
  const InputType = visible ? "text" : "password";
  const navigate = useNavigate();

  const [userdata, setuserdata] = useState({
    email: "",
    password: "",
  });

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Enter a Valid Email address"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Enter a valid Password"
      ),
  });

  const handlechange = (e) => {
    setuserdata({
      ...userdata,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      let result = await loginSchema.validate(userdata, {
        abortEarly: false,
      });
      let user = await firebase.Login(result);
      if (user) {
        setTimeout(() => {
          toast.success("Sign in successfully");
          dispatch(login({ user }));
        }, 1000);
        setTimeout(() => {
          navigate("/article");
        }, 2000);
      } else {
        toast.error("Somthing went wrong while signing in ");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.errors[0]);
    }
  };

  useEffect(() => {
    if (status) {
      navigate("/");
      toast.success("you are already logged In");
    }
  },[status]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-[80px] w-auto"
            src={logo}
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onChange={handlechange}
            onSubmit={handlesubmit}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={userdata.email}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2 flex ">
                <input
                  id="password"
                  name="password"
                  type={InputType}
                  value={userdata.password}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <span className="z-50 absolute cursor-pointer mt-[10px] ml-[360px]">
                  {visible ? (
                    <AiOutlineEye
                      onClick={() => setvisible((visible) => !visible)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      onClick={() => setvisible((visible) => !visible)}
                    />
                  )}
                </span>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
              <div className="flex justify-between items-center gap-4">
              <hr className="flex-1" style={{ borderTop: "1px solid gray" }} />{" "}
              <p className="flex text-center">or</p>{" "}
              <hr className="flex-1" style={{ borderTop: "1px solid gray" }} />
            </div>
            <div>
              <button
                onClick={firebase.signupwithgoogle}
                type="button"
                className="flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
              >
                Sign in With Google
              </button>
            </div>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account?
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Click here to Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
