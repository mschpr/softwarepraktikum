import { Button, Container, Grid, List, ListItem, ListItemButton, ListItemText, ListSubheader, Paper, TextField } from '@mui/material';
import { useState } from "react";

import VocabTester from '../components/vocabTester.js';

const Tester = () => {
    let languages = [{ language: "English", name: "Englisch" }, { language: "Spanish", name: "Spanisch" }];
    const [language, setLanguage] = useState(null);

    return (
        <>
            <Paper className="paperBackground" elevation={1}>
                <Grid container spacing={2}>
                    <Grid item md={2}>
                        <List>
                            <ListSubheader className="listSubHeader">Sprachen</ListSubheader>
                            {languages.map((language) => (
                                <ListItem key={language}>
                                    <ListItemButton
                                        className="button"
                                        selected
                                        onClick={() =>
                                            setLanguage(languages.find((l) => l === language))
                                        }
                                    >
                                        <ListItemText primary={language.name} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid item md={10}>
                        {language ? <VocabTester language={language.language} /> : <p>Bitte Sprache auswählen</p>}
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default Tester;