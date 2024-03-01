import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getIsTeacher } from "../functions/teacherfunctions.js";

const DeleteClassButton = (props) => {

    const deleteClass = async () => {
        let req = { IDClass: props.IDClass };
        await fetch("http://localhost:3001/sql/deleteClass", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req),
            credentials: "include"
        });
    }

    const [isTeacher, setIsTeacher] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsTeacher(await getIsTeacher());
        };
        fetchData();
    }, []);

    return isTeacher ? (
        <Button variant="outlined" onClick={deleteClass}>Klasse löschen</Button>
    ) : null;
}

export default DeleteClassButton;