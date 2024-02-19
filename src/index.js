import { createRoot } from "react-dom/client";
import { Button, TextField } from '@mui/material';
import { useState } from "react";


function App() {
    const [value, setValue] = useState(17);
    const [text, setText] = useState('');
    const [compare, setCompare] = useState('');

    const checkText = (e) => {
        e.preventDefault();
        console.log(text === compare);
    }

    return (
        <>
            <h1>Startseite</h1>

            <Button
                variant="outlined"
                onClick={() => setValue(value + 1)}
            >
                Drück mich
            </Button>
            <p>{value}</p>
            <br />
            <form onSubmit={checkText} autoComplete="off">
                <TextField
                    id="Text1"
                    label="Text"
                    variant="outlined"
                    onChange={(e) => setText(e.target.value)}
                    required
                />
                <TextField
                    id="Text2"
                    label="Compare"
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