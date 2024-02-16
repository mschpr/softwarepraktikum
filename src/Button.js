import * as React from 'react';
import { Button } from '@mui/material';

export default function BasicButtons(props) {
    return (
        <Button variant={props.variant} onClick={props.onClick}>{props.children}</Button>
    );
}