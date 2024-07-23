import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setUserData } from "../Redux/slices/user-slice";
import { useDispatch } from "react-redux"; 

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState(""); 
 

  const loginUser = async (e) => {
    try{
        e.preventDefault();

        const user = {
            userEmail,
            userPassword,
        };

        const result = await axios.post("http://localhost:5000/auth/login", user);  //(URL, data)
        console.log("User Logged  in successfully: ", result);

        dispatch(setUserData(result.data));

        navigate("/");
    }
    catch(err){
      console.log("Cannot login the user: ", err);
    }
  }

  return (
    <div className="flex h-heightWithoutNavbar w-full items-center justify-center p-5">
      <form className="flex w-full max-w-[420px] flex-col gap-4 rounded-xl bg-white p-5 shadow-xl" onSubmit={loginUser}>
        <h1 className="text-2xl font-bold">Login</h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-start justify-center">
            <label className="font-bold" htmlFor="userEmail">
              Email
            </label>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              className="w-full rounded-lg border border-gray-400 p-2"  
              placeholder="email@gmail.com"
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label className="font-bold" htmlFor="userPassword">
              Password 
            </label>
            <input
              type="password"
              id="userPassword"
              name="userPassword"
              className="w-full rounded-lg border border-gray-400 p-2"
              placeholder="password"
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          className="rounded-lg bg-blue-500 px-5 py-2 font-bold text-white hover:bg-blue-600"
          type="submit"
        >
          Log In
        </button>
        
        <div className="flex items-center justify-between text-sm">
          <p className="">New here?</p>
          <Link to="/signup">
            <p className="font-bold">Create an account</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
