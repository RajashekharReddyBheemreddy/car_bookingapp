"use client";
import Link from "next/link";
import Image from "next/image";
import CustomButton from "./CustomButton";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  let getEmail: any;
  if (typeof window !== undefined) {
    try {
      getEmail = localStorage?.getItem("email");
    } catch (error) {
      console.log('Fetching Data')
    }
  }
  useEffect(() => {
    if (getEmail) {
      setMounted(true);
    }
  }, [getEmail]);

  const logoutHandler = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("User Logged out successfully");
      setMounted(false);
      localStorage.clear();
      router.push("/signin");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        <Link href={"/"} className="flex justify-center items-center">
          <Image
            src={"/logo.svg"}
            alt="Car Hub logo"
            width={118}
            height={18}
            className="object-contain"
          />
        </Link>

        {mounted ? (
          <div className="flex">
            <Link href={"/mybookings"} className="mx-1">
              <CustomButton
                title="Bookings"
                btnType="button"
                containerStyles="text-primary-black mt-1 rounded-full bg-blue min-w-[120px]"
              />
            </Link>
            <Link href={"/me"} className="mx-1">
              <CustomButton
                title="Profile"
                btnType="button"
                containerStyles="text-primary-white mt-1 rounded-full bg-white min-w-[120px]"
              />
            </Link>
            <CustomButton
              handleClick={logoutHandler}
              title="Log out"
              btnType="button"
              containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
            />
          </div>
        ) : (
          <>
            {pathname !== "/signin" ? (
              <>
                <Link href={"/signin"}>
                  <CustomButton
                    title="Sign In"
                    btnType="button"
                    containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
                  />
                </Link>
              </>
            ) : (
              <>
                <Link href={"/signup"}>
                  <CustomButton
                    title="Sign Up"
                    btnType="button"
                    containerStyles="text-primary-blue rounded-full bg-white min-w-[130px] "
                  />
                </Link>
              </>
            )}
          </>
        )}
      </nav>
    </header>
  );
}
