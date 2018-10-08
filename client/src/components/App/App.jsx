import React from 'react';

import STYLES from './App.scss';
import Header from './../Header';
import FlightSearchHero from './../FlightSearchHero';
import FlightFilterBar from '../FlightFilterBar';
import FlightCard from '../FlightCard';

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

const cardData = {
    outbound: {
        depart: '07:00',
        arrive: '08:30',
        duration: '1h 30',
        type: 'Direct',
        from: 'EDI',
        to: 'LHR'
    },
    inbound: {
        depart: '14:30',
        arrive: '16:00',
        duration: '1h 30',
        type: 'Direct',
        from: 'LHR',
        to: 'EDI'
    },
    misc: {
        price: '£98',
        source: 'omegaflightstore.com',
        airlineIcon: 'https://logos.skyscnr.com/images/airlines/favicon/EZ.png'
    }
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
        <FlightCard cardData={cardData}></FlightCard>
    </main>
  </div>
);

export default App;
