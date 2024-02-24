import { createRoot } from "react-dom/client";
import { Drawer, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { BrowserRouter, Link, NavLink, Route, Routes, redirect, useNavigate } from "react-router-dom";
import './index.css';

//pages
import Tester from "./pages/tester.js";
import Info from "./pages/info.js";
import Chart from "./pages/chart.js";
import Login from "./pages/login.js";

function App() {
    return (<>
        <BrowserRouter>
            <header>
                <nav>
                    <h1>Menü</h1>
                    <NavLink to="/">Babbel</NavLink>
                    <NavLink to="info">Info</NavLink>
                    <NavLink to="chart">Statistik</NavLink>
                </nav>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<Tester />} />
                    <Route path="info" element={<Info />} />
                    <Route path="login" element={<Login />} />
                    <Route path="chart" element={<Chart />} />
                </Routes>
            </main>
        </BrowserRouter>
    </>)
}

createRoot(document.getElementById("react-root")).render(<App />);