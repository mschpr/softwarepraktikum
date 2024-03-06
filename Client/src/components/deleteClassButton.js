import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getIsTeacher } from "../functions/teacherfunctions.js";
import ConfirmText from '../components/confirmText.js';

const DeleteClassButton = (props) => {

    const [displayConfirm, setDisplayConfirm] = useState(false);

    const deleteClass = async () => {
        let req = { IDClass: props.IDClass };
        await fetch("http://localhost:3001/sql/deleteClass", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req),
            credentials: "include"
        });
        setDisplayConfirm("Klasse gelöscht");
    }

    const [isTeacher, setIsTeacher] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsTeacher(await getIsTeacher());
        };
        fetchData();
    }, []);

    return isTeacher ? (<>
        <Button
            className="button"
            variant="outlined"
            onClick={deleteClass}
        >
            Klasse löschen
        </Button>
        {displayConfirm ? <ConfirmText text={displayConfirm} /> : null}
    </>) : null;
}

export default DeleteClassButton;