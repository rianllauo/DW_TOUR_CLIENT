import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { TextInput, Button } from "flowbite-react";

// components
import Hero from "../components/molekul/Hero";
import CardHome from "../components/card/CardHome";
import TourCard from "../components/card/TourCard";

// image & icon
import guarantee from "../assets/icons/guarantee.svg";
import heart from "../assets/icons/heart.svg";
import agent from "../assets/icons/agent.svg";
import support from "../assets/icons/support.svg";
import london from "../assets/images/london.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    // const { data: trips } = useQuery("CacheTrips", async () => {
    //     const response = await API.get("/trips");
    //     return response.data.data;
    // });

    let [trips, setTrips] = useState([]);

    const Fetch = async () => {
        const response = await API.get("/trips");
        setTrips(response.data.data);
    };

    useEffect(() => {
        Fetch();
    }, []);

    // search function
    const [state, setState] = useState(null);

    const handleChange = (e) => {
        const results = trips.filter((trip) => {
            if (e.target.value === "") return trips;
            return trip.name
                .toLowerCase()
                .includes(e.target.value.toLowerCase());
        });
        setState({
            query: e.target.value,
            list: results,
        });
    };

    console.log(state);

    return (
        <div className="bg-slate-100  dark:bg-gray-900 transition duration-300">
            <div className="header w-full h-screen dark:header-dark flex items-center justify-center transition duration-300">
                <div className="max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg px-5 mx-auto flex flex-col items-center justify-center w-full h-full">
                    <div className="mb-10 text-start">
                        <h1 className="text-3xl text-white font-semibold md:text-5xl">
                            Explore{" "}
                        </h1>
                        <h1 className="text-3xl text-white font-semibold md:text-5xl">
                            Your amazing city together
                        </h1>

                        <p className="mt-5 md:w-3/4 text-sm text-slate-300">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam.
                        </p>
                    </div>

                    <div className="w-full">
                        <form className="w-full md:w-3/4 flex items-center justify-start gap-3">
                            <TextInput
                                id="email1"
                                type="email"
                                placeholder="Search trips"
                                required={true}
                                className="w-full"
                                onChange={handleChange}
                                // value={state}
                            />
                        </form>
                    </div>
                </div>
            </div>

            <div className="max-w-screen-lg mx-auto px-5 py-5">
                <div className="mt-14 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 self-center gap-4">
                    <CardHome
                        image={guarantee}
                        title="Best Price Guarantee"
                        subtitle="A small river named Duren flows by their place and supplies"
                    />
                    <CardHome
                        image={heart}
                        title="Travellers Love Us"
                        subtitle="A small river named Duren flows by their place and supplies"
                    />
                    <CardHome
                        image={agent}
                        title="Best Travel Agent"
                        subtitle="A small river named Duren flows by their place and supplies"
                    />
                    <CardHome
                        image={support}
                        title="Our Dedicated Support"
                        subtitle="A small river named Duren flows by their place and supplies"
                    />
                </div>

                <div className="mt-12 text-center flex flex-col gap-3 mb-5">
                    <h3 className="text-amber-400 font-semibold">
                        Uncover Place
                    </h3>
                    <h1 className="text-2xl md:text-4xl font-semibold text-slate-800 dark:text-white">
                        Discover Our Trips
                    </h1>
                    <p className="text-slate-600 text-sm  md:w-3/4 mx-auto dark:text-slate-400">
                        Fusce hic augue velit wisi quibusdam pariatur, iusto
                        primis, nec nemo, rutrum. Vestibulum cumque laudantium.
                        Sit ornare mollitia tenetur, aptent.
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 items-center mt-8">
                        {state === null
                            ? trips.map((trip) => (
                                  <TourCard
                                      key={trip.id}
                                      image={trip.image}
                                      title={trip.name}
                                      country={trip.country.name}
                                      price={trip.price}
                                      index={trip.id}
                                      quota={trip.quota}
                                  />
                              ))
                            : state.list?.map((trip) => (
                                  <TourCard
                                      key={trip.id}
                                      image={trip.image}
                                      title={trip.name}
                                      country={trip.country.name}
                                      price={trip.price}
                                      index={trip.id}
                                      quota={trip.quota}
                                  />
                              ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
