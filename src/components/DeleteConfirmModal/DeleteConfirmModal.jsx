import './DeleteConfirmModal.css';
import React from 'react';
import { Button, Card, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';

const DeleteConfirmModal = React.forwardRef((props, ref) => {
    return <Card className="ModalContainerCard" ref={ref}>
        <CloseIcon className="DeleteConfirmCloseIcon" onClick={props.onClose} />
        <Typography variant="h4">Delete {props.type}</Typography>
        <Typography className="DeleteConfirmText">Are you sure you want to delete this {props.type}: {props.itemName}?</Typography>
        <Button variant="contained" color="primary" className="ConfirmButton" onClick={props.onConfirm}>Confirm</Button>
    </Card>
});

DeleteConfirmModal.displayName = 'DeleteConfirmModal';

DeleteConfirmModal.propTypes = {
    onClose: PropTypes.func,
    type: PropTypes.string,
    itemName: PropTypes.string,
    onConfirm: PropTypes.func
}

export default DeleteConfirmModal;