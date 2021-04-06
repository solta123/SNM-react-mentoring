import React from 'react';
import renderer from 'react-test-renderer';
import DeleteConfirmModal from './DeleteConfirmModal';

describe('DeleteConfirmModal', () => {
    it('should render correctly with inputs', () => {
        const tree = renderer.create(<DeleteConfirmModal type={'movie'} itemName={'Star Wars'} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});