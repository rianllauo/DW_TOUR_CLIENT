import React, { useContext, useState, useEffect } from "react";
import { Dropdown, Avatar } from "flowbite-react";
import { UserContext } from "../../context/userContext";
import { Link, useNavigate } from "react-router-dom";

const DropdownUser = ({ text, user }) => {
    const navigate = useNavigate();
    const users = JSON.parse(localStorage.getItem("user"));
    const [state, dispatch] = useContext(UserContext);

    const logout = () => {
        dispatch({
            type: "LOGOUT",
        });
        navigate(0);
    };

    const getTime = new Date();
    const time = getTime.getHours();
    const [day, setDay] = useState();
    // const [Night, setNight] = useState();

    const DayTime = time > 6 && time < 18;
    const DayNight = time > 18 && time < 24;

    const getDayNight = () => {
        if (DayTime === true) {
            setDay("Siang");
        }
        if (DayNight === true) {
            setDay("Malam");
        }
    };
    useEffect(() => {
        getDayNight();
    }, []);

    console.log(time);
    return (
        <div className="flex items-center gap-3">
            <h3 className={`text-xs font-bold ${text}`}>
                Hi, Selamat {day}{" "}
                <span className="text-amber-500 font-bold">
                    {state.user.name}
                </span>
            </h3>
            <Dropdown
                arrowIcon={false}
                inline={true}
                label={
                    <Avatar
                        alt="User settings"
                        img={user?.avatar}
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
                    <Link to="/profile">Profile</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                    <Link to="/history-payment">Payment</Link>
                </Dropdown.Item>
                {/* <Dropdown.Item>Earnings</Dropdown.Item> */}
                <Dropdown.Divider />
                <Dropdown.Item>
                    <button onClick={logout}>Sign out</button>
                </Dropdown.Item>
            </Dropdown>
        </div>
    );
};

export default DropdownUser;
