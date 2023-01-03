import { Outlet, Navigate } from "react-router-dom";

const PrivateUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    console.log(user);

    return <div>{user !== null ? <Outlet /> : <Navigate to="/" />}</div>;
};

export default PrivateUser;
