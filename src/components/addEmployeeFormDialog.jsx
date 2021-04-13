import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddEmployeeFormDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [employeeLastname, setEmployeeLastname] = React.useState('');
    const [employeeFirstname, setEmployeeFirstname] = React.useState('');
    const [employeeAddress, setEmployeeAddress] = React.useState('');
    const [employeeCity, setEmployeeCity] = React.useState('');
    const [employeeAge, setEmployeeAge] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (shouldAdd) => {
        setIsError(false)
        if(employeeLastname && employeeFirstname && employeeAddress && employeeCity && employeeAge && shouldAdd){
            setOpen(false);
            props.onConfirm(employeeLastname, employeeFirstname, employeeAddress, employeeCity, employeeAge)
        }else {

            if(shouldAdd){
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
                Add Employee
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Employee</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add an employee, please enter the lastname, firstname, address, city and age
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="lastname"
                        label="Lastname"
                        type="text"
                        fullWidth
                        onChange={(event)=> { setEmployeeLastname(event.target.value)}}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="firstname"
                        label="Firstname"
                        type="text"
                        fullWidth
                        onChange={(event)=> { setEmployeeFirstname(event.target.value)}}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="address"
                        label="Address"
                        type="text"
                        fullWidth
                        onChange={(event)=> { setEmployeeAddress(event.target.value)}}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="city"
                        label="City"
                        type="text"
                        fullWidth
                        onChange={(event)=> { setEmployeeCity(event.target.value)}}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="age"
                        label="Age"
                        type="text"
                        fullWidth
                        onChange={(event)=> { setEmployeeAge(event.target.value)}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(false)}color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleClose(true)} color="primary">
                        Add
                    </Button>

                </DialogActions>
                {
                    isError && (
                        <div>
                            <p>Please provide all the data</p>
                        </div>
                    )
                }
            </Dialog>
        </div>
    );
}