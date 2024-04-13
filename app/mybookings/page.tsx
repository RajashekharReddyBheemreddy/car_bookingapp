"use client";
import { daysCalculator, generateCarImageUrl } from "@/utilis";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function MyBookings() {
  const [data, setData] = useState<any>();
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/api/bookings/mybookings");
      setData(res?.data?.booking);
    };
    getData();
  }, []);
  return (
    <div className="overflow-hidden">
      <div className="hero">
        <div className="flex-1 pt-36 padding-x">
          <h1 className="font-bold text-3xl text-center">My bookings</h1>
          {data?.length < 1 && (
            <h1 className="font-bold text-3xl my-4 text-center">
              You don't have any bookings
            </h1>
          )}
          {data ? (
            <div>
              {data.map((element: any, index: number) => (
                <Card sx={{ maxWidth: 1000 }} key={index} className="mx-10 my-2">
                  <div className="flex">
                    <CardMedia className="m-4">
                      <Image
                        src={generateCarImageUrl(element.car[0], "")}
                        alt="image"
                        width={150}
                        height={150}
                        priority
                        className="object-contain"
                      />
                    </CardMedia>
                    <CardContent className="flex">
                      <Typography margin={2} variant="h5" component="div">
                        Make: {element.car[0].make}
                      </Typography>
                      <Typography
                        margin={2}
                        variant="h6"
                        color="text.secondary"
                      >
                        Model: {element.car[0].model}
                      </Typography>
                      <Typography
                        margin={2}
                        variant="h6"
                        color="text.secondary"
                      >
                        Year: {element.car[0].year}
                      </Typography>
                    </CardContent>
                  </div>
                  <CardContent>
                    <p className="flex">
                      <span className="self-start text-[14px] mx-2 font-semibold">
                        Pick up: {element.start.slice(0, 10)} at {element.start.slice(11, element.start.length)}
                      </span>
                      <span className="self-start text-[14px] mx-2 font-semibold">
                        Return: {element.end.slice(0, 10)} by {element.end.slice(11, element.end.length)}
                      </span>
                    </p>
                    <p className="flex mt-2 text-[28px] font-extrabold">
                      <span className="self-start text-[14px] font-semibold">
                        $
                      </span>
                      {daysCalculator(
                        element.car[0].city_mpg,
                        element.car[0].year,
                        element.start,
                        element.end
                      )}
                      <span className="self-center text-[14px] font-medium mx-1">
                        total inc. taxes
                      </span>
                    </p>
                    <p className="text-[16px] font-medium">
                      Booking Refernce id: BA{element._id.slice(2, element._id.length)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <h1 className="text-bold my-5 text-2xl">Loading....</h1>
          )}
        </div>
      </div>
    </div>
  );
}
