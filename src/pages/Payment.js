import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

// component
import CardPayment from "../components/card/CardPayment";
import { API } from "../config/api";

const Payment = ({ totalPrice, person }) => {
    // const userPayments = JSON.parse(localStorage.getItem("userPayment"));
    const navigate = useNavigate();
    const [trip, setTrip] = useState({});
    const { id } = useParams();
    const [status, setStatus] = useState("");
    // const userPayment = [];

    const fecthTrip = async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: "Basic " + localStorage.token,
            },
        };
        const response = await API.get(`/trip/${id}`, config);
        setTrip(response.data.data);
    };

    useEffect(() => {
        fecthTrip();
    }, []);

    const handleBuy = useMutation(async () => {
        try {
            // Get data from product
            const data = {
                trip_id: trip.id,
                counter_qty: person,
                total: totalPrice,
                status: "waiting",
            };

            // Data body
            const body = JSON.stringify(data);
            console.log(body);

            // Configuration
            const config = {
                headers: {
                    Authorization: "Bearer " + localStorage.token,
                    "Content-type": "application/json",
                },
            };

            // Insert transaction data
            const response = await API.post("/transaction", body, config);

            console.log("response beli", response);
            const token = response.data.data.token;
            // console.log(response.data.dataTrip.transaction_details.order_id);

            window.snap.pay(token, {
                onSuccess: function (result) {
                    console.log(result);
                    setStatus("success");
                    navigate("/history-payment");
                },
                onPending: function (result) {
                    console.log(result);
                    setStatus("pending");
                    navigate("/history-payment");
                },
                onError: function (result) {
                    setStatus("error");
                    console.log(result);
                },
                onClose: function () {
                    setStatus("waiting");
                    navigate("/history-payment");
                    localStorage.setItem(
                        `${response.data.dataTrip.transaction_details.order_id}`,
                        token
                    );
                },
            });
        } catch (error) {
            console.log(error);
        }
    });

    useEffect(() => {
        const midtransScriptUrl =
            "https://app.sandbox.midtrans.com/snap/snap.js";
        const myMidtransClientKey = "SB-Mid-client-jKx0VsRSVbk-ZHUX";

        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);
        document.body.appendChild(scriptTag);

        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);

    return (
        <div className="mx-auto pt-28 pb-16 bg-slate-100">
            <div className="w-fit mx-auto">
                <CardPayment status={status} price={totalPrice} />

                <div className="w-full flex justify-end mt-5">
                    <button
                        onClick={() => handleBuy.mutate()}
                        className="px-6 py-2 bg-amber-400 text-white text-sm font-medium rounded-md"
                    >
                        Pay Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Payment;
