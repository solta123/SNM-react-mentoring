import React from 'react';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer
        .create(<div class="root">
            <header class="MuiPaper-root MuiAppBar-root MuiAppBar-positionStatic MuiAppBar-colorPrimary MuiPaper-elevation4">
                <div class="MuiToolbar-root MuiToolbar-regular MuiToolbar-gutters">
                    <a aria-current="page" class="title active" href="/">
                        <h6 class="MuiTypography-root MuiTypography-h6">
                            <b>netflix</b>Roulette
                        </h6>
                    </a>
                    <button class="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-colorInherit"
                        tabindex="0" type="button">
                        <span class="MuiButton-label">
                            <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                            </svg>
                            Add movie
                        </span>
                        <span class="MuiTouchRipple-root"></span>
                    </button>
                </div>
            </header>
        </div>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});