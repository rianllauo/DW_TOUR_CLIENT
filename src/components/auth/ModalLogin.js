import React, { useState, useContext } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { API } from "../../config/api";
import Swal from "sweetalert2";
import { Modal, TextInput, Label, Alert } from "flowbite-react";

const ModalLogin = ({ show, handleClose }) => {
    let navigate = useNavigate();

    const [state, dispatch] = useContext(UserContext);

    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const body = JSON.stringify(form);
            const response = await API.post("/login", body, config);

            if (response?.status === 200) {
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: response.data.data,
                });

                if (response.data.data.status === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }

                setMessage(
                    Swal.fire({
                        icon: "success",
                        title: "Successfully Login",
                    })
                );
                navigate(0);
            }
        } catch (error) {
            if (error.response.data.message == "wrong email or password") {
                const alert = (
                    <Alert className="py-2 px-5 bg-rose-500 ">
                        <p className="text-white font-medium text-sm">
                            Email atau Password Salah
                        </p>
                    </Alert>
                );
                setMessage(alert);
            }

            if (error.response.data.message == "record not found") {
                const alert = (
                    <Alert className="py-2 px-5 bg-rose-500 ">
                        <p className="text-white font-medium text-sm">
                            Akun Tidak di Temukan
                        </p>
                    </Alert>
                );
                setMessage(alert);
            }

            console.log(error.response.data);
        }
    });

    return (
        <div>
            <Modal show={show} size="md" popup={true} onClose={handleClose}>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6 px-1 pb-4 ">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Login to Enjoy the trips
                        </h3>
                        {message}
                        <form onSubmit={(e) => handleSubmit.mutate(e)}>
                            <div className="mb-3">
                                <div className="mb-2 block">
                                    <Label htmlFor="email" value="Your email" />
                                </div>
                                <TextInput
                                    name="email"
                                    placeholder="name@company.com"
                                    required={true}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="password"
                                        value="Your password"
                                    />
                                </div>
                                <TextInput
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="password"
                                    required={true}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="w-full mt-3">
                                <button
                                    type="submit"
                                    className="px-5 py-2 rounded-md bg-amber-400 text-white text-sm font-medium"
                                >
                                    Login
                                </button>
                            </div>
                        </form>

                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered?{" "}
                            <a
                                href="/modal"
                                className="text-blue-700 hover:underline dark:text-blue-500"
                            >
                                Create account
                            </a>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ModalLogin;
