"use client";
import Image from "next/image";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.password === user.confirmPassword) {
      try {
        setLoading(true);
        await axios.post("/api/users/signup", user);
        router.push("/signin");
        toast.success("Sign up successful");
      } catch (error: any) {
        toast.error("Signup failed", error.message);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("please match both the passwords");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="overflow-hidden">
        <div className="hero">
          <div className="flex-1 pt-36 padding-x">
            <h1 className="hero__title">
              {loading ? "Loading...." : "SIgn Up"}
            </h1>
            <div className="flex my-4">
              <label
                htmlFor="username"
                className="block text-md font-medium mt-1 mr-10 text-gray-900"
              >
                Username
              </label>
              <input
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                type="text"
                className="w-50 rounded-md py-1.5 pl-2 ml-9 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                placeholder="John"
              />
            </div>
            <div className="flex my-4">
              <label
                htmlFor="email"
                className="block text-md font-medium mt-1 mr-12 text-gray-900"
              >
                Email
              </label>
              <input
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                type="email"
                className="w-50 rounded-md ml-16 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                placeholder="john@email.com"
              />
            </div>
            <div className="flex">
              <label
                htmlFor="password"
                className="block text-md font-medium mt-1  text-gray-900"
              >
                Password
              </label>
              <input
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                type="password"
                className="w-50 rounded-md ml-20 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex my-4">
              <label
                htmlFor="Confirmpassword"
                className="block text-md font-medium mt-1 text-gray-900"
              >
                Confirm Password
              </label>
              <input
                value={user.confirmPassword}
                onChange={(e) =>
                  setUser({ ...user, confirmPassword: e.target.value })
                }
                type="password"
                className="w-50 rounded-md py-1.5 ml-4 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                placeholder="Confirm your password"
              />
            </div>
            <CustomButton
              btnType="submit"
              title="Sign Up"
              containerStyles="bg-primary-blue text-white rounded-full mt-10"
            />
            <p className="hero__subtitle mb-5">
              Have an account <Link href={"/signin"}>Login</Link>
            </p>
          </div>
          <div className="hero__image-container">
            <div className="hero__image">
              <Image
                alt="Dashboard image"
                src="/hero.png"
                fill
                className="object-contain"
              />
            </div>
            <div className="hero__image-overlay" />
          </div>
        </div>
      </div>
    </form>
  );
}
