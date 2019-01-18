const papoi = require('./flight-search-data');

const flightLegsMap = getLegMap(papoi.Legs);
const flightSegmentsMap = getSegmentMap(papoi.Segments);
const JourneyItineraries = papoi.Itineraries;

// const enrichedLeg = enrichLeg(flightLegsMap.get('11235-1811130700--32356-0-13771-1811130820'), flightSegmentsMap);

const FlightCardData = normalizeFlightData(JourneyItineraries[0]);

function normalizeFlightData(itinerary) {

    const OutboundLeg = enrichLeg(flightLegsMap.get(itinerary.OutboundLegId), flightSegmentsMap);
    const InboundLeg = enrichLeg(flightLegsMap.get(itinerary.InboundLegId), flightSegmentsMap);

    const requiredFlightData = {
        redirectLink: "",
        price: {
            currency: "",
            value: ""
        },
        agentWebUrl: "",
        outboundFlight: {
            leavingTime: OutboundLeg.Departure,
            arrivingTime: OutboundLeg.Arrival,
            outboundAirport: "",
            arrivalAirport: "",
            flightDuration: OutboundLeg.Duration,
            flightStyle: function getFlightStyle() { return 'test' },
            flightAgent: "",
        },
        returnFlight: {
            leavingTime: "",
            arrivingTime: "",
            outboundAirport: "",
            arrivalAirport: "",
            flightDuration: "",
            flightStyle: "",
            flightAgent: "",
        }
    };

    console.log(requiredFlightData);
    return;

}

function enrichLeg(leg, flightSegmentsMap) {

    leg.SegmentIds = leg.SegmentIds.map(segment => flightSegmentsMap.get(segment));

    return leg;
}

function getLegMap(leg) {

    const legMap = new Map();

    leg.map((leg) => {
        legMap.set(leg.Id, leg)
    });

    return legMap;
}

function getSegmentMap(segments) {

    const segmentMap = new Map();

    segments.map((segment) => {
        segmentMap.set(segment.Id, segment)
    });

    return segmentMap;
}