import { useEffect, useState } from "react";
import { Button, TextField, Paper } from '@mui/material';

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
        <Paper className="paperBackground" elevation={1}>
            <h3 id="labelChangePassword" >Passwort ändern</h3>
            <form onSubmit={updatePassword} autoComplete="off">
                <TextField
                    className="addMargin"
                    label="Neues Passwort"
                    variant="outlined"
                    required
                    type="password"
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <TextField
                    className="addMargin"
                    label="Neues Passwort bestätigen"
                    variant="outlined"
                    required
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                    className="button addMargin"
                    variant="outlined"
                    type="submit"
                >
                    Bestätigen
                </Button>
            </form>
        </Paper>
    </>)
}