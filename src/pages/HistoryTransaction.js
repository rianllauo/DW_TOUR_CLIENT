import React, { useContext, useEffect, useState, useTransition } from "react";
import { Tabs } from "flowbite-react";

// component
import CardPayment from "../components/card/CardPayment";
import { API } from "../config/api";
import CardTransaction from "../components/card/CardTransaction";

const HistoryTransaction = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [userTransaction, setUserTransaction] = useState([]);

    const waiting = userTransaction.filter(function (item) {
        return item.status === "waiting";
    });

    const success = userTransaction.filter(function (item) {
        return item.status === "success";
    });

    // console.log(success);

    const userTrcFetch = async () => {
        const response = await API.get(`/user-transactions/${user.id}`);
        setUserTransaction(response.data.data);
    };

    useEffect(() => {
        userTrcFetch();
    }, []);

    console.log(userTransaction);

    return (
        <div className="bg-slate-100 dark:bg-slate-900 pt-28">
            <div className="max-w-screen-lg mx-auto">
                <div className="w-fit mx-auto flex flex-col gap-5">
                    <h1 className="mb-2 text-xl font-semibold dark:text-slate-200">
                        History Payment
                    </h1>
                    <Tabs.Group aria-label="Tabs with icons" style="underline">
                        <Tabs.Item active={true} title="Success Payment">
                            <div className="w-[768px] max-w-sce flex flex-col gap-5 overflow-x-scroll">
                                {success.map((item) => (
                                    <CardTransaction item={item} />
                                ))}
                            </div>
                        </Tabs.Item>
                        <Tabs.Item title="Waiting Payment">
                            <div className="w-[768px] flex flex-col gap-5 overflow-x-scroll">
                                {waiting.map((item) => (
                                    <CardTransaction item={item} />
                                ))}
                            </div>
                        </Tabs.Item>
                    </Tabs.Group>
                </div>
            </div>
        </div>
    );
};

export default HistoryTransaction;
