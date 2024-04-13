"use client";
import Image from "next/image";
import CustomButton from "@/components/CustomButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/api/users/me");
      setUserName(res?.data.data.name);
      setUserEmail(res?.data.data.email);
    };
    getData()
  }, []);

  const updateHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = {userName, userEmail, password}
      await axios.put('/api/users/profile', user)
      router.push('/')
      setLoading(true);
    } catch (error: any) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={updateHandler}>
      <div className="overflow-hidden">
        <div className="hero">
          <div className="flex-1 pt-36 padding-x">
            <h1 className="hero__title">
              {loading ? "Loading...." : "Update Profile"}
            </h1>
            <div className="flex my-4">
              <label
                htmlFor="username"
                className="block text-md font-medium mx-2 text-gray-900"
              >
                Username
              </label>
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                className="w-50 rounded-md py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                placeholder="John"
              />
            </div>

            <div className="flex my-4">
              <label
                htmlFor="email"
                className="block text-md font-medium mt-1 ml-2 mr-10 text-gray-900"
              >
                Email
              </label>
              <input
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value )}
                type="email"
                className="w-50 rounded-md py-1.5 pl-2 ml-1 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-50 rounded-md py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                placeholder="Enter your password"
              />
            </div>
            <CustomButton
              btnType="submit"
              title="Update"
              containerStyles="bg-primary-blue text-white rounded-full mt-10"
            />
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
