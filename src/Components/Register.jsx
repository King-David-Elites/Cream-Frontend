import { register } from "@/services/request";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Register = () => {
  const router = useRouter();

  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber1: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log(details);
  }, [details]);

  const submitForm = async (e) => {
    e.preventDefault();
    if (details.password !== details.confirmPassword) {
      alert(
        "Password fields do not match. please ensure both fields contain the same value"
      );
    } else if (
      details.password.length < 8 &&
      details.confirmPassword.length < 8
    ) {
      alert("Password must not be less than 8 characters");
    } else {
      await register(details, router);
    }
  };

  useEffect(() => {
    console.log("user register form:", details);
  }, [details.confirmPassword]);
  return (
    <div
      className="bg-slate-700 w-full h-[100vh] flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url("/pic2.jpg")`,

        objectFit: "cover",
        backgroundSize: "cover",
      }}
    >
      <div className=" bg-white w-[35%] h-[auto] sm:w-[90%] p-10 sm:p-5 text-center rounded-lg">
        <h2 className="text-[2em] font-[700]">CREAM</h2>
        <p>Welcome to CREAM!</p>

        <form
          action=""
          className="flex gap-5 flex-col my-3"
          onSubmit={submitForm}
        >
          <input
            type="text"
            placeholder="Your first name e.g John"
            name="firstName"
            onChange={handleChange}
            value={details["firstName"]}
            className=" border-gray-500 w-full text-[0.8em] p-3 border-[1px] focus:border-primary1 focus:border-[2px]"
            required
          />
          <input
            type="text"
            placeholder="Your last name e.g Doe"
            name="lastName"
            onChange={handleChange}
            value={details.lastName}
            className=" border-gray-500 w-full text-[0.8em] p-3 border-[1px] focus:border-primary1 focus:border-[2px]"
            required
          />
          <input
            type="email"
            placeholder="Your email e.g johndoe@gmail.com"
            name="email"
            onChange={handleChange}
            value={details.email}
            className=" border-gray-500 w-full text-[0.8em] p-3 border-[1px] focus:border-primary1 focus:border-[2px]"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            name="phoneNumber1"
            onChange={handleChange}
            value={details.phoneNumber1}
            className=" border-gray-500 w-full text-[0.8em] p-3 border-[1px] focus:border-primary1 focus:border-[2px]"
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={details.password}
            className=" border-gray-500 w-full text-[0.8em] p-3 border-[1px] focus:border-primary1 focus:border-[2px]"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
            value={details.confirmPassword}
            className=" border-gray-500 w-full text-[0.8em] p-3 border-[1px] focus:border-primary1 focus:border-[2px]"
            required
          />
          <button
            className="bg-primary1 w-full py-3 text-black rounded-md my-3"
            type="submit"
          >
            Register
          </button>
        </form>

        <p>
          Already Have an Account?{" "}
          <Link href={"/login"} className="text-primary1 font-[500]">
            Login
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Register;
