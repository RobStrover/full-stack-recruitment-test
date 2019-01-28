import React from 'react';

import STYLES from './App.scss';
import Header from './../Header';
import FlightSearchHero from './../FlightSearchHero';
import FlightFilterBar from '../FlightFilterBar';
import FlightCard from '../FlightCard';
import axios from 'axios';

const c = className => STYLES[className] || 'UNKNOWN';

const filters = {
    travellers: 2,
    class: "economy"
};

const destinations = {
    from: 'EDI',
    to: 'LHR'
};

const hasDestinations = (destinations) => {
    if (!destinations.from || !destinations.to) return;
    return (<FlightSearchHero from={destinations.from} to={destinations.to} filters={filters} />);
};

class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            cardDatas: [],
            loading: true
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/search', {
            params: {
                originPlace: destinations.from,
                destinationPlace: destinations.to,
                outboundDate: '2019-01-29',
                inboundDate: '2019-01-29',
                cabinClass: 'economy',
                adults: 1
            }
        }).then((response) => {
            console.log(response);
            this.setState({
                cardDatas: response.data,
                loading: false,
                error: null
            })
        })
        .catch((error) => {
            this.setState({
                cardDatas: [],
                loading: false,
                error: 'Regrettably, an error occurred.'
            });
        });
    }

    render() {
        return (<div className={c('App')}>
            <Header />
            { hasDestinations(destinations) }
            <FlightFilterBar />
            { this.state.loading && '<p>Loading</p>' }
            { this.state.error && this.state.error }
            <main className={c('App__main')}>
                {this.state.cardDatas.map((cardData, key) => {
                    return( <FlightCard key={key} cardData={cardData}></FlightCard> );
                })}
            </main>
        </div>)
    }
};

export default App;
