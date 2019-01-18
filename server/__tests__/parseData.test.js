const { parse } = require('../src/dataParser');
const fixtures = require('../src/fixtures/data.fixtures');

test('Function returns an object', () => {
    expect(parse(fixtures)).toMatchSnapshot();
})