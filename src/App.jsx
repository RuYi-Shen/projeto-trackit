import { React, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserContext from "./contexts/UserContext";

import Login from "./routecomponents/Login";
import Register from "./routecomponents/Register";
import Habits from "./routecomponents/Habits";
import Today from "./routecomponents/Today";
import History from "./routecomponents/History";
import NotFound from "./routecomponents/NotFound";

import './css/normalize.css';
import './css/style.css';

export default function App() {

    const [userData, setUserData] = useState({});
    const [progress, setProgress] = useState(0);

    return (
        <UserContext.Provider value={{userData:{userData, setUserData}, progress:{progress, setProgress}}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/cadastro" element={<Register />} />
                    <Route path="/habitos" element={<Habits />} />
                    <Route path="/hoje" element={<Today />} />
                    <Route path="/historico" element={<History />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}