import React, { useContext } from "react";
import { Dropdown, Avatar } from "flowbite-react";
import { UserContext } from "../../context/userContext";
import { Link, useNavigate } from "react-router-dom";

const DropdownAdmin = ({ text, user }) => {
    const navigate = useNavigate();
    const users = JSON.parse(localStorage.getItem("user"));
    const [state, dispatch] = useContext(UserContext);

    const logout = () => {
        dispatch({
            type: "LOGOUT",
        });
        navigate(0);
    };

    // console.log(state);

    return (
        <div className="flex items-center gap-3">
            <h3 className={`text-xs font-bold ${text} hidden md:block`}>
                Hi, Selamat Siang{" "}
                <span className="text-amber-500">{state.user.name}</span>
            </h3>
            <Dropdown
                arrowIcon={false}
                inline={true}
                label={
                    <Avatar
                        alt="User settings"
                        img={user.avatar}
                        rounded={true}
                    />
                }
            >
                <Dropdown.Header>
                    <span className="block text-sm">{users.name}</span>
                    <span className="block truncate text-sm font-medium">
                        {users.email}
                    </span>
                </Dropdown.Header>
                <Dropdown.Item>
                    <Link to="/admin">Dashboard</Link>
                </Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>Earnings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                    <button onClick={logout}>Sign out</button>
                </Dropdown.Item>
            </Dropdown>
        </div>
    );
};

export default DropdownAdmin;
