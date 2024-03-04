import { useEffect, useState } from "react";
import { Button, TextField } from '@mui/material';

export default function user() {

    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const updatePassword = async (e) => {
        e.preventDefault();
        let req = { newPassword: newPassword, confirmPassword: confirmPassword };
        await fetch("http://localhost:3001/auth/updatePassword", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req),
            credentials: "include"
        })
    }

    return (<>
        <p>Passwort ändern</p>
        <form onSubmit={updatePassword} autoComplete="off">
            <TextField
                id="Text"
                label="Neues Passwort"
                variant="outlined"
                required
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
                id="Text"
                label="Neues Passwort bestätigen"
                variant="outlined"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
                variant="outlined"
                type="submit"
            >
                Bestätigen
            </Button>
        </form>
    </>)
}