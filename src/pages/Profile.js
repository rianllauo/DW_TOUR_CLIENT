import React, { useState, useEffect } from "react";

// component
import { Alert, Modal } from "flowbite-react";
import CardProfile from "../components/card/CardProfile";
import { API } from "../config/api";

// firebase
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const userId = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState();

    // fecth user
    const userFetch = async () => {
        const response = await API.get(`/user/${userId.id}`);
        setUser(response.data.data);
    };

    useEffect(() => {
        userFetch();
    }, []);

    // modal upload profile image
    const [show, setShow] = useState();

    const handleShow = () => {
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
    };

    // update profile image
    const [imageUpload, setImageUpload] = useState(null);
    const [alert, setAlert] = useState();
    const [img, setImg] = useState();
    const [userImage, setUserImage] = useState({
        avatar: null,
    });

    const uploadImage = () => {
        if (imageUpload == null) return;

        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            setAlert(
                <Alert color="success">
                    <span>
                        <span className="font-medium">Success</span> Upload
                        Image
                    </span>
                </Alert>
            );
            getDownloadURL(snapshot.ref).then((url) => {
                setImg(url);
            });
        });
    };

    useEffect(() => {
        setUserImage({
            ...userImage,
            avatar: img,
        });
    }, [img]);

    const handleSumbit = async (e) => {
        e.preventDefault();

        // uploadImage();

        const config = {
            Headers: {
                "Content-type": "multipart/form-data",
            },
        };

        const body = userImage;

        const response = await API.patch(`/user/${userId.id}`, body, config);
        console.log(response);
        navigate(0);
    };

    console.log(userImage);

    const handleChangeImage = (e) => {
        setImageUpload(e.target.files[0]);
    };

    return (
        <>
            <div className="w-full h-full bg-slate-100">
                <CardProfile
                    user={user}
                    show={handleShow}
                    close={handleClose}
                />
            </div>

            <Modal show={show} size="sm" onClose={handleClose}>
                <Modal.Header>Upload Image</Modal.Header>
                <Modal.Body>
                    {alert}
                    <button
                        onClick={uploadImage}
                        className="ml-3 mt-3 px-5 py-1.5 rounded-md bg-blue-600 text-white font-medium text-sm"
                    >
                        Upload
                    </button>
                    <form onSubmit={handleSumbit} className="mt-3">
                        <div class="flex items-center justify-center ">
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
                                <input
                                    id="dropzone-file"
                                    type="file"
                                    class="hidden"
                                    onChange={handleChangeImage}
                                />
                            </label>
                        </div>
                        <div className="mt-3 w-full flex justify-end">
                            <button
                                type="submit"
                                className="px-5 py-2 rounded-md bg-amber-400 text-white font-semibold text-sm"
                            >
                                Save Image
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Profile;
