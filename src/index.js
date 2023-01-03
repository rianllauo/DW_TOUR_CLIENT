import React from "react";
import ReactDOM from "react-dom/client";
import { UserContextProvider } from "./context/userContext";
import "./index.css";
import App from "./App";

import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import Navbars from "./components/molekul/Navbars";
import Footer from "./components/molekul/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));

const client = new QueryClient();

root.render(
    <React.StrictMode>
        <UserContextProvider>
            <QueryClientProvider client={client}>
                <div className="relative">
                    <Router>
                        <Navbars />
                        <App />
                        <Footer />
                    </Router>
                </div>
            </QueryClientProvider>
        </UserContextProvider>
    </React.StrictMode>
);
