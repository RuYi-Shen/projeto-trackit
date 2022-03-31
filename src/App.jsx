import { React, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserContext from "./contexts/UserContext";

import Login from "./routecomponents/Login";
import Register from "./routecomponents/Register";
import Habits from "./routecomponents/Habits";
import Today from "./routecomponents/Today";
import History from "./routecomponents/History";
import NotFound from "./routecomponents/NotFound";

import Header from "./components/Header";
import Footer from "./components/Footer";

import './css/normalize.css';
import './css/style.css';

export default function App() {

    const [image, setImage] = useState('');
    const [progress, setProgress] = useState('');

    return (
        <UserContext.Provider value={{image:{image, setImage}, progress:{progress, setProgress}}}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/cadastro" element={<Register />} />
                    <Route path="/habitos" element={<Habits />} />
                    <Route path="*" element={<NotFound />} />
                    {/* <Route path="/" element={<Login />} />
                    <Route path="/cadastro" element={<Register />} />
                    <Route path="/habitos" element={<Habits />} />
                    <Route path="/hoje" element={<Today />} />
                    <Route path="/historico" element={<History />} />
                    <Route path="*" element={<NotFound />} /> */}
                </Routes>
                <Footer />
            </BrowserRouter>
        </UserContext.Provider>
    );
}