import './DeleteConfirmModal.css';
import React from 'react';
import { Button, Card, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";

const DeleteConfirmModal = React.forwardRef((props, ref) => {
    // eslint-disable-next-line no-unused-vars
    const { t, i18n } = useTranslation('common');
    const tSource = 'NETFLIXROULETTE.DELETE_CONFIRM_MODAL.';

    return <Card className="ModalContainerCard" ref={ref}>
        <CloseIcon className="DeleteConfirmCloseIcon" onClick={props.onClose} />
        <Typography variant="h4">{t(tSource + 'DELETE_TYPE', { type: t(tSource + props.type.toUpperCase() + '_WITH_OBJECT_AFFIX') })}</Typography>
        <Typography className="DeleteConfirmText">
            {t(tSource + 'ARE_YOU_SURE_TO_DELETE', { type: t(tSource + props.type.toUpperCase() + '_WITH_OBJECT_AFFIX') })}: {props.itemName}?
        </Typography>
        <Button variant="contained" color="primary" className="ConfirmButton" onClick={props.onConfirm}>{t(tSource + 'CONFIRM')}</Button>
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