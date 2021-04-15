import i18next from "i18next";
import hu from "./languages/hu.json";
import en from "./languages/en.json";

export const initTranslations = () => {
    i18next.init({
        interpolation: { escapeValue: false },
        lng: sessionStorage.getItem('lang') || 'en',
        resources: {
            en: {
                common: en
            },
            hu: {
                common: hu
            },
        },
    });
};

export default initTranslations;

