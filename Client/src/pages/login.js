import { Button, TextField } from '@mui/material';
import { useState } from "react";
import '../index.css';

const Login = () => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const Cookies = document.cookie;

    const submitCredentials = async (e) => {
        let req = { username: username, password: password };
        e.preventDefault();

        const response = await fetch("http://localhost:3001/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "http://localhost:3000" },
            body: JSON.stringify(req),
            credentials: "include"
        })
        if (response.status === 200) {
            window.location.replace("http://localhost:3000/");
        }
    }

    return (<>
        <h1>Anmelden</h1>
        <form onSubmit={submitCredentials} autoComplete="off">
            <TextField
                id="Username"
                label="Username"
                variant="outlined"
                required
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                id="Password"
                label="Passwort"
                variant="outlined"
                required
                onChange={(e) => setPassword(e.target.value)}
                type="password"
            />
            <Button
                variant="outlined"
                type="submit"
            >
                Submit
            </Button>
        </form>
        <a href="/register">Registrieren</a>
    </>)
}
export default Login;