import { useState } from "react";
import { Button, TextField, Paper } from '@mui/material';
import ConfirmText from "../components/confirmText.js";
import ErrorText from "../components/errorText.js";

export default function user() {

    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [displayConfirm, setDisplayConfirm] = useState(false);
    const [displayError, setDisplayError] = useState(false);

    const updatePassword = async (e) => {
        e.preventDefault();
        let req = { newPassword: newPassword, confirmPassword: confirmPassword };
        const response = await fetch("http://localhost:3001/auth/updatePassword", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req),
            credentials: "include"
        });
        if (response.status === 200) {
            setDisplayConfirm(true);
            setDisplayError(false);
        }
        else {
            setDisplayConfirm(false);
            setDisplayError(true);
        }
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
            {displayConfirm ? <ConfirmText text="Passwort geändert" /> : null}
            {displayError ? <ErrorText text="Passwort konnte nicht geändert werden" /> : null}
        </Paper>
    </>)
}