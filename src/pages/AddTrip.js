import React, { useEffect, useState } from "react";
import {
    TextInput,
    Label,
    Select,
    Button,
    FileInput,
    Spinner,
    Alert,
} from "flowbite-react";
import { API } from "../config/api";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

// firebase
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const AddTrip = () => {
    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    const [progress, setProgress] = useState();

    const handleChangeImage = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setImages((prevState) => [...prevState, newImage]);
        }
    };

    const handleUpload = () => {
        if (images.length === 0) return;
        setProgress(
            <div className="flex items-center gap-3 my-3">
                <Spinner color="success" aria-label="Success spinner example" />
                <span>Uploading...</span>
            </div>
        );
        images.map((image) => {
            const imageRef = ref(storage, `images/${image.name + v4()}`);

            uploadBytes(imageRef, image).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((urls) => {
                    setUrls((prevState) => [...prevState, { image: urls }]);
                });
                setProgress(
                    <Alert color="success" className="mt-2">
                        <span>Upload Finish</span>
                    </Alert>
                );
            });
        });
        setImages([]);
    };

    console.log("images: ", images);
    console.log(urls);

    const navigate = useNavigate();
    const [country, setCountry] = useState();
    const [countryId, setCountryId] = useState();
    const [form, setForm] = useState({
        title: "",
        accomodation: "",
        transportation: "",
        eat: "",
        day: "",
        night: "",
        date: "",
        price: "",
        quota: "",
        description: "",
        image: "",
    });

    const getCountry = async () => {
        try {
            const response = await API.get("/countries");
            setCountry(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCountry();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
            // e.target.type === "file" ? e.target.files : e.target.value,
        });
    };

    const handleChangeCountry = (e) => {
        setCountryId(e.target.value);
    };

    // console.log(country);

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const config = {
                Headers: {
                    "Content-type": "multipart/form-data",
                },
            };

            const formData = new FormData();
            formData.set("title", form.title);
            formData.set("country_id", countryId);
            formData.set("transportation", form.transportation);
            formData.set("eat", form.eat);
            formData.set("dat", form.day);
            formData.set("night", form.night);
            formData.set("date", form.date);
            formData.set("price", form.price);
            formData.set("quota", form.quota);
            formData.set("description", form.description);
            // formData.set("image", form.image[0]);

            const response = await API.post("/trip", formData, config);
            console.log(response);

            navigate("/admin");
        } catch (error) {
            console.log(error);
        }
    });

    return (
        <div className=" bg-slate-200">
            <div className="max-w-screen-md mx-auto pt-28 pb-24">
                <form
                    onSubmit={(e) => handleSubmit.mutate(e)}
                    className="flex flex-col gap-4 px-5 py-6 bg-white rounded-md"
                >
                    <h1 className="text-xl font-semibold mb-3">Add Trips</h1>
                    {/* trip */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="trip" value="Input Trip" />
                        </div>
                        <TextInput
                            id="trip"
                            name="title"
                            type="text"
                            onChange={handleChange}
                            // required={true}
                        />
                    </div>
                    {/* trip */}
                    {/* country */}
                    <div id="select">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="countries"
                                value="Select your country"
                            />
                        </div>
                        <Select
                            id="countries"
                            name="countries"
                            onChange={handleChangeCountry}
                            // required={true}
                        >
                            <option>--SELECT COUNTRY--</option>
                            {country?.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </Select>
                    </div>
                    {/* country */}
                    {/* accomodation */}
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="accomodation"
                                value="Input accomodation"
                            />
                        </div>
                        <TextInput
                            id="accomodation"
                            name="accomodation"
                            type="text"
                            onChange={handleChange}
                            // required={true}
                        />
                    </div>
                    {/* accomodation */}
                    {/* transportation */}
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="transportation"
                                value="Input transportation"
                            />
                        </div>
                        <TextInput
                            id="transportation"
                            name="transportation"
                            type="text"
                            onChange={handleChange}
                            // required={true}
                        />
                    </div>
                    {/* transportation */}
                    {/* eat */}
                    <div id="select">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="countries"
                                value="Select your eat"
                            />
                        </div>
                        <Select
                            id="countries"
                            name="countries"
                            onChange={handleChange}
                            // required={true}
                        >
                            <option>Include</option>
                            <option>Not Include</option>
                            <option>Bawa makan sendiri</option>
                        </Select>
                    </div>
                    {/* eat */}
                    {/* duration */}
                    <div>
                        <Label value="Duration" />
                        <div className="flex items-center gap-4 mt-3">
                            <div className="flex flex-row-reverse items-center gap-3">
                                <div className="mb-2 block">
                                    <Label htmlFor="Day" value="Day" />
                                </div>
                                <TextInput
                                    id="Day"
                                    name="day"
                                    type="text"
                                    onChange={handleChange}
                                    // required={true}
                                />
                            </div>

                            <div className="flex flex-row-reverse items-center gap-3">
                                <div className="mb-2 block">
                                    <Label htmlFor="Night" value="Night" />
                                </div>
                                <TextInput
                                    id="Night"
                                    name="night"
                                    type="text"
                                    onChange={handleChange}
                                    // required={true}
                                />
                            </div>
                        </div>
                    </div>
                    {/* duration */}
                    {/* Date */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="Date" value="Date" />
                        </div>
                        <TextInput
                            id="Date"
                            name="date"
                            type="date"
                            onChange={handleChange}
                            // required={true}
                        />
                    </div>
                    {/* Date */}
                    {/* price */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="price" value="price" />
                        </div>
                        <TextInput
                            id="price"
                            name="price"
                            type="number"
                            onChange={handleChange}
                            // required={true}
                        />
                    </div>
                    {/* price */}
                    {/* quota */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="quota" value="quota" />
                        </div>
                        <TextInput
                            name="quota"
                            type="number"
                            onChange={handleChange}
                            // required={true}
                        />
                    </div>
                    {/* quota */}
                    {/* description */}
                    <div>
                        <label
                            for="message"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Description
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows="4"
                            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write description"
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    {/* description */}
                    {/* image */}
                    <div id="fileUpload">
                        <div className="mb-2 block">
                            <Label htmlFor="file" value="Upload file" />
                        </div>
                        <FileInput
                            id="file"
                            name="image"
                            onChange={handleChangeImage}
                            // helperText="A profile picture is useful to confirm your are logged into your account"
                        />
                        {progress}
                        <div className="mt-2">
                            <button
                                type="button"
                                onClick={handleUpload}
                                className="px-5 py-2 rounded-md bg-blue-500 text-white font-medium text-sm"
                            >
                                Upload
                            </button>
                        </div>

                        <div className="flex items-center gap-3 mt-3">
                            {urls.map((item) => (
                                <div className="w-28 h-28">
                                    <img
                                        key={item.id}
                                        src={item.image}
                                        alt="gambar"
                                        className="w-full h-full object-fill"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* {image} */}
                    <Button className="mt-5" type="submit">
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AddTrip;
