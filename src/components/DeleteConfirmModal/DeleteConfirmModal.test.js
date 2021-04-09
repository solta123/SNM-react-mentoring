import React, { Suspense } from 'react';
import renderer from 'react-test-renderer';
import DeleteConfirmModal from './DeleteConfirmModal';
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

describe('DeleteConfirmModal', () => {
    it('should render correctly with inputs', () => {
        const tree = renderer.create(
            <Suspense fallback="loading">
                <I18nextProvider i18n={i18next}>
                    <DeleteConfirmModal type={'movie'} itemName={'Star Wars'} />
                </I18nextProvider>
            </Suspense>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});