import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getIsTeacher } from "../functions/teacherfunctions.js";

const CreateClassButton = () => {
    const [isTeacher, setIsTeacher] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsTeacher(await getIsTeacher());
        };
        fetchData();
    }, []);

    return isTeacher ? (<>
        <Button
            className="button addMargin"
            variant="outlined"
            onClick={() => { window.location.replace("http://localhost:3000/createClass") }}>
            Klasse erstellen
        </Button>
    </>) : null;
}

export default CreateClassButton;