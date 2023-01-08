import React from "react";
import { Card } from "flowbite-react";

// images & icons
import profile from "../../assets/icons/profile.svg";
import email from "../../assets/icons/email.svg";
import phone from "../../assets/icons/phone.svg";
import location from "../../assets/icons/location.svg";
import blankProfile from "../../assets/images/blank-profile.png";

const CardProfile = ({ user, show, close }) => {
    return (
        <div className="py-28 max-w-screen-md mx-auto">
            <Card>
                <div className="flex justify-between items-start px-8 py-5">
                    <div>
                        <h1 className="text-xl font-medium mb-6">
                            Personal Information
                        </h1>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-5">
                                <img src={profile} alt="" className="w-7" />

                                <div className="flex flex-col">
                                    <h3 className="text-sm font-medium">
                                        {user?.fullname}
                                    </h3>
                                    <p className="text-xs font-medium text-slate-600">
                                        Full Name
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-5">
                                <img src={email} alt="" className="w-7" />

                                <div className="flex flex-col">
                                    <h3 className="text-sm font-medium">
                                        {user?.email}
                                    </h3>
                                    <p className="text-xs font-medium text-slate-600">
                                        Email
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-5">
                                <img src={phone} alt="" className="w-7" />

                                <div className="flex flex-col">
                                    <h3 className="text-sm font-medium">
                                        {user?.phone}
                                    </h3>
                                    <p className="text-xs font-medium text-slate-600">
                                        Phone
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-5">
                                <img src={location} alt="" className="w-7" />

                                <div className="flex flex-col">
                                    <h3 className="text-sm font-medium">
                                        {user?.address}
                                    </h3>
                                    <p className="text-xs font-medium text-slate-600">
                                        Address
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-md overflow-hidden">
                        {user?.avatar == "" ? (
                            <img src={blankProfile} alt="" className="w-44 " />
                        ) : (
                            <img src={user?.avatar} alt="" className="w-44 " />
                        )}
                        <div className="w-full flex justify-end mt-3">
                            <button
                                onClick={show}
                                className="w-full px-4 py-2 bg-amber-400 text-white font-medium rounded-md text-sm"
                            >
                                Change picture
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default CardProfile;
