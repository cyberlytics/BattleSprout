import { Close } from '@mui/icons-material';
import {
    Dialog,
    DialogActions,
    Tooltip,
    IconButton,
    DialogTitle,
    DialogContent,
    Typography
} from '@mui/material';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useEffect, useState } from 'react';

import Readme from '../../README.md';

interface IProps {
    openDialog: boolean;
    handleCloseDialog: Function;
}

export const HelpDialog = (props: IProps) => {
    const { openDialog, handleCloseDialog } = props;

    const [readmeText, setReadmeText] = useState('');

    // Fetch Terms of Use
    useEffect(() => {
        fetch(Readme)
            .then((res) => res.text())
            .then((text) => setReadmeText(text));
    });

    function closeDialog() {
        handleCloseDialog();
    }

    return (
        <Dialog open={openDialog} onClose={closeDialog} fullWidth>
            <DialogActions
                style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                }}
            >
                <Tooltip title={'Schließen'} placement='top'>
                    <IconButton onClick={closeDialog}>
                        <Close />
                    </IconButton>
                </Tooltip>
            </DialogActions>
            <DialogContent>
                <Typography variant="body2"><ReactMarkdown children={readmeText} /></Typography>
            </DialogContent>
        </Dialog>
    );
};
