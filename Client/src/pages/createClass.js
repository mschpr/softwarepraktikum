import { useState, useEffect } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { getIsTeacher } from "../functions/teacherfunctions.js";

const CreateClass = () => {

    useEffect(() => {
        const fetchData = async () => {
            if (!await getIsTeacher()) { window.location.replace("http://localhost:3000/classes") }
        };
        fetchData();
    }, []);

    const [classname, setClassname] = useState();
    const [language, setLanguage] = useState();

    const submitClass = async () => {
        let req = { classname: classname, language: language };
        await fetch("http://localhost:3001/sql/createClass", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req),
            credentials: "include"
        })
    }

    return (<>
        <Typography>Neue Klasse erstellen</Typography>
        <form onSubmit={submitClass} autoComplete="off">
            <TextField
                label="Klassenname"
                variant="outlined"
                required
                onChange={(e) => setClassname(e.target.value)}
            />
            <TextField
                label="Sprache"
                variant="outlined"
                required
                onChange={(e) => setLanguage(e.target.value)}
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

export default CreateClass;