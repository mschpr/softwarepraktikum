import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { getIsTeacher } from "../functions/teacherfunctions.js";

const ChangeClassMember = (props) => {

    const [username, setUsername] = useState();
    const [isTeacher, setIsTeacher] = useState(false);

    const addUserToClass = async (e) => {
        e.preventDefault();
        let req = { username: username, IDClass: props.IDClass };
        await fetch("http://localhost:3001/sql/addUserToClass", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req),
            credentials: "include"
        });
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
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsTeacher(await getIsTeacher());
        };
        fetchData();
    }, []);

    return isTeacher ? (<>
        <p>Schüler hinzufügen</p>
        <form autoComplete="off">
            <TextField
                id="Username"
                label="Username"
                variant="outlined"
                required
                onChange={(e) => setUsername(e.target.value)}
            />
        </form>
        <Button
            variant="outlined"
            onClick={addUserToClass}
        >
            Hinzufügen
        </Button>
        <Button
            variant="outlined"
            onClick={removeUserFromClass}
        >
            Entfernen
        </Button>
    </>) : null;
}

export default ChangeClassMember;