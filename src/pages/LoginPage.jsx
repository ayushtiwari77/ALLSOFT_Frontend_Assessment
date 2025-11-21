import { useState } from "react";
import toast from "react-hot-toast";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

const LoginPage = () => {
  const [phonenumber, setPhonenumber] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setPhoneNumber } = useUserStore();

  //on submit functionality
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!phonenumber) throw new Error("enter phone number");

      const response = await axios.post("/generateOTP", {
        mobile_number: phonenumber,
      });
      console.log(response);
      if (response.data.status) {
        setPhoneNumber(phonenumber);
        navigate("/verify");
        toast.success(response.data.data);
      } else {
        toast.error(response.data.data);
      }
    } catch (err) {
      console.log(err.response.data);
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-blue-200">
      <div className="w-full bg-blue-700 h-20 p-2 text-white text-lg flex items-center justify-center">
        <h1 className="text-3xl font-bold ">AllSoft Technologies</h1>
      </div>
      <div className="my-10 w-full h-[70vh] p-2 ">
        <form
          onSubmit={handleLogin}
          className="max-w-2xl mx-auto h-full flex flex-col justify-center"
        >
          <label
            htmlFor="phone-input"
            className="block mb-2.5  font-semibold text-heading text-lg"
          >
            Enter Phone Number To Get OTP
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-body"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z"
                />
              </svg>
            </div>
            <input
              onChange={(e) => setPhonenumber(e.target.value)}
              type="text"
              id="phone-input"
              aria-describedby="helper-text-explanation"
              className="text-lg bg-white font-medium block w-full ps-9 pe-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading  rounded-base focus:ring-brand focus:outline-none shadow-xs placeholder:text-body rounded "
              pattern="[0-9]{10}"
              maxLength={10}
              minLength={10}
              placeholder="1234567890"
              required
              value={phonenumber}
            />
          </div>
          <div className="mt-5 w-full flex justify-center">
            <button
              disabled={loading}
              type="submit"
              className={` text-white rounded-2xl hover:bg-blue-900 bg-blue-700 bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none ${
                loading ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {loading ? "Generating OTP..." : "Send OTP"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
