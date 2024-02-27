import { Button, Container, Grid, List, ListItem, ListItemButton, ListItemText, ListSubheader, Paper, TextField } from '@mui/material';
import { useState } from "react";
import '../index.css';

const Tester = () => {
    let languages = ["English", "Spanish"];

    const [text, setText] = useState('');
    const [compare, setCompare] = useState('');
    const [language, setLanguage] = useState(null);

    const checkText = (e) => {
        let req = { text: text, language: language };
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

    return (
        <>
            <Container>
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
                                onClick={async () => {
                                    const response = await fetch(`http://localhost:3001/sql/learn?language=${language}`, { credentials: "include" });
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
                                </form> </> : <p>Bitte Sprache auswählen</p>}
                        </Grid>
                    </Grid>
                </Paper>
            </Container >
        </>
    )
}

export default Tester;