import { Button, TextField } from '@mui/material';
import { useState } from "react";

const Register = () => {

    const [name, setName] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    return (<>
        <h1>Registrieren</h1>
        <form onSubmit={false} autoComplete="off">
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