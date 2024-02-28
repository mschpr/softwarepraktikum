import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const CreateClassButton = () => {
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

    return isTeacher ? (
        <Button variant="outlined" onClick={() => { window.location.replace("http://localhost:3000/createClass") }}>Klasse erstellen</Button>
    ) : null;
}

export default CreateClassButton;