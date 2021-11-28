import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Button } from '@mui/material';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SimDialog: React.FC<{
    title?: string;
    content?: string;
    confirmText?: string;
    cancelText?: string;
    confirmFunc: () => void
}> = ({ title, content, confirmText = "确定", cancelText = "取消", confirmFunc, children }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <span onClick={() => handleClickOpen()}>
                {children}
            </span>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" color={"GrayText"}>
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="success" onClick={() => {
                        handleClose();
                        confirmFunc();
                    }}>{confirmText}</Button>
                    <Button onClick={handleClose} color="info">{cancelText}</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

export default SimDialog