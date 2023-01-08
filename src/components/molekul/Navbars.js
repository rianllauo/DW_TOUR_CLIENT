import React, { useEffect, useState, useContext } from "react";
import { Navbar } from "flowbite-react";
import { UserContext } from "../../context/userContext";

import DropdownUser from "../atomic/DropdownUser";

// image & icons
import logo from "../../assets/icons/brand-icon.svg";
import logoBlack from "../../assets/icons/brand-icon-black.svg";
import AuthButton from "../atomic/AuthButton";
import ModalLogin from "../auth/ModalLogin";
import ModalRegister from "../auth/ModalRegister";
import Switcher from "../../utils/Switcher";
import { Link } from "react-router-dom";
import DropdownAdmin from "../atomic/DropdownAdmin";
import { API } from "../../config/api";

const Navbars = () => {
    const userId = JSON.parse(localStorage.getItem("user"));
    const [state, dispatch] = useContext(UserContext);
    const [isLogin, setIsLogin] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [sunLogo, setSunLogo] = useState("white");
    const [brand, setBrand] = useState(logo);
    const [text, setText] = useState("text-white");

    useEffect(() => {
        if (state.isLogin === false) {
            setIsLogin(false);
        } else if (state.isLogin === true) {
            setIsLogin(true);
        }

        if (state.user.role === "admin") {
            setIsAdmin(true);
        } else if (state.user.role === "user") {
            setIsAdmin(false);
        }
    }, [state]);

    const [bg, setBg] = useState("background-none");
    const [bgDark, setBgDark] = useState("background-none");

    const changeNavbar = () => {
        if (window.scrollY >= 10) {
            setBg("background-nav");
            setBgDark("background-nav-dark");
            setSunLogo("black");
            setBrand(logoBlack);
            setText("text-black");
        } else {
            setBg("background-none");
            setBgDark("background-none");
            setSunLogo("white");
            setBrand(logo);
            setText("text-white");
        }
    };
    window.addEventListener("scroll", changeNavbar);

    // dropdown show
    const [showLogin, setShowLogin] = React.useState(false);
    const [showRegister, setShowRegister] = React.useState(false);

    const handleShowLogin = () => {
        setShowLogin(true);
    };
    const handleShowRegister = () => {
        setShowRegister(true);
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
    };

    const handleCloseRegister = () => {
        setShowRegister(false);
    };

    const [user, setUser] = useState();

    // fecth user
    const userFetch = async () => {
        const response = await API.get(`/user/${userId.id}`);
        setUser(response.data.data);
    };

    useEffect(() => {
        userFetch();
    }, []);

    // console.log(user?.avatar);

    return (
        <>
            <Navbar
                fluid={false}
                className={`${bg} dark:${bgDark} fixed w-full transition duration-300 shadow-md z-50`}
            >
                <div className="max-w-screen-lg px-4 mx-auto flex flex-wrap items-center justify-between container text-white">
                    {/* <Navbar.Brand> */}
                    <Link to="/">
                        <img
                            src={brand}
                            alt="brand"
                            className="mr-3 w-28 md:w-32 sm:h-9"
                        />
                        {/* <img src={require('../../assets/icons/brand-icon-black.svg')} alt="" /> */}
                    </Link>
                    {/* </Navbar.Brand> */}

                    <div className="flex items-center justify-center">
                        <div className="flex md:order-2 ml-3">
                            <div className="flex items-center gap-3">
                                {isLogin ? (
                                    isAdmin ? (
                                        <DropdownAdmin
                                            text={text}
                                            user={user}
                                        />
                                    ) : (
                                        <DropdownUser text={text} user={user} />
                                    )
                                ) : (
                                    <AuthButton
                                        handleShowLogin={handleShowLogin}
                                        handleShowRegister={handleShowRegister}
                                        handleCloseLogin={handleCloseLogin}
                                    />
                                )}

                                <Switcher sunLogo={sunLogo} />
                            </div>
                            {/* <Navbar.Toggle /> */}
                        </div>
                    </div>
                </div>
            </Navbar>
            <ModalLogin show={showLogin} handleClose={handleCloseLogin} />
            <ModalRegister
                show={showRegister}
                handleClose={handleCloseRegister}
            />
        </>
    );
};

export default Navbars;
