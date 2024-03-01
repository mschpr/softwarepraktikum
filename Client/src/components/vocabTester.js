import { useState } from "react";
import { Button, TextField } from '@mui/material';

const VocabTester = (props) => {

    const [text, setText] = useState('');
    const [compare, setCompare] = useState('');

    const checkText = (e) => {
        let req = { text: text, language: props.language };
        e.preventDefault();
        if (text.translation === compare) {
            fetch("http://localhost:3001/sql/updateProgress", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(req),
                credentials: "include"
            })
            console.log("Korrekt");
        }
        else {
            console.log("Falsch");
        }
    }


    return (<>
        <Button
            variant="outlined"
            onClick={async () => {
                const response = await fetch(`http://localhost:3001/sql/learn?language=${props.language}`, { credentials: "include" });
                if (response.status !== 200) { window.location.replace("http://localhost:3000/login"); };
                setText(await response.json());
            }}
        >
            Nächste Vokabel
        </Button>
        <br />
        <p>{text.vocab}</p>
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
                Bestätigen
            </Button>
        </form>
    </>)
}
export default VocabTester;
