import React, { useState } from "react";

// component
import { Button, TextInput } from "flowbite-react";

// const [search, setSearch] = useState();

// const handleChange = (e) => {
//     setSearch(e.target.value);
// };

// console.log(search);

const Hero = (handleChange, search) => {
    return (
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam.
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
                        />
                        <Button color="warning">Search</Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Hero;
