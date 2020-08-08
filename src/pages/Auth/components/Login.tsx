import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="max-w-md px-16 py-12 mx-auto bg-white rounded-sm shadow-lg ">
      <div className="mb-8 font-bold text-center text-gray-700">
        Log in to trello
      </div>
      <form className="flex-col ">
        <input
          className="w-full px-2 py-2 mx-auto mb-6 text-sm bg-gray-100 border-2 border-gray-300 "
          type="email"
          placeholder="Enter email"
        />
        <input
          className="w-full px-2 py-2 mx-auto mb-6 text-sm bg-gray-100 border-2 border-gray-300 "
          type="password"
          placeholder="Enter password"
        />
        <Link to="/">
          <button
            className="w-full py-2 mb-8 text-sm font-bold text-white bg-green-500 rounded-sm"
            type="submit"
          >
            Log in
          </button>
        </Link>
      </form>
      <div className="mb-6 text-sm font-hairline text-center">OR</div>

      <button
        className="w-full py-2 mb-3 text-sm font-bold text-gray-600 bg-white border rounded-sm shadow"
        type="submit"
      >
        Continue with Google
      </button>

      <div className="pt-4 mt-4 text-sm text-center text-blue-500 border-t-2">
        <span className="mr-4 cursor-pointer hover:underline">
          Can't log in?
        </span>
        <Link to="/signup">
          <span className="cursor-pointer hover:underline">
            Sign up for an account
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
