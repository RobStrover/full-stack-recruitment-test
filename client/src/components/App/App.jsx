import React from 'react';

import STYLES from './App.scss';
import Header from './../Header';
import FlightSearchHero from './../FlightSearchHero';
import FlightFilterBar from '../FlightFilterBar';
import FlightCard from '../FlightCard';
import axios from 'axios';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore();

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

let cardDatas = [];

// axios.get('http://localhost:4000/api/search', {
//     params: {
//         originPlace: 'LHR',
//         destinationPlace: 'EDI',
//         outboundDate: '2019-01-20',
//         inboundDate: '2019-01-20',
//         cabinClass: 'economy',
//         adults: 1
//     }
// }).then(function (response) {
//     console.log(response);
//     cardDatas = response.data;
// })
//     .catch(function (error) {
//         console.log(error);
// });


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
        {cardDatas.map((cardData, key) => {
            return( <FlightCard key={key} cardData={cardData}></FlightCard> );
        })}
    </main>
  </div>
);

export default App;
