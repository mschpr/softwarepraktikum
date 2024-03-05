import { useState, useEffect } from "react";
import { Button, TextField, Paper } from "@mui/material";
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
        <Paper className="paperBackground" elevation={1}>
            <p id="labelCreateClass" >Neue Klasse erstellen</p>
            <form onSubmit={submitClass} autoComplete="off">
                <TextField
                    className="textField"
                    label="Klassenname"
                    variant="outlined"
                    required
                    onChange={(e) => setClassname(e.target.value)}
                />
                <TextField
                    className="textField"
                    label="Sprache"
                    variant="outlined"
                    required
                    onChange={(e) => setLanguage(e.target.value)}
                />
                <Button
                    className="button"
                    id="createClass"
                    variant="outlined"
                    type="submit"
                >
                    Bestätigen
                </Button>
            </form>
        </Paper>
    </>)
}

export default CreateClass;