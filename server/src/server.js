/* eslint-disable no-console */
// Disabling 'no-console' as it's reasonable for this file to do some logging.

const express = require('express');
const { check, validationResult } = require('express-validator/check');
const papoi = require('./flight-search-data');

const app = express();
const livePricing = require('./live-pricing');

app.disable('x-powered-by');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/search', [
    // check('originPlace').exists().isLength({ max: 4 }).trim().escape(),
    // check('destinationPlace').exists().isLength({ max: 4 }).trim().escape(),
    // check('outboundDate').exists().isLength({ min: 10 }, { max: 10 }).trim().escape(),
    // check('inboundDate').isLength({ min: 10 }, { max: 10 }).trim().escape(),
    // check('cabinClass').optional({ nullable: true }).isIn(['economy', 'premiumeconomy', 'business', 'first']),
    // check('adults').exists().isInt(),
    // check('children').optional({ nullable: true }).isInt(),
    // check('infants').optional({ nullable: true }).isInt(),
    // check('includeCarriers').optional({ nullable: true }),
    // check('groupPricing').optional({ nullable: true }),
], async (req, res) => {
    res.json(papoi);
    return;
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(422).json({ errors: errors.array() });
    // }
  try {
    const results = await livePricing.search(req.query);
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
    console.error(err);
  }
});

app.listen(4000, () => {
  console.log('Node server listening on http://localhost:4000');
});
