import { Button, TextField } from '@mui/material';
import { useState } from "react";

const Register = () => {

    const [name, setName] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const createAccount = async (e) => {
        let req = { name: name, username: username, password: password };
        e.preventDefault();

        const response = await fetch("http://localhost:3001/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req)
        })
        if (response.status === 200) {
            window.location.replace("http://localhost:3000/");
        }
    }

    return (<>
        <h1>Registrieren</h1>
        <form onSubmit={createAccount} autoComplete="off">
            <TextField
                id="Name"
                label="Name"
                variant="outlined"
                required
                onChange={(e) => setName(e.target.value)}
            />
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
                type="password"
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

export default Register