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

function getTransfersText(stops) {
  if (stops > 1) return "With Transfers";
  return "Direct";
}

function getCurrencySymbol(currencyCode) {
  const currencySymbols = {
    GBP: "£"
  };
  return currencySymbols[currencyCode]
}

function convertHoursToHoursMinutes(rawMinutes) {
  let hours   = Math.floor(rawMinutes / 60);
  let minutes = rawMinutes % 60;
  return `${hours}h ${minutes}`;
}

function getTimeFromDateTime(dateTime) {
  return dateTime.substr(11, 5);
}

function normalizeFlightData(flightLegsMap, flightSegmentsMap, agentsMap, queryData, placesMap) {
  return function processItinerary(itinerary) {
    const OutboundLeg = enrichLeg(flightLegsMap.get(itinerary.OutboundLegId), flightSegmentsMap);
    const InboundLeg = enrichLeg(flightLegsMap.get(itinerary.InboundLegId), flightSegmentsMap);
    const PricingOption = itinerary.PricingOptions[0];

    const normalizedFlightData = {
      redirectLink: PricingOption.DeeplinkUrl,
      price: {
        currency: getCurrencySymbol(queryData.Currency),
        value: PricingOption.Price,
      },
      agentName: agentsMap.get(PricingOption.Agents[0]).Name,
      outboundFlight: {
        leavingTime: getTimeFromDateTime(OutboundLeg.Departure),
        arrivingTime: getTimeFromDateTime(OutboundLeg.Arrival),
        outboundAirport: placesMap.get(OutboundLeg.OriginStation).Code,
        arrivalAirport: placesMap.get(OutboundLeg.DestinationStation).Code,
        flightDuration: convertHoursToHoursMinutes(OutboundLeg.Duration),
        stops: getTransfersText(InboundLeg.Stops.length),
        flightAgentImage: agentsMap.get(PricingOption.Agents[0]).ImageUrl,
      },
      returnFlight: {
        leavingTime: getTimeFromDateTime(InboundLeg.Departure),
        arrivingTime: getTimeFromDateTime(InboundLeg.Arrival),
        outboundAirport: placesMap.get(InboundLeg.OriginStation).Code,
        arrivalAirport: placesMap.get(InboundLeg.DestinationStation).Code,
        flightDuration: convertHoursToHoursMinutes(InboundLeg.Duration),
        stops: getTransfersText(InboundLeg.Stops.length),
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
