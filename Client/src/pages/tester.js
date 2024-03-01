import { Button, Container, Grid, List, ListItem, ListItemButton, ListItemText, ListSubheader, Paper, TextField } from '@mui/material';
import { useState } from "react";

import VocabTester from '../components/vocabTester.js';

const Tester = () => {
    let languages = ["English", "Spanish"];
    const [language, setLanguage] = useState(null);

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
                            {language ? <VocabTester language={language} /> : <p>Bitte Sprache auswählen</p>}
                        </Grid>
                    </Grid>
                </Paper>
            </Container >
        </>
    )
}

export default Tester;