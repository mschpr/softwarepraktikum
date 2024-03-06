import { Button, TextField, Paper } from '@mui/material';
import { useState } from "react";

import ErrorText from '../components/errorText.js';

const Login = () => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [displayError, setDisplayError] = useState(false);

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
        else {
            const data = await response.json();
            setDisplayError(await data.message);
        }
    }

    return (<>
        <Paper className="paperBackground" elevation={1}>
            <h1 className="addMargin" >Anmelden</h1>
            <form onSubmit={submitCredentials} autoComplete="off">
                <TextField
                    className="addMargin"
                    label="Username"
                    variant="outlined"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    className="addMargin"
                    label="Passwort"
                    variant="outlined"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />
                <Button
                    className="button addMargin"
                    variant="outlined"
                    type="submit"
                >
                    Anmelden
                </Button>
            </form>
            <a className="addMargin" href="/register">Registrieren</a>
            {displayError ? <ErrorText text={displayError} /> : null}
        </Paper>
    </>)
}
export default Login;