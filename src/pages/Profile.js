import React, { useState, useEffect } from "react";

// component
import { Alert, Modal, Progress, Spinner } from "flowbite-react";
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

    // // update profile image
    // const [imageUpload, setImageUpload] = useState(null);
    // const [alert, setAlert] = useState();
    // const [img, setImg] = useState({
    //     image : ""
    // });
    // const [userImage, setUserImage] = useState([]);
    // // let userImage = []

    // const uploadImage = () => {
    //     if (imageUpload == null) return;

    //     const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

    //     uploadBytes(imageRef, imageUpload).then((snapshot) => {
    //         setAlert(
    //             <Alert color="success">
    //                 <span>
    //                     <span className="font-medium">Success</span> Upload
    //                     Image
    //                 </span>
    //             </Alert>
    //         );
    //         getDownloadURL(snapshot.ref).then((url) => {
    //             setImg(url);
    //         });

    //     });

    // };

    // // useEffect(() => {
    // //     // setUserImage({
    // //     //     ...userImage,
    // //     //     avatar: img,
    // //     // });
    // //     setUserImage([img])
    // // }, [userImage]);

    // const handleSumbit = async (e) => {
    //     e.preventDefault();

    //     // uploadImage();

    //     const config = {
    //         Headers: {
    //             "Content-type": "multipart/form-data",
    //         },
    //     };

    //     const body = userImage;

    //     const response = await API.patch(`/user/${userId.id}`, body, config);
    //     console.log(response);
    //     navigate(0);
    // };

    // console.log(img);

    // const handleChangeImage = (e) => {
    //     for (let i = 0; i < e.target.files.length; i++) {
    //         const newImage = e.target.files[i]
    //         setImageUpload((prevState) => [...prevState, newImage])
    //     }
    //     // setImageUpload(e.target.files[0]);
    // };

    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    const [progress, setProgress] = useState();

    const handleChange = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setImages((prevState) => [...prevState, newImage]);
        }
    };

    const handleUpload = () => {
        if (images == null) return;
        setProgress(
            <div className="flex items-center gap-3">
                <Spinner color="success" aria-label="Success spinner example" />
                <span>Uploading...</span>
            </div>
        );
        images.map((image) => {
            const imageRef = ref(storage, `images/${image.name + v4()}`);

            uploadBytes(imageRef, image).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((urls) => {
                    setUrls((prevState) => [...prevState, urls]);
                });
                setProgress(
                    <Alert color="success">
                        <span>Upload Finish</span>
                    </Alert>
                );
            });
        });
        setImages([]);
    };

    console.log("images: ", images);
    console.log("urls", urls);

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
                    {progress}
                    <input type="file" multiple onChange={handleChange} />

                    <button
                        onClick={handleUpload}
                        className="ml-3 mt-3 px-5 py-1.5 rounded-md bg-blue-600 text-white font-medium text-sm"
                    >
                        Upload
                    </button>
                    {/* <form onSubmit={handleUpload} className="mt-3">
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
                                    onChange={handleChange}
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
                    </form> */}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Profile;
