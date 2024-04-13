"use client";

import CustomButton from "@/components/CustomButton";
import { CarProps } from "@/types";
import { calculateCarRent, generateCarImageUrl, getDetails } from "@/utilis";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Booking() {
  const [carData, setCarData] = useState<CarProps>();
  const { id } = useParams();
  const year = id.slice(id.length - 4, id.length);
  const model = id.slice(1, id.length - 4);
  useEffect(() => {
    getDetails(year, model).then((res) => {
      let data: any = [];
      data.push(res[0])
      setCarData(data);
    });
  }, []);

  return (
    <div className="overflow-hidden">
      <div className="hero">
        <div className="flex-1 pt-36 padding-x">
          <h1 className="hero__title">Booking A Car</h1>
          {carData &&
            carData.map((element: CarProps, index: number) => (
              <div key={index}>
                <h2 className="car-card__content-title">
                  {element.make} {element.model}
                </h2>
                <p className="flex mt-6 text-[32px] font-extrabold">
                  <span className="self-start text-[14px] font-semibold">
                    $
                  </span>
                  {calculateCarRent(element.city_mpg, element.year)}
                  <span className="self-end text-[14px] font-medium">/day</span>
                </p>
                <div className="flex w-full h-80 my-3 object-contain">
                  <div className="col-span-6">
                    <Image
                      src={generateCarImageUrl(element, "")}
                      alt="image"
                      width={500}
                      height={500}
                      priority
                      className="object-contain"
                    />
                  </div>
                  <div className="col-span-4 ml-20">
                    <Image
                      src={generateCarImageUrl(element, "29")}
                      alt="car model"
                      width={160}
                      height={160}
                      priority
                      className="object-contain"
                    />
                    <Image
                      src={generateCarImageUrl(element, "33")}
                      alt="car model"
                      width={160}
                      height={160}
                      priority
                      className="object-contain"
                    />
                    <Image
                      src={generateCarImageUrl(element, "13")}
                      alt="car model"
                      width={160}
                      height={160}
                      priority
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="text-gray">
                  <div className="flex gap-2">
                    <Image
                      src={"/steering-wheel.svg"}
                      alt="steering wheel"
                      width={20}
                      height={20}
                    />
                    <p className="text-[14px]">
                      {element.transmission === "a" ? "Automatic" : "Manual"}
                    </p>
                  </div>
                  <div className="flex gap-2 my-5">
                    <Image
                      src={"/tire.svg"}
                      alt="trive"
                      width={20}
                      height={20}
                    />
                    <p className="text-[14px]">{element.drive.toUpperCase()}</p>
                  </div>
                  <div className="flex gap-2 mb-5">
                    <Image
                      src={"/gas.svg"}
                      alt="Mileage"
                      width={20}
                      height={20}
                    />
                    <p className="text-[14px]">{element.city_mpg} MPG</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-5 ">
                  {Object.entries(element).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between gap-5 w-full text-right"
                    >
                      <h4 className="text-gray capitalize">
                        {key.split("-").join(" ")}
                      </h4>
                      <p className="text-black-100 font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="my-5 flex justify-center">
                  <Link href={`/reserve/${model}${year}`}>
                    <CustomButton
                      title="Reserve Now"
                      containerStyles="w-40 py-[16px] rounded-full bg-primary-blue"
                      textStyles="text-white text-[14px] loading-[17px] font-bold"
                    />
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
