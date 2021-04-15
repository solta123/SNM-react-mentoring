import { Button } from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const NotFound = () => {
    // eslint-disable-next-line no-unused-vars
    const { t, i18n } = useTranslation('common');
    const tSource = 'NETFLIXROULETTE.NOT_FOUND.';

    return (
        <div className="text-center">
            <h2>{t(tSource + 'PAGE_NOT_FOUND')}</h2>
            <NavLink to="/">
                <Button variant="outlined" color="primary">
                    {t(tSource + 'BACK_TO_HOME_SCREEN')}
                </Button>
            </NavLink>
        </div>
    );
};

export default NotFound;
