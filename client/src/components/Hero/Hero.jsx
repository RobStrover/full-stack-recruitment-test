import React from 'react';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';

import STYLES from './Hero.scss';

const c = className => STYLES[className] || 'UNKNOWN';

const Hero = (props) => (
    <div className={c('Hero')}>
        <BpkGridContainer>
            <BpkGridRow>
                <BpkGridColumn width={12}>
                    {props.children}
                </BpkGridColumn>
            </BpkGridRow>
        </BpkGridContainer>
    </div>
);

export default Hero;