import { createRoot } from "react-dom/client";
import { BrowserRouter, NavLink, Route, Routes, } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import './index.css';

const Tester = lazy(() => import("./pages/tester.js"));
const Chart = lazy(() => import("./pages/chart.js"));
const Login = lazy(() => import("./pages/login.js"));
const Logout = lazy(() => import("./components/logout.js"));
const Register = lazy(() => import("./pages/register.js"));
const User = lazy(() => import("./pages/user.js"));
const Classes = lazy(() => import("./pages/classes.js"));
const CreateClass = lazy(() => import("./pages/createClass.js"));

function App() {

    const [user, setUser] = useState();

    useEffect(() => {
        const fetchData = async () => {
            let response = await fetch(`http://localhost:3001/auth/getUser`, { credentials: "include" });
            let data = await response.json();
            setUser(data);
        };
        fetchData();
    }, []);


    return (<>
        <BrowserRouter>
            <nav>
                <h1>WordWise</h1>
                <NavLink to="/">Startseite</NavLink>
                <NavLink to="chart">Statistik</NavLink>
                <NavLink to="classes">Klassen</NavLink>
                {user?.name ? <NavLink to="logout">Abmelden</NavLink> : <NavLink to="login">Anmelden</NavLink>}
                {user?.name ? <NavLink to="user">{user.name}</NavLink> : ""}
            </nav>
            <main>
                <Suspense>
                    <Routes>
                        <Route path="/" element={<Tester />} />
                        <Route path="login" element={<Login />} />
                        <Route path="logout" element={<Logout />} />
                        <Route path="user" element={<User />} />
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