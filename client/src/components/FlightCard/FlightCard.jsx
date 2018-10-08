import React from 'react';

import BpkButton from 'bpk-component-button';
import BpkCard from 'bpk-component-card';
import BpkComponentText from 'bpk-component-text';
import BpkImage from 'bpk-component-image';
import LongArrowRightIconSm from 'bpk-component-icon/sm/long-arrow-right';
import { withAlignment } from 'bpk-component-icon';
import { lineHeightXxl, iconSizeLg } from 'bpk-tokens/tokens/base.es6';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';

import STYLES from './FlightCard.scss';

const c = className => STYLES[className] || 'UNKNOWN';

const LargeAlignedArrowRight = withAlignment(
    LongArrowRightIconSm, lineHeightXxl, iconSizeLg
);

const FlightCard = ({cardData}) => (
    <BpkCard className={c('FlightCard')} padded={true}>
        <BpkGridContainer>
            <BpkGridRow>
                <BpkGridColumn padded={false} width={6}>
                    <BpkGridRow>
                        <BpkGridColumn className={c('AirlineImage')} padded={false} width={2}>
                            <BpkImage
                                altText="image description"
                                width={128}
                                height={128}
                                src={ cardData.misc.airlineIcon }
                        />
                        </BpkGridColumn>
                        <BpkGridColumn padded={false} width={4}>
                            <BpkGridRow>
                                <BpkGridColumn padded={false} width={12}>
                                    <BpkComponentText className={c('FlightTime')} tagName="p" textStyle="base">{ cardData.outbound.depart }</BpkComponentText>
                                </BpkGridColumn>
                            </BpkGridRow>
                            <BpkGridRow>
                                <BpkGridColumn padded={false} width={12}>
                                    <BpkComponentText className={c('AirportCode')} tagName="p" textStyle="base">{ cardData.outbound.from }</BpkComponentText>
                                </BpkGridColumn>
                            </BpkGridRow>
                        </BpkGridColumn>
                        <BpkGridColumn className={c('direction-icon-parent__flight')} padded={false} width={2}>
                            <LargeAlignedArrowRight />
                        </BpkGridColumn>
                        <BpkGridColumn padded={false} width={4}>
                            <BpkGridRow>
                                <BpkGridColumn padded={false} width={12}>
                                    <BpkComponentText className={c('FlightTime')} tagName="p" textStyle="base">{ cardData.outbound.arrive }</BpkComponentText>
                                </BpkGridColumn>
                            </BpkGridRow>
                            <BpkGridRow>
                                <BpkGridColumn padded={false} width={12}>
                                    <BpkComponentText className={c('AirportCode')} tagName="p" textStyle="base">{ cardData.outbound.to }</BpkComponentText>
                                </BpkGridColumn>
                            </BpkGridRow>
                        </BpkGridColumn>
                    </BpkGridRow>
                </BpkGridColumn>
                <BpkGridColumn padded={false} width={6} align={'right'}>
                    <BpkGridRow>
                        <BpkGridColumn padded={false} width={12}>
                            <BpkComponentText tagName="p" textStyle="sm">{ cardData.outbound.duration }</BpkComponentText>
                        </BpkGridColumn>
                    </BpkGridRow>
                    <BpkGridRow>
                        <BpkGridColumn padded={false} width={12}>
                            <BpkComponentText className={c('FlightType')} tagName="p" textStyle="sm">{ cardData.outbound.type }</BpkComponentText>
                        </BpkGridColumn>
                    </BpkGridRow>
                </BpkGridColumn>
            </BpkGridRow>

            <BpkGridRow>
                <BpkGridColumn padded={false} width={6}>
                    <BpkGridRow>
                        <BpkGridColumn className={c('AirlineImage')} padded={false} width={2}>
                            <BpkImage
                                altText="image description"
                                width={128}
                                height={128}
                                src={ cardData.misc.airlineIcon }
                            />
                        </BpkGridColumn>
                        <BpkGridColumn padded={false} width={4}>
                            <BpkGridRow>
                                <BpkGridColumn padded={false} width={12}>
                                    <BpkComponentText className={c('FlightTime')} tagName="p" textStyle="base">{ cardData.inbound.depart }</BpkComponentText>
                                </BpkGridColumn>
                            </BpkGridRow>
                            <BpkGridRow>
                                <BpkGridColumn padded={false} width={12}>
                                    <BpkComponentText className={c('AirportCode')} tagName="p" textStyle="base">{ cardData.inbound.from }</BpkComponentText>
                                </BpkGridColumn>
                            </BpkGridRow>
                        </BpkGridColumn>
                        <BpkGridColumn className={c('direction-icon-parent__flight')} padded={false} width={2}>
                            <LargeAlignedArrowRight />
                        </BpkGridColumn>
                        <BpkGridColumn padded={false} width={4}>
                            <BpkGridRow>
                                <BpkGridColumn padded={false} width={12}>
                                    <BpkComponentText className={c('FlightTime')} tagName="p" textStyle="base">{ cardData.inbound.arrive }</BpkComponentText>
                                </BpkGridColumn>
                            </BpkGridRow>
                            <BpkGridRow>
                                <BpkGridColumn padded={false} width={12}>
                                    <BpkComponentText className={c('AirportCode')} tagName="p" textStyle="base">{ cardData.inbound.to }</BpkComponentText>
                                </BpkGridColumn>
                            </BpkGridRow>
                        </BpkGridColumn>
                    </BpkGridRow>
                </BpkGridColumn>
                <BpkGridColumn padded={false} width={6} align={'right'}>
                    <BpkGridRow>
                        <BpkGridColumn padded={false} width={12}>
                            <BpkComponentText tagName="p" textStyle="sm">{ cardData.inbound.duration }</BpkComponentText>
                        </BpkGridColumn>
                    </BpkGridRow>
                    <BpkGridRow>
                        <BpkGridColumn padded={false} width={12}>
                            <BpkComponentText className={c('FlightType')} tagName="p" textStyle="sm">{ cardData.inbound.type }</BpkComponentText>
                        </BpkGridColumn>
                    </BpkGridRow>
                </BpkGridColumn>
            </BpkGridRow>

            <BpkGridRow>
                <BpkGridColumn padded={false} width={8}>
                    <BpkGridRow>
                        <BpkGridColumn padded={false} width={12}>
                            <BpkComponentText className={c('FlightPrice')} tagName="p" textStyle="xl">{ cardData.misc.price }</BpkComponentText>
                        </BpkGridColumn>
                    </BpkGridRow>
                    <BpkGridRow>
                        <BpkGridColumn padded={false} width={12}>
                            <BpkComponentText className={c('ProviderUrl')} tagName="p" textStyle="base">{ cardData.misc.source }</BpkComponentText>
                        </BpkGridColumn>
                    </BpkGridRow>
                </BpkGridColumn>
                <BpkGridColumn padded={true} width={4}>
                    <BpkButton large>Select</BpkButton>
                </BpkGridColumn>
            </BpkGridRow>
        </BpkGridContainer>
    </BpkCard>
);

export default FlightCard;