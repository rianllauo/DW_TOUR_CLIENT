import { Outlet, Navigate } from "react-router-dom";

const PrivateAdmin = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div>
            {user !== null && user.role === "admin" ? (
                <Outlet />
            ) : (
                <Navigate to="/" />
            )}
        </div>
    );
};

export default PrivateAdmin;
