import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { getIsTeacher } from "../functions/teacherfunctions.js";
import ConfirmText from "./confirmText.js";

const ChangeClassMember = (props) => {

    const [username, setUsername] = useState();
    const [isTeacher, setIsTeacher] = useState(false);
    const [displayError, setDisplayError] = useState(false);
    const [displayConfirm, setDisplayConfirm] = useState(false);

    const addUserToClass = async (e) => {
        e.preventDefault();
        let req = { username: username, IDClass: props.IDClass };
        await fetch("http://localhost:3001/sql/addUserToClass", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req),
            credentials: "include"
        });
        setDisplayConfirm("Nutzer zu Klasse hinzugefügt");
    }

    const removeUserFromClass = async (e) => {
        e.preventDefault();
        let req = { username: username, IDClass: props.IDClass };
        await fetch("http://localhost:3001/sql/removeUserFromClass", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req),
            credentials: "include"
        });
        setDisplayConfirm("Nutzer aus Klasse entfernt");
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsTeacher(await getIsTeacher());
        };
        fetchData();
    }, []);

    return isTeacher ? (<>
        <p>Schüler hinzufügen / entfernen</p>
        <form autoComplete="off">
            <TextField
                className="textField"
                label="Username"
                variant="outlined"
                required
                onChange={(e) => setUsername(e.target.value)}
            />
        </form>
        <Button
            className="button addMargin"
            variant="outlined"
            onClick={addUserToClass}
        >
            Hinzufügen
        </Button>
        <Button
            className="button"
            variant="outlined"
            onClick={removeUserFromClass}
        >
            Entfernen
        </Button>
        {displayConfirm ? <ConfirmText text={displayConfirm} /> : null}
    </>) : null;
}

export default ChangeClassMember;