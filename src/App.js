import { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { API, setAuthToken } from "./config/api";
import { UserContext } from "./context/userContext";

// components
import Home from "./pages/Home";
import DetailTrip from "./pages/DetailTrip";
import Payment from "./pages/Payment";
import PaymentList from "./pages/PaymentList";
import Profile from "./pages/Profile";
import AdminTrip from "./pages/AdminTrip";
import PrivateAdmin from "./routes/PrivateAdmin";
import AddTrip from "./pages/AddTrip";
import PrivateUser from "./routes/PrivateUser";
import HistoryTransaction from "./pages/HistoryTransaction";

function App() {
    const navigate = useNavigate();
    const [state, dispatch] = useContext(UserContext);

    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    // useEffect(() => {
    //     if (state.isLogin === false) {
    //         navigate("/");
    //     } else {
    //         if (state.user.role === "admin") {
    //             navigate("/");
    //         } else if (state.user.role === "user") {
    //             navigate("/");
    //         }
    //     }
    // }, [state]);

    const checkUser = async () => {
        try {
            const response = await API.get("/check-auth");

            if (response.status === 404) {
                return dispatch({
                    type: "AUTH_ERROR",
                });
            }

            let payload = response.data.data;
            payload.token = localStorage.token;

            dispatch({
                type: "USER_SUCCESS",
                payload,
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (localStorage.token) {
            checkUser();
        }
    }, []);

    // content trip fetch
    const [dataTrip, setDataTrip] = useState();
    const dataTripFetch = async () => {
        const response = await API.get(`/trips`);
        setDataTrip(response.data.data);
    };

    useEffect(() => {
        dataTripFetch();
    }, []);

    const [person, setPerson] = useState(1);
    const [price, setPrice] = useState();
    const [totalPrice, setTotalPrice] = useState();

    // useEffect(() => {
    //     setTotalPrice(price);
    // }, [price]);

    // penambahan user & total price
    const increment = () => {
        setPerson(person + 1);
        setTotalPrice(totalPrice + price);
    };

    const decrement = () => {
        if (person > 1) {
            setPerson(person - 1);
            setTotalPrice(totalPrice - price);
        }
    };

    console.log(dataTrip);

    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
                path="/detail-trip/:id"
                element={
                    <DetailTrip
                        dataTrip={dataTrip}
                        increment={increment}
                        decrement={decrement}
                        totalPrice={totalPrice}
                        setPrice={setPrice}
                        setTotalPrice={setTotalPrice}
                        person={person}
                        price={price}
                    />
                }
            />

            <Route element={<PrivateAdmin user={state.user} />}>
                <Route exact path="/admin" element={<AdminTrip />} />
                <Route exact path="/add-trip" element={<AddTrip />} />
            </Route>

            <Route element={<PrivateUser user={state.user} />}>
                <Route
                    path="/payment/:id"
                    element={
                        <Payment
                            dataTrip={dataTrip}
                            totalPrice={totalPrice}
                            person={person}
                        />
                    }
                />
                <Route path="/payment-list" element={<PaymentList />} />
                <Route path="/profile" element={<Profile />} />
                <Route
                    path="/history-payment"
                    element={<HistoryTransaction />}
                />
            </Route>
        </Routes>
    );
}

export default App;
