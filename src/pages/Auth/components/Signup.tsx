import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="max-w-md px-16 py-12 mx-auto bg-white rounded-sm shadow-lg ">
      <div className="mb-8 font-bold text-center text-gray-700">
        Sign up for your account
      </div>
      <form className="flex-col ">
        <input
          className="w-full px-2 py-2 mx-auto mb-4 text-sm bg-gray-100 border-2 border-gray-300 "
          type="text"
          placeholder="Enter your full name"
        />
        <input
          className="w-full px-2 py-2 mx-auto mb-4 text-sm bg-gray-100 border-2 border-gray-300 "
          type="email"
          placeholder="Enter email"
        />
        <input
          className="w-full px-2 py-2 mx-auto mb-4 text-sm bg-gray-100 border-2 border-gray-300 "
          type="password"
          placeholder="Create password"
        />
        <div className="mb-4 text-xs text-gray-600">
          By signing up, you confirm that you've read and accepted our Terms of
          Service and Privacy Policy
        </div>
        <button
          className="w-full py-2 mb-8 text-sm font-bold text-gray-600 bg-gray-300 rounded-sm"
          type="submit"
        >
          Create Account
        </button>
      </form>
      <div className="mb-6 text-sm font-hairline text-center">OR</div>

      <button
        className="w-full py-2 mb-3 text-sm font-bold text-gray-600 bg-white border rounded-sm shadow"
        type="submit"
      >
        Continue with Google
      </button>

      <Link to="/login">
        <div className="pt-4 mt-4 text-sm text-center text-blue-500 border-t-2 cursor-pointer hover:underline">
          Already have an account? Log in
        </div>
      </Link>
    </div>
  );
};

export default Signup;
