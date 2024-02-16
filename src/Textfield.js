import * as React from 'react';
import { TextField } from '@mui/material';

export default function BasicTextFields(props) {
    return (
        <TextField label={props.label} variant={props.variant} />
    );
}