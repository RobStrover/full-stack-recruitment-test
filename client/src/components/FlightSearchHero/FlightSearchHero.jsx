import React from 'react';
import LongArrowRightIconLg from 'bpk-component-icon/lg/long-arrow-right';
import { withAlignment } from 'bpk-component-icon';
import { lineHeightXxl, iconSizeLg } from 'bpk-tokens/tokens/base.es6';
import BpkText from 'bpk-component-text';
import Hero from './../Hero';

import STYLES from './FlightSearchHero.scss';

const LargeAlignedArrowRight = withAlignment(
    LongArrowRightIconLg, lineHeightXxl, iconSizeLg
)

const AlignedLarge = withAlignment (
    'span', iconSizeLg, lineHeightXxl
)

const c = className => STYLES[className] || 'UNKNOWN';

const FlightSearchHero = (props) => (
    <div className={c('FlightSearchHero')}>
        <Hero>
            <BpkText tagName="h1" textStyle="xxl">
                <AlignedLarge>
                    EDI<LongArrowRightIconLg className={c('direction-icon__flight')} />LON
                </AlignedLarge>
            </BpkText>
            <BpkText tagName="p" textStyle="md">
                2 travellers, economy
            </BpkText>
        </Hero>
    </div>
);

export default FlightSearchHero;