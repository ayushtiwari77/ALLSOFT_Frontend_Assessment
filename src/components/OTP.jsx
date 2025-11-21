import React, { useRef, useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

export default function OTP() {
  const [otp, setOtp] = useState(Array(6).fill("")); // Array with 6 empty strings
  const inputRefs = useRef([]); // Array of refs for each input field
  const { phoneNumber, setUserDetails } = useUserStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      !e.metaKey
    ) {
      e.preventDefault();
      console.log("last key");
    }

    if (e.key === "Delete" || e.key === "Backspace") {
      const index = inputRefs.current.indexOf(e.target);
      if (index > 0) {
        setOtp((prevOtp) => [
          ...prevOtp.slice(0, index - 1),
          "",
          ...prevOtp.slice(index),
        ]);
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleInput = (e) => {
    const { target } = e;
    const index = inputRefs.current.indexOf(target);
    if (target.value) {
      const newOtp = [
        ...otp.slice(0, index),
        target.value,
        ...otp.slice(index + 1),
      ];
      setOtp(newOtp);

      // setOtp((prevOtp) => [
      //   ...prevOtp.slice(0, index),
      //   target.value,
      //   ...prevOtp.slice(index + 1),
      // ]);
      if (index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      } else {
        //last digit entered , submit the form
        handleSubmit(newOtp);
      }
    }
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (!new RegExp(`^[0-9]{${otp.length}}$`).test(text)) {
      return;
    }
    const digits = text.split("");
    setOtp(digits);

    // After pasting, submit if all digits are filled
    if (digits.every((d) => d)) {
      handleSubmit();
    }
  };

  const handleSubmit = async (otpValue) => {
    try {
      setLoading(true);
      if (!phoneNumber) throw new Error("phone number is absent");
      const otpstring = otpValue.join("");

      const response = await axios.post("/validateOTP", {
        mobile_number: phoneNumber,
        otp: otpstring,
      });

      if (response.data.status) {
        setUserDetails(response.data.data);
        navigate("/");
        toast.success("Logged In SuccessFully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-transparent py-10 dark:bg-dark h-full grid place-content-center">
      <div className="container h-full">
        <div className="h-full flex flex-col gap-2">
          <p className="mb-1.5 text-2xl font-semibold  text-blue-600 ">
            Enter Your OTP to Verify
          </p>
          <form onSubmit={handleSubmit} id="otp-form" className="flex gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                disabled={loading}
                type="text"
                maxLength={1}
                value={digit}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onPaste={handlePaste}
                ref={(el) => (inputRefs.current[index] = el)}
                className="shadow-xs flex w-16 items-center justify-center rounded-lg border border-stroke bg-white p-2 text-center text-2xl font-medium text-gray-5 outline-none sm:text-4xl dark:border-dark-3 dark:bg-white/5"
              />
            ))}
          </form>
          {loading && <p className="text-blue-700 text-xl">loading...</p>}
          <Link
            to="/login"
            className=" text-center text-blue-700 text-lg hover:underline no-underline"
          >
            back to login page
          </Link>
        </div>
      </div>
    </section>
  );
}
