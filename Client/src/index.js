import { createRoot } from "react-dom/client";
import { Button, TextField } from '@mui/material';
import { useState } from "react";

function App() {
    const [text, setText] = useState('');
    const [compare, setCompare] = useState('');

    const checkText = (e) => {
        e.preventDefault();
        if (text.Uebersetzung === compare) {
            fetch("http://localhost:3001/SQL", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(text)
            })
            console.log("Korrekt");
        }
        else {
            console.log("Falsch");
        }
    }

    return (
        <>
            <h1>Startseite</h1>
            <Button
                variant="outlined"
                onClick={() => fetch("http://localhost:3001/SQL") //liefert response
                    .then(response => { return response.json() }) //liefert promise
                    .then(data => setText(data))                  //extrahiert Daten
                }
            >
                API-Anfrage
            </Button>
            <br />
            <p>{text.Vokabel}</p>
            <br />
            <form onSubmit={checkText} autoComplete="off">
                <TextField
                    id="Text"
                    label="Eingabe"
                    variant="outlined"
                    required
                    onChange={(e) => setCompare(e.target.value)}
                />
                <Button
                    variant="outlined"
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </>
    )
}

createRoot(document.getElementById("react-root")).render(<App />);