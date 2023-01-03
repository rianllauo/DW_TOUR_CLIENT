import React, { useEffect, useState } from "react";
import TourCard from "../components/card/TourCard";
import { Modal, Button, Label, TextInput, Tabs, Card } from "flowbite-react";
import { API } from "../config/api";

import london from "../assets/images/london.jpg";
import { Link, useNavigate } from "react-router-dom";

const AdminTrip = () => {
    const navigate = useNavigate();
    const [trip, setTrip] = useState([]);
    const [countries, setCountries] = useState([]);
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [idEdit, setIdEdit] = useState();

    const handleClose = () => {
        setShow(false);
    };
    const handleCloseEdit = () => {
        setShowEdit(false);
    };

    const fetchTrip = async () => {
        const response = await API.get("/trips");
        setTrip(response.data.data);
    };

    useEffect(() => {
        fetchTrip();
    }, []);

    const fetchCountries = async () => {
        const response = await API.get("/countries");
        setCountries(response.data.data);
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    // add country
    const [country, setCountry] = useState();

    const handleChange = (e) => {
        setCountry(e.target.value);
    };

    const addCountry = async (e) => {
        e.preventDefault();
        const response = await API.post("/country", {
            name: country,
        });
        console.log(response);
        // setTrip(response.data.data);
    };

    // delete country
    const deleteCountry = async (e, id) => {
        e.preventDefault();
        const response = await API.delete("/country/" + id);
        console.log(response);
        navigate(0);
        // setTrip(response.data.data);
    };

    // edit country
    const [countryEdit, setCountryEdit] = useState();

    const handleEdit = (id) => {
        setShowEdit(true);
        setIdEdit(id);
        // console.log(id);
    };

    const handleChangeEdit = (e) => {
        setCountryEdit(e.target.value);
    };

    console.log(idEdit);

    const editCountry = async (e) => {
        e.preventDefault();
        const response = await API.patch("/country/" + idEdit, {
            name: countryEdit,
        });
        console.log(response);
        console.log(idEdit);
        navigate(0);
    };

    return (
        <div className="w-full h-full bg-slate-100 pt-28 pb-24">
            <div className="max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto ">
                <div className="w-full flex justify-between">
                    <h1 className="text-xl text-slate-800 font-semibold">
                        Admin Dashboard
                    </h1>
                    <div className="flex flex-row-reverse gap-3 items-end">
                        <Link to={"/add-trip"}>
                            <button className="py-2 px-5 rounded-md bg-amber-400 text-white text-sm font-semibold">
                                Create Trip
                            </button>
                        </Link>
                        <button
                            onClick={() => setShow(true)}
                            className="py-2 px-5 rounded-md bg-indigo-600 text-white text-sm font-semibold"
                        >
                            Create Country
                        </button>
                    </div>
                </div>

                {/* create country modal */}
                <Modal show={show} size="md" onClose={handleClose}>
                    <Modal.Header>Add New Country</Modal.Header>
                    <Modal.Body>
                        <form
                            className="flex flex-col gap-4"
                            onSubmit={addCountry}
                        >
                            <div className="mb-5">
                                <div className="mb-2 block">
                                    <Label htmlFor="country" value="country" />
                                </div>
                                <TextInput
                                    id="country"
                                    type="text"
                                    placeholder="Etc.. Indonesia, Belanda"
                                    required={true}
                                    onChange={handleChange}
                                />
                            </div>

                            <Button type="submit">Submit</Button>
                        </form>
                    </Modal.Body>
                </Modal>
                {/* create country modal */}

                <div className="w-full mt-12 flex flex-wrap justify-center items-center gap-4">
                    <Tabs.Group aria-label="Tabs with icons" style="underline">
                        <Tabs.Item
                            active={true}
                            title="List Trip"
                            className="w-full"
                        >
                            <div className="w-full flex flex-wrap items-center gap-3 ">
                                {trip.map((item) => (
                                    <TourCard
                                        key={item.id}
                                        image={item.image}
                                        title={item.name}
                                        country={item.country.name}
                                        price={item.price}
                                        index={item.id}
                                        quota={item.quota}
                                    />
                                ))}
                            </div>
                        </Tabs.Item>
                        <Tabs.Item title="List Country">
                            <div className="w-[768px] flex flex-col gap-5 overflow-x-scroll">
                                {countries.map((item, index) => (
                                    <Card>
                                        <div className="w-full flex justify-between items-center">
                                            <h2 className="text-base font-medium">
                                                {item.name}
                                            </h2>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() =>
                                                        handleEdit(item.id)
                                                    }
                                                    className="px-5 py-2 rounded-md bg-amber-300 text-white font-medium text-sm"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={(e) =>
                                                        deleteCountry(
                                                            e,
                                                            item.id
                                                        )
                                                    }
                                                    className="px-5 py-2 rounded-md bg-rose-600 text-white font-medium text-sm"
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </div>

                                        {/* edit country modal */}
                                        <Modal
                                            show={showEdit}
                                            size="md"
                                            onClose={handleCloseEdit}
                                        >
                                            <Modal.Header>
                                                Edit Country
                                            </Modal.Header>
                                            <Modal.Body>
                                                <form
                                                    className="flex flex-col gap-4"
                                                    onSubmit={(e) =>
                                                        editCountry(e, item.id)
                                                    }
                                                >
                                                    <div className="mb-5">
                                                        <div className="mb-2 block">
                                                            <Label
                                                                htmlFor="country"
                                                                value="country"
                                                            />
                                                        </div>
                                                        <TextInput
                                                            id="country"
                                                            type="text"
                                                            placeholder="Etc.. Indonesia, Belanda"
                                                            required={true}
                                                            onChange={
                                                                handleChangeEdit
                                                            }
                                                        />
                                                    </div>

                                                    <Button type="submit">
                                                        Submit
                                                    </Button>
                                                </form>
                                            </Modal.Body>
                                        </Modal>
                                        {/* edit country modal */}
                                    </Card>
                                ))}
                                {/* {waiting.map((item) => (
                                    <CardTransaction item={item} />
                                ))} */}
                            </div>
                        </Tabs.Item>
                    </Tabs.Group>
                </div>
            </div>
        </div>
    );
};

export default AdminTrip;
