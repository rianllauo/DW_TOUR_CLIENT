import React, { useEffect, useState } from "react";
import { Button, Carousel } from "flowbite-react";
import { useQuery } from "react-query";
import { API } from "../config/api";

import australia from "../assets/images/australia.jpg";

// image & icon
import hotel from "../assets/icons/hotel.svg";
import plane from "../assets/icons/plane.svg";
import meal from "../assets/icons/meal.svg";
import time from "../assets/icons/time.svg";
import calendar from "../assets/icons/calendar.svg";
import { Link, useParams } from "react-router-dom";
import { FormatRupiah } from "@arismun/format-rupiah";

const DetailTrip = ({
    dataTrip,
    increment,
    decrement,
    totalPrice,
    setPrice,
    setTotalPrice,
    person,
    price,
}) => {
    const params = useParams();
    // const [data, setTrip] = useState([]);

    // const [trip, setTrip] = useState({});
    // const country = trip.country;
    // console.log(id);

    // console.log(data);

    // const detailFetch = async () => {
    //     const response = await API.get(`/trip/${params.id}`);
    //     setTrip(response.data.data);
    // };

    useEffect(() => {
        dataTrip.map((item) => {
            if (item.id == params.id) {
                return (
                    setPrice(item.price), setTotalPrice(item.price)
                    // setTrip(item)
                    // setPerson(1)
                );
            }
        });
        // detailFetch();
    }, []);

    // useEffect(() => {
    //     detailFetch();
    // }, []);

    // const [person, setPerson] = useState(1);
    // const price = trip?.price;
    // const [totalPrice, setTotalPrice] = useState();

    // useEffect(() => {
    //     setTotalPrice(price);
    // }, [price]);

    // // penambahan user & total price
    // const increment = () => {
    //     setPerson(person + 1);
    //     setTotalPrice(totalPrice + price);
    // };

    // const decrement = () => {
    //     if (person > 1) {
    //         setPerson(person - 1);
    //         setTotalPrice(totalPrice - price);
    //     }
    // };

    return (
        <div className="bg-slate-100 dark:bg-gray-900 w-full h-full">
            {dataTrip?.map((item) => {
                if (item.id == params.id) {
                    return (
                        <div className="pt-24 pb-16 px-5 max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto">
                            <div className="">
                                <h1 className="text-2xl font-semibold dark:text-slate-200">
                                    {item?.name}
                                </h1>
                                <p className="text-base dark:text-slate-400">
                                    {item.country.name}
                                </p>

                                <div className="w-full h-[330px] mt-5 rounded-md overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className=" mt-3 h-[200px] sm:h-[100px] xl:h-[320px] 2xl:h-[320px]">
                                    <Carousel
                                        leftControl=" "
                                        rightControl=" "
                                        draggable="false"
                                    >
                                        <div className="flex gap-3">
                                            <div>
                                                <img
                                                    src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
                                                    alt="..."
                                                />
                                            </div>
                                            <div>
                                                <img
                                                    src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
                                                    alt="..."
                                                />
                                            </div>
                                            <div>
                                                <img
                                                    src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
                                                    alt="..."
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <div>
                                                <img
                                                    src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
                                                    alt="..."
                                                />
                                            </div>
                                            <div>
                                                <img
                                                    src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
                                                    alt="..."
                                                />
                                            </div>
                                            <div>
                                                <img
                                                    src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
                                                    alt="..."
                                                />
                                            </div>
                                        </div>
                                    </Carousel>
                                </div>

                                <div className="mt-5">
                                    <h1 className="text-2xl font-semibold dark:text-slate-200">
                                        Information item
                                    </h1>

                                    <div className="w-full grid grid-cols-2 mt-5 gap-5 md:grid-cols-4 lg:grid-cols-5 dark:text-slate-200">
                                        <div>
                                            <h3 className="text-base font-semibold">
                                                Accomodation
                                            </h3>
                                            <div className="flex mt-2 gap-3 items-center w-full">
                                                <img src={hotel} alt="" />
                                                <h3 className="text-sm dark:text-slate-400">
                                                    {item.accomodation}
                                                </h3>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-base font-semibold">
                                                Transportation
                                            </h3>
                                            <div className="flex mt-2 gap-3 items-center  w-full">
                                                <img src={plane} alt="" />
                                                <h3 className="text-sm dark:text-slate-400">
                                                    {item.transportation}
                                                </h3>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-base font-semibold">
                                                Eat
                                            </h3>
                                            <div className="flex mt-2 gap-3 items-center  w-full">
                                                <img src={meal} alt="" />
                                                <h3 className="text-sm dark:text-slate-400">
                                                    {item.eat}
                                                </h3>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-base font-semibold">
                                                Duration
                                            </h3>
                                            <div className="flex mt-2 gap-3 items-center  w-full">
                                                <img src={time} alt="" />
                                                <h3 className="text-sm dark:text-slate-400">
                                                    {item.day} Day {item.night}{" "}
                                                    Night
                                                </h3>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-base font-semibold">
                                                Date Trip
                                            </h3>
                                            <div className="flex mt-2 gap-3 items-center  w-full">
                                                <img src={calendar} alt="" />
                                                <h3 className="text-sm dark:text-slate-400">
                                                    {item.date_trip}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>

                                    {/* description */}
                                    <div className="mt-5">
                                        <h3 className="text-lg font-semibold dark:text-slate-200">
                                            Description
                                        </h3>
                                        <p className="mt-3 text-sm dark:text-slate-400">
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* payment */}
                                    <div>
                                        <div className="w-full flex justify-between items-center mt-5">
                                            <p className="text-lg font-bold text-amber-400">
                                                <FormatRupiah value={price} /> /
                                                Person
                                            </p>
                                            <div className="flex items-center justify-center gap-3">
                                                <Button
                                                    onClick={decrement}
                                                    className="p-0"
                                                    color="warning"
                                                >
                                                    -
                                                </Button>
                                                <p className="dark:text-slate-200 font-medium">
                                                    {person}
                                                </p>

                                                <Button
                                                    onClick={increment}
                                                    className="p-0"
                                                    color="warning"
                                                >
                                                    +
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mt-8 text-xl">
                                            <p className="font-semibold dark:text-slate-200">
                                                Total:{" "}
                                            </p>
                                            <p className="font-bold text-amber-400">
                                                <FormatRupiah
                                                    value={totalPrice}
                                                />
                                            </p>
                                        </div>

                                        <div className="w-full flex justify-end mt-5">
                                            <Link to={`/payment/${item.id}`}>
                                                <button className="px-4 py-2 bg-amber-400 text-white text-sm font-semibold rounded-md">
                                                    Pay Now
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default DetailTrip;
