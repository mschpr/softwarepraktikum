import { Paper } from '@mui/material';

const ConfirmText = (props) => {
    return (<>
        <Paper className="confirmPaper" elevation={1}>
            <p className="confirmText" >{props.text}</p>
        </Paper>
    </>)
}

export default ConfirmText;