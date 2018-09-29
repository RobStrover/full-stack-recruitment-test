import React from 'react';

import STYLES from './App.scss';
import Header from './../Header';
import FlightSearchHero from './../FlightSearchHero';
import FlightFilterBar from '../FlightFilterBar';

import BpkCard from 'bpk-component-card';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';

const c = className => STYLES[className] || 'UNKNOWN';

const filters = {
    travellers: 2,
    class: "economy"
};

const destinations = {
    from: 'EDI',
    to: 'LON'
};

const hasDestinations = (destinations) => {
    if (!destinations.from || !destinations.to) return;
    return (<FlightSearchHero from={destinations.from} to={destinations.to} filters={filters} />);
};

const App = () => (
  <div className={c('App')}>
    <Header />
      { hasDestinations(destinations) }
    <FlightFilterBar />
    <main className={c('App__main')}>
        <BpkCard padded={false}>
            <BpkGridContainer>
                <BpkGridRow>
                    <BpkGridColumn width={6}>
                        <BpkGridRow>
                            <BpkGridColumn width={2}>
                                img
                            </BpkGridColumn>
                            <BpkGridColumn width={4}>
                                <BpkGridRow>
                                    <BpkGridColumn width={12}>
                                        07:00
                                    </BpkGridColumn>
                                </BpkGridRow>
                                <BpkGridRow>
                                    <BpkGridColumn width={12}>
                                        EDI
                                    </BpkGridColumn>
                                </BpkGridRow>
                            </BpkGridColumn>
                            <BpkGridColumn width={2}>
                                ->
                            </BpkGridColumn>
                            <BpkGridColumn width={4}>
                                <BpkGridRow>
                                    <BpkGridColumn width={12}>
                                        07:00
                                    </BpkGridColumn>
                                </BpkGridRow>
                                <BpkGridRow>
                                    <BpkGridColumn width={12}>
                                        LHR
                                    </BpkGridColumn>
                                </BpkGridRow>
                            </BpkGridColumn>
                        </BpkGridRow>
                    </BpkGridColumn>
                    <BpkGridColumn width={6} align={'right'}>
                        <BpkGridRow>
                            <BpkGridColumn width={12}>
                                1h 30
                            </BpkGridColumn>
                        </BpkGridRow>
                        <BpkGridRow>
                            <BpkGridColumn width={12}>
                                Direct
                            </BpkGridColumn>
                        </BpkGridRow>
                    </BpkGridColumn>
                </BpkGridRow>
                <BpkGridRow>
                    <BpkGridColumn width={8}>

                    </BpkGridColumn>
                    <BpkGridColumn width={4}>

                    </BpkGridColumn>
                </BpkGridRow>
            </BpkGridContainer>
        </BpkCard>
    </main>
  </div>
);

export default App;
