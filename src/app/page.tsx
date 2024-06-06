"use client";
import { doLogin } from "@/api/login";
import { useAuthStore } from "@/store/authStore";
import { LoginRequest, Role } from "@/types/login";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Example() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
      const loginDto: LoginRequest =  {emailId: email, password,role :Role.ADMIN};
      const response  = await doLogin(loginDto);
      router.push("/dashboard");
      setAuth({
        accessToken: response.token,
        isAuthenticated: true,
      });
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
          
          // if (accessToken) {
          //   getPermission().then((permission) => {
          //     setPermission(permission.data as Permission);
          //     setAuth({
          //       accessToken,
          //       isAuthenticated: true,
          //     });
          //   });
          // }
        // },
        // onError: (err: any) => {
        //   toast(err.response.data.errorMessage, {
        //     type: "error",
        //     autoClose: 2000,
        //   });
        // },
      // });
    }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 mx-4">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-6 pb-12 shadow-lg sm:rounded-lg sm:px-12 border border-gray-200">
            <div className="sm:mx-auto sm:w-full sm:max-w-md py-8">
              <div className="items-center flex flex-row mx-auto mb-8">
                <Image
                  src="/logo.png"
                  alt="My Image"
                  className="h-8 w-auto mx-auto"
                  width={500} // Adjust width as needed
                  height={500} // Adjust height as needed
                />
              </div>
              <h2 className="text-left text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in
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
                  onChange={() => setShowPassword(!showPassword)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 border-2 focus:ring-indigo-600"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-3 block text-sm leading-6 text-gray-900"
                >
                  Show Password
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="flex w-full justify-center rounded-md bg-primary-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
