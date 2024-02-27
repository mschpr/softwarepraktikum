import { Button, Container, Grid, List, ListItem, ListItemButton, ListItemText, ListSubheader, Paper, TextField } from '@mui/material';
import { useState, useEffect } from "react";
import ClassChart from "./classChart.js";

const Classes = () => {

    const [classes, setClasses] = useState();
    const [course, setCourse] = useState();
    const [username, setUsername] = useState();

    useEffect(() => {
        const fetchData = async () => {
            let response = await fetch(`http://localhost:3001/sql/getClassesByMember`, { credentials: "include" });
            let data = await response.json();
            setClasses(data);
        };
        fetchData();
    }, []);

    const addUserToClass = async (e) => {
        e.preventDefault();
        let req = { username: username, IDClass: course.IDClass };
        await fetch("http://localhost:3001/sql/addUserToClass", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req),
            credentials: "include"
        });
    }

    return (<>
        <Button variant="outlined">
            Klasse erstellen
        </Button>
        <Grid>
            <Grid item md={2}>
                <List>
                    <ListSubheader>Klassen</ListSubheader>
                    {classes && classes.map((element) => (
                        <ListItem key={element.IDUser}>
                            <ListItemButton
                                selected
                                onClick={() => setCourse(classes.find((c) => c.IDClass === element.IDClass))}
                            >
                                <ListItemText primary={element.Classes.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Grid>
            <Grid item md={10}>
                {course ? <>
                    <p>Schüler hinzufügen</p>
                    <form onSubmit={addUserToClass} autoComplete="off">
                        <TextField
                            id="Username"
                            label="Username"
                            variant="outlined"
                            required
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Button
                            variant="outlined"
                            type="submit"
                        >
                            Bestätigen
                        </Button>
                    </form>
                    <ClassChart />
                    <p>Auf Schüler zuschneiden!</p>
                </> : <p>Bitte Klasse auswählen</p>}
            </Grid>
        </Grid>
    </>)
}
export default Classes;