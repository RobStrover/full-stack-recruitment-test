function enrichLeg(leg, flightSegmentsMap) {
  const enrichedLeg = leg;
  enrichedLeg.SegmentIds = enrichedLeg.SegmentIds.map(segment => flightSegmentsMap.get(segment));

  return enrichedLeg;
}

function getLegMap(legs) {
  const legMap = new Map();

  legs.map(leg => legMap.set(leg.Id, leg));

  return legMap;
}

function getSegmentMap(segments) {
  const segmentMap = new Map();

  segments.map(segment => segmentMap.set(segment.Id, segment));

  return segmentMap;
}

function getAgentsMap(agents) {
  const agentMap = new Map();

  agents.map(agent => agentMap.set(agent.Id, agent));

  return agentMap;
}

function getPlacesMap(places) {
  const placesMap = new Map();

  places.map(place => placesMap.set(place.Id, place));

  return placesMap;
}

function normalizeFlightData(flightLegsMap, flightSegmentsMap, agentsMap, queryData, placesMap) {
  return function processItinerary(itinerary) {
    const OutboundLeg = enrichLeg(flightLegsMap.get(itinerary.OutboundLegId), flightSegmentsMap);
    const InboundLeg = enrichLeg(flightLegsMap.get(itinerary.InboundLegId), flightSegmentsMap);
    const PricingOption = itinerary.PricingOptions[0];

    const normalizedFlightData = {
      redirectLink: PricingOption.DeeplinkUrl,
      price: {
        currency: queryData.Currency,
        value: PricingOption.Price,
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
      },
    };
    return normalizedFlightData;
  };
}


function parseData(rawData) {
  const flightLegsMap = getLegMap(rawData.Legs);
  const flightSegmentsMap = getSegmentMap(rawData.Segments);
  const agentsMap = getAgentsMap(rawData.Agents);
  const queryData = rawData.Query;
  const placesMap = getPlacesMap(rawData.Places);

  return rawData.Itineraries.map(
    normalizeFlightData(
      flightLegsMap,
      flightSegmentsMap,
      agentsMap,
      queryData,
      placesMap),
  );
}

module.exports = { parse: parseData };
