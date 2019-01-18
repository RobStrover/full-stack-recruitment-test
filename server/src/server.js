/* eslint-disable no-console */
// Disabling 'no-console' as it's reasonable for this file to do some logging.

const express = require('express');
const { check, validationResult } = require('express-validator/check');
const dataParser = require('./dataParser');
const livePricing = require('./live-pricing');

const app = express();

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
  check('originPlace').exists().isLength({ max: 4 }).trim()
    .escape(),
  check('destinationPlace').exists().isLength({ max: 4 }).trim()
    .escape(),
  check('outboundDate').exists().isLength({ min: 10 }, { max: 10 }).trim()
    .escape(),
  check('inboundDate').isLength({ min: 10 }, { max: 10 }).trim().escape(),
  check('cabinClass').optional({ nullable: true }).isIn(['economy', 'premiumeconomy', 'business', 'first']),
  check('adults').exists().isInt(),
  check('children').optional({ nullable: true }).isInt(),
  check('infants').optional({ nullable: true }).isInt(),
  check('includeCarriers').optional({ nullable: true }),
  check('groupPricing').optional({ nullable: true }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const results = await livePricing.search(req.query);
    return res.json(dataParser.parse(results));
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
});

app.listen(4000, () => {
  console.log('Node server listening on http://localhost:4000');
});
