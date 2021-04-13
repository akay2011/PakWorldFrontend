import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddSupplierFormDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [supplierName, setSupplierName] = React.useState('');
    const [supplierAddress, setSupplierAddress] = React.useState('');
    const [supplierContactNumber, setSupplierContactNumber] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (shouldAdd) => {
        setIsError(false)
        if(supplierName && supplierAddress && supplierContactNumber && shouldAdd){
            setOpen(false);
            props.onConfirm(supplierName, supplierAddress, supplierContactNumber)
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
                Add Supplier
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Supplier</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a supplier, please enter the name, address and contact number
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        onChange={(event)=> { setSupplierName(event.target.value)}}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="address"
                        label="Address"
                        type="text"
                        fullWidth
                        onChange={(event)=> { setSupplierAddress(event.target.value)}}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="contact-number"
                        label="Contact Number"
                        type="text"
                        fullWidth
                        onChange={(event)=> { setSupplierContactNumber(event.target.value)}}
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