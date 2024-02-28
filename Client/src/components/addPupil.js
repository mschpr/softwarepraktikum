import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";

const AddPupil = () => {

    const addUserToClass = async (e) => {
        e.preventDefault();
        let req = { username: username, IDClass: course.IDClass };
        await fetch("http://localhost:3001/sql/addUserToClass", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req),
            credentials: "include"
        });
    }

    const [isTeacher, setIsTeacher] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            let response = await fetch(`http://localhost:3001/auth/isteacher`, { credentials: "include" });
            if (response.status === 200) {
                setIsTeacher(true)
            }
        };
        fetchData();
    }, []);

    return isTeacher ? (<>
        <p>Schüler hinzufügen</p>
        <form onSubmit={addUserToClass} autoComplete="off">
            <TextField
                id="Username"
                label="Username"
                variant="outlined"
                required
                onChange={(e) => setUsername(e.target.value)}
            />
            <Button
                variant="outlined"
                type="submit"
            >
                Bestätigen
            </Button>
        </form>
    </>) : null;
}

export default AddPupil;