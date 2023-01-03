import React from "react";
import { Card } from "flowbite-react";

// image & icons
import brandDark from "../../assets/icons/brand-icon-black.svg";
import { StatusWaiting, StatusApprove, StatusPending } from "../atomic/Status";
import recipe from "../../assets/images/recipe.png";
import { FormatRupiah } from "@arismun/format-rupiah";

const CardPayment = ({ status, price }) => {
    const statusComponent = () => {
        if (status === "waiting") {
            return <StatusWaiting />;
        }
        if (status === "success") {
            return <StatusApprove />;
        }
        if (status === "pending") {
            return <StatusPending />;
        }
    };

    return (
        <Card className="max-w-sm md:max-w-2xl lg:max-w-5xl">
            <div className="w-full flex justify-between items-center">
                <img src={brandDark} alt="" className="w-36" />

                <div className="flex flex-col items-end justify-center">
                    <h3 className="text-lg font-semibold">Booking</h3>
                    <h3 className="text-xs text-slate-600">
                        Wednesday, 28 December 2022
                    </h3>
                </div>
            </div>

            <div className="flex justify-evenly items-start mt-5 gap-5">
                <div className="flex flex-col items-start gap-1s">
                    <h3 className="text-base font-semibold text-slate-800">
                        4D/3N Overland Jakarta
                    </h3>
                    <p className="mb-7 text-xs text-amber-500 font-semibold">
                        Indonesia
                    </p>
                    {statusComponent()}
                </div>

                <div className="flex flex-col items-start gap-1s">
                    <div>
                        <h3 className="text-sm font-medium text-slate-800">
                            Date Trip
                        </h3>
                        <p className="mb-7 text-xs text-slate-600">
                            6 December 2022
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-slate-800">
                            Accomodation
                        </h3>
                        <p className="text-xs text-slate-600">Hotel 4 night </p>
                    </div>
                </div>

                <div className="flex flex-col items-start gap-1s">
                    <div>
                        <h3 className="text-sm font-medium text-slate-800">
                            Duration
                        </h3>
                        <p className="mb-7 text-xs text-slate-600">
                            5 Day 6 Night
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-slate-800">
                            Transportation
                        </h3>
                        <p className="text-xs text-slate-600">Roket Nasa</p>
                    </div>
                </div>

                {/* <div class="flex items-center justify-center w-48">
                    <label
                        for="dropzone-file"
                        class="flex flex-col items-center justify-center p-5 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                        <div class="flex flex-col items-center justify-center text-center pt-5 pb-6">
                            <svg
                                aria-hidden="true"
                                class="w-10 h-10 mb-3 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                ></path>
                            </svg>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span class="font-semibold">
                                    Click to upload
                                </span>{" "}
                                or drag and drop
                            </p>
                        </div>
                        <input id="dropzone-file" type="file" class="hidden" />
                    </label>
                </div> */}
            </div>

            <div>
                <div className="overflow-x-auto relative sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-5 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-2 px-6">
                                    No
                                </th>
                                <th scope="col" className="py-2 px-6">
                                    FullName
                                </th>
                                <th scope="col" className="py-2 px-6">
                                    Gender
                                </th>
                                <th scope="col" className="py-2 px-6">
                                    Phone
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row" className="py-4 px-6 text-sm">
                                    1
                                </th>
                                <td className="py-2 px-6 text-sm ">
                                    Rian Kristian
                                </td>
                                <td className="py-2 px-6 text-sm">random</td>
                                <td className="py-2 px-6 text-sm">0899</td>
                                <td className="py-2 px-6 text-sm font-semibold">
                                    QTY
                                </td>
                                <td className="py-2 px-6 text-sm">
                                    <span className="mr-4">:</span>3
                                </td>
                            </tr>
                            <tr>
                                <th
                                    scope="row"
                                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                ></th>
                                <td className="py-2 px-6"></td>
                                <td className="py-2 px-6"></td>
                                <td className="py-2 px-6"></td>
                                <td className="py-2 px-6 font-semibold text-amber-600">
                                    Total
                                </td>
                                <td className="py-4 px-6 text-amber-600 font-semibold">
                                    <span className="mr-4">:</span>
                                    <FormatRupiah value={price} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="w-full flex justify-end items-center">
                {status === "waiting" ? (
                    <button
                        // onClick={handleBuy}
                        className="px-5 py-2 rounded bg-amber-400 text-white text-sm font-semibold"
                    >
                        Pay Now
                    </button>
                ) : (
                    ""
                )}
            </div>
        </Card>
    );
};

export default CardPayment;
