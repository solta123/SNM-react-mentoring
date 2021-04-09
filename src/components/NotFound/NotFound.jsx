import { Button } from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const NotFound = () => {
    // eslint-disable-next-line no-unused-vars
    const { t, i18n } = useTranslation('common');

    return (
        <div className="text-center">
            <h2>{t('page_not_found')}</h2>
            <NavLink to="/">
                <Button variant="outlined" color="primary">
                    {t('back_to_home_screen')}
                </Button>
            </NavLink>
        </div>
    );
};

export default NotFound;
