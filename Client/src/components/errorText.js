import { Paper } from '@mui/material';

const ErrorText = (props) => {
    return (<>
        <Paper className="errorPaper" elevation={1}>
            <p className="errorText" >{props.text}</p>
        </Paper>
    </>)
}

export default ErrorText;