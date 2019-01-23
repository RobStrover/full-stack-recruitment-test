import React from 'react';

import STYLES from './App.scss';
import Header from './../Header';
import FlightSearchHero from './../FlightSearchHero';
import FlightFilterBar from '../FlightFilterBar';
import FlightCard from '../FlightCard';
import axios from 'axios';

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

let cardDatas = [{
    "redirectLink": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=zOm%2f6FCg6gDOE4rdoXmlE7hM3pD0U74mG5ftPhdP2gYHYNfl2GcrqQa0epbDDGLd&url=https%3a%2f%2fwww.skyscanner.net%2ftransport_deeplink%2f4.0%2fUK%2fen-GB%2fGBP%2flmuk%2f2%2f13554.11235.2019-01-24%2c11235.13554.2019-01-24%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32480%7c1434%7c13554%7c2019-01-24T07%3a55%7c11235%7c2019-01-24T09%3a15%7c80%7cYADDV3RO%7cY%7c-%2cflight%7c-32480%7c8857%7c11235%7c2019-01-24T16%3a10%7c11154%7c2019-01-24T17%3a25%7c75%7cSEIRO%7cS%7c-%3bflight%7c-32480%7c5952%7c11154%7c2019-01-25T06%3a40%7c13554%7c2019-01-25T08%3a05%7c85%7cMEIRO%7cM%7c-%26carriers%3d-32480%26operators%3d-32480%2c-32754%3b-32753%26passengers%3d1%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d528.16%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_b2b%26q_ids%3dlmuk.13554.11235.190124.190124.1..E%7c-4666886165877698603%26commercial_filters%3dfalse%26q_datetime_utc%3d2019-01-23T23%3a10%3a00",
    "price": {
        "currency": "£",
        "value": 528.16
    },
    "agentName": "lastminute.com",
    "outboundFlight": {
        "leavingTime": "07:55",
        "arrivingTime": "09:15",
        "outboundAirport": "LHR",
        "arrivalAirport": "EDI",
        "flightDuration": "1h 20",
        "stops": "Direct",
        "flightAgentImage": "https://s1.apideeplink.com/images/websites/lmuk.png"
    },
    "returnFlight": {
        "leavingTime": "16:10",
        "arrivingTime": "08:05",
        "outboundAirport": "EDI",
        "arrivalAirport": "LHR",
        "flightDuration": "15h 55",
        "stops": "Direct",
        "flightAgentImage": "https://s1.apideeplink.com/images/websites/lmuk.png"
    }
},
    {
        "redirectLink": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=zOm%2f6FCg6gDOE4rdoXmlE7hM3pD0U74mG5ftPhdP2gYHYNfl2GcrqQa0epbDDGLd&url=https%3a%2f%2fwww.skyscanner.net%2ftransport_deeplink%2f4.0%2fUK%2fen-GB%2fGBP%2fgtuk%2f2%2f13554.11235.2019-01-24%2c11235.13554.2019-01-24%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32302%7c2104%7c13554%7c2019-01-24T11%3a20%7c11235%7c2019-01-24T13%3a00%7c100%7c-%7c-%7c-%2cflight%7c-32302%7c693%7c11235%7c2019-01-24T20%3a20%7c9889%7c2019-01-24T21%3a15%7c55%7c-%7c-%7c-%3bflight%7c-32753%7c30%7c9889%7c2019-01-25T08%3a50%7c13554%7c2019-01-25T10%3a20%7c90%7c-%7c-%7c-%26carriers%3d-32302%2c-32753%26operators%3d-32302%2c-32302%3b-32753%26passengers%3d1%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d405.53%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_b2b%26q_ids%3dgtuk.13554.11235.190124.190124.1..E%7c8821078425380235366%26commercial_filters%3dfalse%26q_datetime_utc%3d2019-01-23T23%3a10%3a00",
        "price": {
            "currency": "£",
            "value": 405.53
        },
        "agentName": "GotoGate",
        "outboundFlight": {
            "leavingTime": "11:20",
            "arrivingTime": "13:00",
            "outboundAirport": "LHR",
            "arrivalAirport": "EDI",
            "flightDuration": "1h 40",
            "stops": "Direct",
            "flightAgentImage": "https://s1.apideeplink.com/images/websites/gtuk.png"
        },
        "returnFlight": {
            "leavingTime": "20:20",
            "arrivingTime": "10:20",
            "outboundAirport": "EDI",
            "arrivalAirport": "LHR",
            "flightDuration": "14h 0",
            "stops": "Direct",
            "flightAgentImage": "https://s1.apideeplink.com/images/websites/gtuk.png"
        }
    },
    {
        "redirectLink": "http://partners.api.skyscanner.net/apiservices/deeplink/v2?_cje=zOm%2f6FCg6gDOE4rdoXmlE7hM3pD0U74mG5ftPhdP2gYHYNfl2GcrqQa0epbDDGLd&url=https%3a%2f%2fwww.skyscanner.net%2ftransport_deeplink%2f4.0%2fUK%2fen-GB%2fGBP%2flmuk%2f2%2f13554.11235.2019-01-24%2c11235.13554.2019-01-24%2fair%2ftrava%2fflights%3fitinerary%3dflight%7c-32480%7c1434%7c13554%7c2019-01-24T07%3a55%7c11235%7c2019-01-24T09%3a15%7c80%7cYV3RO%7cY%7c-%2cflight%7c-32480%7c8857%7c11235%7c2019-01-24T16%3a10%7c11154%7c2019-01-24T17%3a25%7c75%7cSEIRO%7cS%7c-%3bflight%7c-32480%7c5960%7c11154%7c2019-01-24T19%3a45%7c13554%7c2019-01-24T21%3a05%7c80%7cYEIRO%7cY%7c-%26carriers%3d-32480%26operators%3d-32480%2c-32754%3b-32753%26passengers%3d1%26channel%3ddataapi%26cabin_class%3deconomy%26facilitated%3dfalse%26ticket_price%3d965.19%26is_npt%3dfalse%26is_multipart%3dfalse%26client_id%3dskyscanner_b2b%26q_ids%3dlmuk.13554.11235.190124.190124.1..E%7c-8366088286892593952%26commercial_filters%3dfalse%26q_datetime_utc%3d2019-01-23T23%3a10%3a00",
        "price": {
            "currency": "£",
            "value": 965.19
        },
        "agentName": "lastminute.com",
        "outboundFlight": {
            "leavingTime": "07:55",
            "arrivingTime": "09:15",
            "outboundAirport": "LHR",
            "arrivalAirport": "EDI",
            "flightDuration": "1h 20",
            "stops": "Direct",
            "flightAgentImage": "https://s1.apideeplink.com/images/websites/lmuk.png"
        },
        "returnFlight": {
            "leavingTime": "16:10",
            "arrivingTime": "21:05",
            "outboundAirport": "EDI",
            "arrivalAirport": "LHR",
            "flightDuration": "4h 55",
            "stops": "Direct",
            "flightAgentImage": "https://s1.apideeplink.com/images/websites/lmuk.png"
        }
    },];

// axios.get('http://localhost:4000/api/search', {
//     params: {
//         originPlace: 'LHR',
//         destinationPlace: 'EDI',
//         outboundDate: '2019-01-24',
//         inboundDate: '2019-01-24',
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
