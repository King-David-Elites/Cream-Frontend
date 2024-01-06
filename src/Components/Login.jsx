import { login } from "@/services/request";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const Login = () => {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
    console.log(details);
  };
  //localStorage.setItem("token", "477cfa2f-6671-4290-a9da-0005bea78b64");

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token gotten:", token);
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    await login(details.email, details.password, router);
  };

  //const img = "../Assets/ver1.png";
  const img =
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div
      className=" w-full h-[100vh] flex flex-col gap-3 items-center justify-center"
      style={{
        backgroundImage: `url("/pic2.jpg")`,

        objectFit: "cover",
        backgroundSize: "cover",
      }}
    >
      <div className="bg-white cflexsm sm:gap-5 w-[30%] sm:w-[90%] h-[90vh] sm:rounded-xl sm:h-[80vh] p-10 sm:p-5 text-center rounded-lg">
        <h2 className="text-[2em] font-[700]">CREAM</h2>
        <p>Welcome Back, We missed you!</p>

        <form action="" className="flex w-full gap-5 flex-col">
          <input
            type="text"
            placeholder="Enter your Email here"
            name="email"
            value={details["email"]}
            onChange={handleChange}
            className=" border-gray-500 w-full text-[0.8em] p-3 border-[1px] focus:border-primary1 focus:border-[2px]"
            //style={{ borderWidth: 1, borderColor: "#000" }}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={details["password"]}
            onChange={handleChange}
            className=" border-gray-500 w-full text-[0.8em] p-3 border-[1px] focus:border-primary1 focus:border-[2px]"
          />

          <p className="text-start">
            Forgotten Password?{" "}
            <Link
              href={"/forgot-password"}
              className="text-primary1 font-[500]"
            >
              Click Here
            </Link>{" "}
          </p>
        </form>

        <button
          className="bg-primary1 w-full py-3 text-black rounded-md outline-none my-3"
          onClick={submitForm}
        >
          Login
        </button>

        <p>
          Don't have an account?{" "}
          <Link href={"/register"} className="text-primary1 font-[500]">
            Register
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
