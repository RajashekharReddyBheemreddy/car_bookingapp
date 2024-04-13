"use client";
import CustomButton from "@/components/CustomButton";
import { CarProps } from "@/types";
import { compareDates, generateCarImageUrl, getDetails } from "@/utilis";
import { DatePicker } from "antd";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Image from "next/image";
export default function Reserve() {
  const router = useRouter();
  const [carData, setCarData] = useState<CarProps>();
  const { id } = useParams();
  const year = id.slice(id.length - 4, id.length);
  const model = id.slice(1, id.length - 4);
  let emailId: any;
  if (typeof window !== undefined) {
    try {
      const getEmail = localStorage?.getItem("email") || "";
      emailId = JSON.parse(getEmail);
    } catch (error) {
      console.log('Fetching data')
    }
  }

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: emailId,
    number: "",
    start: "",
    end: "",
    car: "",
  });
  useEffect(() => {
    getDetails(year, model).then((res) => {
      let data: any = [];
      data.push(res[0]);
      setCarData(data);
      setUser({ ...user, car: data });
    });
  }, []);
  const compare = compareDates(user?.start, user?.end);
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (compare) {
      try {
        await axios.post("/api/bookings/reservations", user);
        toast.success("Booking successful");
        router.push("/mybookings");
      } catch (error: any) {
        toast.error(error.message);
      }
    } else {
      toast.error("Please enter dates correctly");
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="overflow-hidden">
        <div className="hero">
          <div className="flex-1 pt-36 padding-x">
            <h1 className="font-bold text-3xl">Review & Reserve</h1>
            {carData &&
              carData?.map((element: CarProps, index: number) => (
                <div key={index}>
                  <Card
                    sx={{ maxWidth: 800 }}
                    className="flex justify-around items-center mt-2"
                  >
                    <Image
                      src={generateCarImageUrl(element, "")}
                      alt="image"
                      width={120}
                      height={120}
                      priority
                      className="object-contain"
                    />
                    <Typography variant="h5" component="div">
                      {element.make}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {element.model}
                    </Typography>
                  </Card>
                </div>
              ))}
            <h2 className="font-semibold text-xl mx-4 my-4">Contact Details</h2>
            <div className="sm:flex">
              <div className="flex flex-col m-4">
                <label
                  htmlFor="name"
                  className="block text-md font-medium my-2 ml-2 text-gray-900 "
                >
                  First Name
                </label>
                <input
                  value={user.firstname}
                  onChange={(e) =>
                    setUser({ ...user, firstname: e.target.value })
                  }
                  type="text"
                  className="w-50 max-w-xs rounded-md py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 "
                  placeholder="First Name"
                />
              </div>
              <div className="flex flex-col m-4">
                <label
                  htmlFor="name"
                  className="block text-md font-medium my-2 ml-2 text-gray-900"
                >
                  Last Name
                </label>
                <input
                  value={user.lastname}
                  onChange={(e) =>
                    setUser({ ...user, lastname: e.target.value })
                  }
                  type="text"
                  className="w-50 rounded-md max-w-xs py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="flex flex-col m-4">
              <label
                htmlFor="email"
                className="block text-md font-medium my-2 ml-1 text-gray-900"
              >
                Email
              </label>
              <input
                value={user.email}
                readOnly
                type="email"
                className="w-50 rounded-md max-w-xs py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                placeholder="Email"
              />
            </div>
            <div className="flex flex-col m-4">
              <label
                htmlFor="number"
                className="block text-md font-medium my-2 ml-1 text-gray-900"
              >
                Number
              </label>
              <input
                value={user.number}
                onChange={(e) => setUser({ ...user, number: e.target.value })}
                type="number"
                className="w-50 rounded-md max-w-xs py-1.5 pl-2 pr-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                placeholder="Phone number"
              />
            </div>
            <div className="my-5">
             <p className="mx-5">Timings</p>
              <div className="sm:flex mx-5">
                <DatePicker
                  showTime
                  onOk={(value) =>
                    setUser({
                      ...user,
                      start: value?.format("YYYY-MM-DDTHH:mm"),
                    })
                  }
                  placeholder="Pick up Time & Date"
                  className="mt-2 mr-4 -ml-1 py-2 pl-2 pr-1"
                />
                <DatePicker
                  showTime
                  placeholder="Return Time & Date"
                  onOk={(value) =>
                    setUser({ ...user, end: value?.format("YYYY-MM-DDTHH:mm") })
                  }
                  className="mt-2 sm:mx-4 py-2 pl-2 pr-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomButton
        btnType="submit"
        title="Book now"
        containerStyles="bg-primary-blue text-white rounded-full mt-4 ml-10 sm:ml-48"
      />
    </form>
  );
}
