import React, { useState } from "react";
import { Modal, TextInput, Label, Alert } from "flowbite-react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// API
import { API } from "../../config/api";

const ModalRegister = ({ show, handleClose }) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        phone: "",
        address: "",
    });

    const [message, setMessage] = useState(null);

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // const {fullName, email, password} = form

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const body = JSON.stringify(form);
            const response = await API.post("/register", body, config);

            if (response.status === 200) {
                setMessage(
                    Swal.fire({
                        icon: "success",
                        title: "Successfully Registration",
                    })
                );
            }
            navigate(0);
        } catch (error) {
            const alert = (
                <Alert variant="danger" className="py-1">
                    Failed
                </Alert>
            );
            setMessage(alert);
            console.log(error);
        }
    });

    return (
        <div>
            <Modal show={show} size="md" popup={true} onClose={handleClose}>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6 px-1 pb-4 ">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Register to Start Your Journey
                        </h3>
                        {message}
                        <form onSubmit={(e) => handleSubmit.mutate(e)}>
                            <div className="mb-3">
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="fullname"
                                        value="Your Full Name"
                                    />
                                </div>
                                <TextInput
                                    id="fullname"
                                    name="fullName"
                                    placeholder="full name"
                                    required={true}
                                    onChange={handleOnChange}
                                />
                            </div>

                            <div className="mb-3">
                                <div className="mb-2 block">
                                    <Label htmlFor="email" value="Your email" />
                                </div>
                                <TextInput
                                    name="email"
                                    placeholder="name@company.com"
                                    required={true}
                                    onChange={handleOnChange}
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
                                    onChange={handleOnChange}
                                />
                            </div>

                            <div className="mb-3">
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="phone"
                                        value="Phone Number"
                                    />
                                </div>
                                <TextInput
                                    id="phone"
                                    name="phone"
                                    placeholder="phone"
                                    required={true}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="mb-3">
                                <div className="mb-2 block">
                                    <Label htmlFor="address" value="address" />
                                </div>
                                <TextInput
                                    id="address"
                                    name="address"
                                    placeholder="address"
                                    required={true}
                                    onChange={handleOnChange}
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

export default ModalRegister;
