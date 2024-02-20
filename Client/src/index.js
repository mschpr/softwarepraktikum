import { createRoot } from "react-dom/client";
import { Button, Container, Grid, List, ListItem, ListItemButton, ListItemText, ListSubheader, Paper, TextField } from '@mui/material';
import { useState } from "react";

let languages = ["Englisch", "Spanisch"];

function App() {
    const [text, setText] = useState('');
    const [compare, setCompare] = useState('');
    const [language, setLanguage] = useState(null);

    const checkText = (e) => {
        let req = { text: text, language: language };
        e.preventDefault();
        if (text.Uebersetzung === compare) {
            fetch("http://localhost:3001/SQL", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(req)
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
            <Container fixed>
                <Paper elevation={1}>
                    <Grid container spacing={2}>
                        <Grid item md={2}>
                            <List>
                                <ListSubheader>Sprachen</ListSubheader>
                                {languages.map((language) => (
                                    <ListItem key={language}>
                                        <ListItemButton
                                            selected
                                            onClick={() =>
                                                setLanguage(languages.find((l) => l === language))
                                            }
                                        >
                                            <ListItemText primary={language} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                        <Grid item md={10}>
                            {language ? <><Button
                                variant="outlined"
                                onClick={() => {
                                    fetch(`http://localhost:3001/SQL?language=${language}`)
                                        .then(response => { return response.json() })
                                        .then(data => setText(data))
                                }}
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
                                </form> </> : <p>Bitte Sprache auswählen</p>}
                        </Grid>
                    </Grid>
                </Paper>
            </Container >
        </>
    )
}

createRoot(document.getElementById("react-root")).render(<App />);