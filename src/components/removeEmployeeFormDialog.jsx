import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function RemoveEmployeeFormDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [employeeId, setEmployeeId] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (shouldRemove) => {
        setIsError(false)
        if(employeeId && shouldRemove){
            setOpen(false);
            props.onConfirm(employeeId)
        }else {
            if(shouldRemove){
                setIsError(true)
            }
            else {
                setOpen(false);
            }

        }
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={()=> handleClickOpen()}>
                Remove Employee
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Remove Employee</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To remove an employee, please enter the ID
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="id"
                        label="Id"
                        type="text"
                        fullWidth
                        onChange={(event)=> { setEmployeeId(event.target.value)}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleClose(true)} color="primary">
                        Remove
                    </Button>

                </DialogActions>
                {
                    isError && (
                        <div>
                            <p>Please provide employee ID</p>
                        </div>
                    )
                }
            </Dialog>
        </div>
    );
}