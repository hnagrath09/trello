import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { User } from "../types/user";
import { message, Spin } from "antd";
import { getErrorMessage } from "../utils/error";
import AuthContext from "../contexts/AuthContext";

const client = Axios.create({
  baseURL: "https://frozen-citadel-41248.herokuapp.com/",
});

const Auth: React.FC = ({ children }) => {
  const [authVerified, setAuthVerified] = useState<boolean>(false);

  const [jwt, setJWT] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const savedJWT = localStorage.getItem("jwt");
      if (savedJWT) {
        try {
          const { data } = await client.get<User>("/users/me", {
            headers: { Authorization: `Bearer ${savedJWT}` },
          });
          setUser(data);
          setJWT(savedJWT);
        } catch (error) {
          message.error(getErrorMessage(error.response?.data?.message));
        } finally {
          setAuthVerified(true);
        }
      } else {
        setAuthVerified(true);
      }
    };
    fetchUserInfo();
  }, []);

  const signOut = useCallback(async () => {
    window.localStorage.removeItem("jwt");
    setJWT(undefined);
    setUser(undefined);
    return true;
  }, []);

  const signInWithEmail = useCallback(
    async ({
      email,
      password,
      rememberMe,
    }: {
      email: string;
      password: string;
      rememberMe?: boolean;
    }) => {
      try {
        const {
          data: { jwt, user },
        } = await client.post<{ jwt: string; user: User }>("/auth/local", {
          identifier: email,
          password,
        });
        if (rememberMe) {
          window.localStorage.setItem("jwt", jwt);
        }
        setJWT(jwt);
        setUser(user);
        return true;
      } catch (error) {
        message.error(getErrorMessage(error.response?.data?.message));
        return false;
      }
    },
    []
  );

  const signUpWithEmail = useCallback(
    async ({
      name,
      email,
      password,
      rememberMe,
    }: {
      name: string;
      email: string;
      password: string;
      rememberMe?: boolean;
    }) => {
      try {
        const {
          data: { jwt, user },
        } = await client.post<{ jwt: string; user: User }>(
          "/auth/local/register",
          { username: email, name, email, password }
        );
        message.success(
          "Congratulations. Your account is created successfully."
        );
        if (rememberMe) {
          window.localStorage.setItem("jwt", jwt);
        }
        setJWT(jwt);
        setUser(user);
        return true;
      } catch (error) {
        message.error(getErrorMessage(error.response?.data?.message));
        return false;
      }
    },
    []
  );

  const forgotPassword = useCallback(async (email: string) => {
    try {
      await client.post("/auth/forgot-password", { email });
      message.success(
        `Email with instructions to reset your password is sent to ${email}`
      );
      return true;
    } catch (error) {
      message.error(getErrorMessage(error.response?.data?.message));
      return false;
    }
  }, []);

  if (!authVerified) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-white">
        <Spin tip="Verifying User..." />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        jwt,
        signOut,
        signInWithEmail,
        signUpWithEmail,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default Auth;
