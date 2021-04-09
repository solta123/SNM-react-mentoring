import './DeleteConfirmModal.css';
import React from 'react';
import { Button, Card, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";

const DeleteConfirmModal = React.forwardRef((props, ref) => {
    // eslint-disable-next-line no-unused-vars
    const { t, i18n } = useTranslation('common');

    return <Card className="ModalContainerCard" ref={ref}>
        <CloseIcon className="DeleteConfirmCloseIcon" onClick={props.onClose} />
        <Typography variant="h4">{t('delete_type', { type: t(props.type + '_with_object_affix') })}</Typography>
        <Typography className="DeleteConfirmText">{t('are_you_sure_to_delete', { type: t(props.type + '_with_object_affix') })}: {props.itemName}?</Typography>
        <Button variant="contained" color="primary" className="ConfirmButton" onClick={props.onConfirm}>{t('confirm')}</Button>
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