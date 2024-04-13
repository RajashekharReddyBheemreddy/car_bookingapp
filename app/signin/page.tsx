"use client";
import Image from "next/image";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function signin() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(user.email.trim() !== '' && user.password.trim() !== ''){
      try {
        setLoading(true);
        await axios.post("/api/users/signin", user);
        toast.success("Login success");
        localStorage.setItem("email", JSON.stringify(user.email));
        router.push("/");
      } catch (error: any) {
        toast.error("Login failed");
      } finally {
        setLoading(false);
      }
    }else{
      return alert('Enter the username and password')
    }
    
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="overflow-hidden">
        <div className="hero">
          <div className="flex-1 pt-36 padding-x">
            <h1 className="hero__title">
              {loading ? "Loading...." : "Sign In"}
            </h1>
            <div className="flex my-4">
              <label
                htmlFor="email"
                className="block text-md font-medium mt-1 ml-2 mr-10 text-gray-900"
              >
                Email
              </label>
              <input
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                type="email"
                className="w-50 rounded-md py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                placeholder="john@email.com"
              />
            </div>
            <div className="flex">
              <label
                htmlFor="password"
                className="block text-md font-medium mt-1 mx-2 text-gray-900"
              >
                Password
              </label>
              <input
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                type="password"
                className="w-50 rounded-md py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                placeholder="Enter your password"
              />
            </div>
            <CustomButton
              btnType="submit"
              title="Sign In"
              containerStyles="bg-primary-blue text-white rounded-full mt-10"
            />
            <p className="hero__subtitle mb-5">
              Dont have an account <Link href={"/signup"}>SignUp</Link>
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
