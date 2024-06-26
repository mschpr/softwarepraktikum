import { useState } from "react";
import { Button, TextField } from '@mui/material';
import ConfirmText from "../components/confirmText.js";
import ErrorText from "../components/errorText.js";

const VocabTester = (props) => {

    const [text, setText] = useState('');
    const [compare, setCompare] = useState('');
    const [displayConfirm, setDisplayConfirm] = useState(false);
    const [displayError, setDisplayError] = useState(false);

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
            setDisplayConfirm("Korrekt");
            setDisplayError(false);
        }
        else {
            setDisplayError(`Falsch. Korrekt ist: ${text.translation}`);
            setDisplayConfirm(false);
        }
    }


    return (<>
        <Button
            className="button"
            onClick={async () => {
                const response = await fetch(`http://localhost:3001/sql/learn?language=${props.language}`, { credentials: "include" });
                if (response.status !== 200) { window.location.replace("http://localhost:3000/login"); };
                setText(await response.json());
            }}
        >
            Nächste Vokabel
        </Button>
        <p id="testerVocab">{text.vocab}</p>
        <form onSubmit={checkText} autoComplete="off">
            <TextField
                label="Eingabe"
                required
                onChange={(e) => setCompare(e.target.value)}
            />
            <Button
                className="button"
                id="confirmVocab"
                type="submit"
            >
                Bestätigen
            </Button>
            {displayConfirm ? <ConfirmText text={displayConfirm} /> : null}
            {displayError ? <ErrorText text={displayError} /> : null}
        </form>
    </>)
}
export default VocabTester;
