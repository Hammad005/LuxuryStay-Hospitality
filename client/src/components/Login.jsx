import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Info, Loader2 } from "lucide-react";
import { authStore } from "@/store/authStore";

const Login = ({ toggleMode }) => {
  const { login, loginLoading } = authStore();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!loginData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!loginData.password.trim()) {
      newErrors.password = "Password is required.";
    } 

    setLoginErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      login(loginData);
    }
  };

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  return (
    <>
      <h2 className="text-3xl font-bold text-center text-primary font-serif text-shadow-md text-shadow-black">
        Welcome Back!
      </h2>
      <p className="text-xs text-center  mb-6 text-white">
        We're so excited to see you again!
      </p>
      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
        <div className="flex flex-col gap-1">
          <Input
            type="text"
            name="loginEmail"
            placeholder="Email"
            className="rounded-md"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                email: e.target.value,
              })
            }
          />
          {loginErrors.email && (
            <p className="text-primary text-xs flex gap-1 items-center">
              <Info className="size-[0.75rem]" /> {loginErrors.email}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1 relative">
          <Input
            type={showLoginPassword ? "text" : "password"}
            name="loginPassword"
            placeholder="Password"
            className="rounded-md"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                password: e.target.value,
              })
            }
          />
          <div className="absolute mt-4.5 right-3 transform -translate-y-1/2">
            {!showLoginPassword ? (
              <Eye
                className="size-[1.25rem] cursor-pointer text-primary"
                onClick={() => setShowLoginPassword(true)}
              />
            ) : (
              <EyeOff
                className="size-[1.25rem] cursor-pointer text-primary"
                onClick={() => setShowLoginPassword(false)}
              />
            )}
          </div>
          {loginErrors.password && (
            <p className="text-primary text-xs flex gap-1 items-center">
              <Info className="size-[0.75rem]" /> {loginErrors.password}
            </p>
          )}
        </div>
        <Button type="submit" variant="secondary" className="mt-2 shadow-lg shadow-black w-full" disabled = {loginLoading}>
          {
            loginLoading ? <Loader2 className="animate-spin" /> : "Login"
          }
        </Button>
      </form>

      <p className="text-sm text-center mt-6 text-white">
        Don't have an account?{" "}
        <button
          onClick={toggleMode}
          className="text-primary font-semibold hover:underline cursor-pointer"
        >
          Sign Up
        </button>
      </p>
    </>
  );
};

export default Login;
