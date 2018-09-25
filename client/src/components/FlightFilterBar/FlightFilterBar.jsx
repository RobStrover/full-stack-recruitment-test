import React from 'react';

import BpkButton from 'bpk-component-button';
import BpkSmallPriceAlertsIconSm from 'bpk-component-icon/sm/price-alerts'

import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';
import { withButtonAlignment } from 'bpk-component-icon';
import { lineHeightSm, iconSizeSm } from 'bpk-tokens/tokens/base.es6';


import STYLES from './FilterBar.scss';

const c = className => STYLES[className] || 'UNKNOWN';

const PriceAlertIcon = withButtonAlignment (BpkSmallPriceAlertsIconSm);


const FilterBar = () => (
    <BpkGridContainer>
        <BpkGridRow>
            <BpkGridColumn width={12} padded={false}>
                <BpkGridRow>
                    <BpkGridColumn width={2}>
                        <BpkButton link>Filter</BpkButton>
                    </BpkGridColumn>
                    <BpkGridColumn width={2}>
                        <BpkButton link>Sort</BpkButton>
                    </BpkGridColumn>
                    <BpkGridColumn width={6} offset={2} align={'right'}>
                        <BpkButton link><PriceAlertIcon/> Price Alerts</BpkButton>
                    </BpkGridColumn>
                </BpkGridRow>
            </BpkGridColumn>
        </BpkGridRow>
    </BpkGridContainer>
);

export default FilterBar;