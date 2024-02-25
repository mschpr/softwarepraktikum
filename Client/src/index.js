import { createRoot } from "react-dom/client";
import { Drawer, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { BrowserRouter, Link, NavLink, Route, Routes, redirect, useNavigate, useParams } from "react-router-dom";
import { lazy, Suspense } from "react";
import './index.css';

//pages
const Tester = lazy(() => import("./pages/tester.js"));
const Info = lazy(() => import("./pages/info.js"));
const Chart = lazy(() => import("./pages/chart.js"));
const Login = lazy(() => import("./pages/login.js"));

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
                <Suspense>
                    <Routes>
                        <Route path="/" element={<Tester />} />
                        <Route path="info" element={<Info />} />
                        <Route path="login" element={<Login />} />
                        <Route path="chart" element={<Chart />} />
                    </Routes>
                </Suspense>
            </main>
        </BrowserRouter>
    </>)
}

createRoot(document.getElementById("react-root")).render(<App />);