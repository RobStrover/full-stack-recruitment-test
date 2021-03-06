/* eslint-disable no-console */
// Disabling 'no-console' as it's reasonable for this file to do some logging.


import 'bpk-stylesheets';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

ReactDOM.render(React.createElement(App), document.getElementById('root'));

// example api use
// TODO put this call somewhere sensible
// TODO send parameters to server - check out `server/src/live-pricing.js`
// console.log('fetching results from server...');

// fetch('http://localhost:4000/api/search')
//   .then(response => response.json())
//   .then((results) => {
//     console.log('TODO: something with these results:');
//     console.log(results);
//   })
//   .catch(console.error);

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
// })
//     .catch(function (error) {
//         console.log(error);
// });