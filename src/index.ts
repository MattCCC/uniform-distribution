import MersenneTwister from "mersenne-twister";

interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Given POI A with a latitude and longitude, generate POI B with a random latitude & longitude within min & max distance
 *
 * @param {number} latitude         Latitude
 * @param {number} longitude        Longitude
 * @param {number} minDistance      Minimum distance of POI from given coordinates (in metres)
 * @param {number} maxDistance      Maximum distance of POI from given coordinates (in metres)
 * @returns {object}                New, random coordinates (latitude & longitude)
 */
function getLocationAwayFromPOI(
  latitude: number,
  longitude: number,
  minDistance: number,
  maxDistance: number
): Coordinates {
  // random_excl() helps to ensure ∀x∊(0, 1)
  const { random_excl } = new MersenneTwister();
  const { PI, cos, acos, sqrt, min, max, floor } = Math;

  // Equatorial and polar radii extrema
  const earthPolarRadius = 6356.7523;
  const earthEquatorialRadius = 6378.137;

  // Convert metres to km
  minDistance = max(minDistance || 0, 1) / 1000;
  maxDistance = max(maxDistance || 0, 1) / 1000;

  // Degrees to rad
  const latitudeRad = latitude * (PI / 180);
  const longitudeRad = longitude * (PI / 180);

  // Constraints: minDistance < distance < maxDistance
  const md = minDistance ** 2;
  const distance = min(
    maxDistance,
    sqrt(random_excl() * (maxDistance ** 2 - md) + md)
  );

  // Use Haversine Formula so given [lat1, lon1], we need to find new [lat2, lon2]

  let newLatitude = cos(random_excl() * PI) * (distance / earthPolarRadius);

  let newLongitude =
    (cos(distance / earthEquatorialRadius) - cos(newLatitude)) /
      (cos(latitudeRad) * cos(newLatitude - latitudeRad)) +
    1;

  // Ensure that ∀x∊[-1, 1]
  newLongitude = acos(max(-1, min(1, newLongitude)));

  // Use simple randomness: -1 ∨ 1 so to either add or subtract from given coordinates
  const posNegLatitude = floor(random_excl() * 2) ? -1 : 1;
  const posNegLongitude = floor(random_excl() * 2) ? -1 : 1;

  newLatitude *= posNegLatitude;
  newLongitude *= posNegLongitude;

  // Add delta & convert rads to degress
  newLatitude = (latitudeRad + newLatitude) * (180 / PI);
  newLongitude = (longitudeRad + newLongitude) * (180 / PI);

  return {
    latitude: newLatitude,
    longitude: newLongitude,
  };
}

export { getLocationAwayFromPOI };
