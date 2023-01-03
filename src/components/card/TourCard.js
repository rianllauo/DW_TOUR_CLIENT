import React from "react";
import { FormatRupiah } from "@arismun/format-rupiah";

// import { Button, Card } from 'flowbite-react'
import { Link } from "react-router-dom";

const TourCard = ({ index, image, title, country, price, quota }) => {
    return (
        <div className="relative w-[250px] shadow-xl rounded-md overflow-hidden">
            <img
                src={image}
                alt=""
                className="w-[250px] h-[220px] object-cover shadow-lg"
            />

            <div className="absolute top-8 left-0 py-1.5 pl-3 pr-8 bg-indigo-800 rounded rounded-l-none">
                <p className="text-sm text-white font-medium">
                    Quota : {quota}
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-md bottom-4 left-3 right-3 py-3 px-4 flex flex-col items-start justify-start gap-1">
                <Link to={"/detail-trip/" + index}>
                    <h1 className="text-base text-left font-semibold dark:text-slate-200">
                        {title}
                    </h1>
                </Link>
                <p className="text-sm text-left text-slate-600 font-medium dark:text-slate-400">
                    {country}
                </p>

                <div className="w-full mt-3 flex flex-row items-center justify-between">
                    <p className="text-sm text-yellow-400 font-semibold text-left">
                        <FormatRupiah value={price} />{" "}
                        <span className="text-black dark:text-slate-300">
                            {" "}
                            / Person
                        </span>
                    </p>
                </div>
                {/* <div className="flex w-full mt-3">
                    <Link to={"/detail-trip/" + index}>
                        <button className="px-3 py-1 bg-amber-500 rounded-md text-white">
                            Book
                        </button>
                    </Link>
                </div> */}
            </div>
        </div>
    );
};

export default TourCard;
