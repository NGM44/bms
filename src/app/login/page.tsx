"use client";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { auth } from "../firebaseConfig";
import Link from "next/link";
import { toast } from "react-toastify";

export default function Example() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (res) {
        console.log({ res });
        sessionStorage.setItem("user", "true");
        setEmail("");
        setPassword("");
        toast("Logged in Successfully", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        router.push("/dashboard");
      } else {
        toast("Login Failed, try again");
      }
    } catch (e) {
      toast("Soemthing went wrong");
      console.error(e);
    }
  };
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
      ```
      */}
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 mx-4">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow-lg sm:rounded-lg sm:px-12 border border-gray-200">
            <div className="sm:mx-auto sm:w-full sm:max-w-md pb-8">
              
              <Link
                href="/"
                className="text-primary-800 font-bold text-lg -tracking-tight"
              >
                 <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-600/10">
                    Vayuguna
                  </span>
              </Link>
              <h2 className="mt-6 text-left text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>
            <form className="space-y-6" action="#" method="POST">
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
                    type="email"
                    // autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    // autoComplete="current-password"
                    required
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={showPassword}
                  onClick={() => setShowPassword(!showPassword)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 border-2 focus:ring-indigo-600"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-3 block text-sm leading-6 text-gray-900"
                >
                  Show Password
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm leading-6">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  onClick={handleSignIn}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <div>
              <div className="text-sm leading-6 mt-2">
                Don&apos;t have an account?
                <Link
                  href="/signup"
                  className="font-semibold text-indigo-600 hover:text-indigo-500 ml-2"
                >
                  Create one
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
