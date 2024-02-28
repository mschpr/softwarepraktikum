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
const Logout = lazy(() => import("./components/logout.js"));
const Register = lazy(() => import("./pages/register.js"));
const Classes = lazy(() => import("./pages/classes.js"));
const CreateClass = lazy(() => import("./pages/createClass.js"));

function App() {
    return (<>
        <BrowserRouter>
            <header>
                <nav>
                    <h1>Menü</h1>
                    <NavLink to="/">Startseite</NavLink>
                    <NavLink to="info">Info</NavLink>
                    <NavLink to="chart">Statistik</NavLink>
                    <NavLink to="classes">Klassen</NavLink>
                    <NavLink to="logout">Abmelden</NavLink>
                </nav>
            </header>
            <main>
                <Suspense>
                    <Routes>
                        <Route path="/" element={<Tester />} />
                        <Route path="info" element={<Info />} />
                        <Route path="login" element={<Login />} />
                        <Route path="logout" element={<Logout />} />
                        <Route path="chart" element={<Chart />} />
                        <Route path="register" element={<Register />} />
                        <Route path="classes" element={<Classes />} />
                        <Route path="createclass" element={<CreateClass />} />
                    </Routes>
                </Suspense>
            </main>
        </BrowserRouter>
    </>)
}

createRoot(document.getElementById("react-root")).render(<App />);