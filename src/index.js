import { createRoot } from "react-dom/client";
import { Button, TextField } from '@mui/material';

function App() {
    return (
        <>
            <h1>Startseite</h1>
            <TextField label="Text" variant="outlined" />
            <Button variant="outlined"
                onClick={console.log("Klick")}
            >
                Knopf
            </Button>
        </>
    )
}

createRoot(document.querySelector("#react-root")).render(<App />);