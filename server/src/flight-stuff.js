const papoi = require('./flight-search-data');

const flightLegsMap = getLegMap(papoi.Legs);
const flightSegmentsMap = getSegmentMap(papoi.Segments);
const agentsMap = getAgentsMap(papoi.Agents);
const JourneyItineraries = papoi.Itineraries;
const queryData = papoi.Query;
const placesMap = getPlacesMap(papoi.Places);

// const enrichedLeg = enrichLeg(flightLegsMap.get('11235-1811130700--32356-0-13771-1811130820'), flightSegmentsMap);

const normalizedFlightData = normalizeFlightData(JourneyItineraries[0]);

function normalizeFlightData(itinerary) {

    const OutboundLeg = enrichLeg(flightLegsMap.get(itinerary.OutboundLegId), flightSegmentsMap);
    const InboundLeg = enrichLeg(flightLegsMap.get(itinerary.InboundLegId), flightSegmentsMap);
    const PricingOption = itinerary.PricingOptions[0];

    const normalizedFlightData = {
        redirectLink: PricingOption.DeeplinkUrl,
        price: {
            currency: queryData.Currency,
            value: PricingOption.Price
        },
        agentName: agentsMap.get(PricingOption.Agents[0]).Name,
        outboundFlight: {
            leavingTime: OutboundLeg.Departure,
            arrivingTime: OutboundLeg.Arrival,
            outboundAirport: placesMap.get(OutboundLeg.OriginStation).Code,
            arrivalAirport: placesMap.get(OutboundLeg.DestinationStation).Code,
            flightDuration: OutboundLeg.Duration,
            stops: OutboundLeg.Stops.length,
            flightAgentImage: agentsMap.get(PricingOption.Agents[0]).ImageUrl,
        },
        returnFlight: {
            leavingTime: InboundLeg.Departure,
            arrivingTime: InboundLeg.Arrival,
            outboundAirport: placesMap.get(InboundLeg.OriginStation).Code,
            arrivalAirport: placesMap.get(InboundLeg.DestinationStation).Code,
            flightDuration: InboundLeg.Duration,
            stops: InboundLeg.Stops.length,
            flightAgentImage: agentsMap.get(PricingOption.Agents[0]).ImageUrl,
        }
    };
    console.log(normalizedFlightData);
    return normalizedFlightData;

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

function getAgentsMap(agents) {

    const agentMap = new Map();

    agents.map((agent) => {
        agentMap.set(agent.Id, agent);
    });

    return agentMap;
}

function getPlacesMap(places) {

    const placesMap = new Map();

    places.map((place) => {
        placesMap.set(place.Id, place);
    });

    return placesMap;
}