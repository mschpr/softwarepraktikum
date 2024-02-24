import { Button, TextField } from '@mui/material';
import { useState } from "react";
import '../index.css';

const Login = () => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const Cookies = document.cookie;

    const submitCredentials = (e) => {
        let req = { username: username, password: password };
        e.preventDefault();

        const res = fetch("http://localhost:3001/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "http://localhost:3000" },
            body: JSON.stringify(req),
            credentials: "include"
        })
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
            />
            <Button
                variant="outlined"
                type="submit"
            >
                Submit
            </Button>
        </form>
    </>)
}
export default Login;