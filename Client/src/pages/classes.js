import { Grid, List, ListItem, ListItemButton, ListItemText, ListSubheader } from '@mui/material';
import { useState, useEffect } from "react";

import ClassChart from "./classChart.js";

import CreateClassButton from '../components/createClassButton.js';
import ChangeClassMember from '../components/changeClassMember.js';
import DeleteClassButton from '../components/deleteClassButton.js';

const Classes = () => {

    const [classes, setClasses] = useState();
    const [course, setCourse] = useState();

    useEffect(() => {
        const fetchData = async () => {
            let response = await fetch(`http://localhost:3001/sql/getClassesByMember`, { credentials: "include" });
            let data = await response.json();
            if (response.status !== 200) { window.location.replace("http://localhost:3000/login"); };
            setClasses(data);
        };
        fetchData();
    }, []);

    return (<>
        <CreateClassButton />
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
                    < ChangeClassMember IDClass={course.IDClass} />
                    <ClassChart IDClass={course.IDClass} />
                    <DeleteClassButton IDClass={course.IDClass} />
                </> : <p>Bitte Klasse auswählen</p>}
            </Grid>
        </Grid>
    </>)
}
export default Classes;