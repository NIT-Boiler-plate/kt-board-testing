const seoulLat = 37.5665; // Latitude of Seoul, South Korea
const seoulLon = 126.978; // Longitude of Seoul, South Korea
const seoulStationLat = 37.5536; // Latitude of Seoul Station
const seoulStationLon = 126.9698; // Longitude of Seoul Station

function isValidatedDistance(lat1, lon1, lat2, lon2, threadholds) {
  // Haversine formula
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180; // Latitude 1 in radians
  const φ2 = (lat2 * Math.PI) / 180; // Latitude 2 in radians
  const Δφ = ((lat2 - lat1) * Math.PI) / 180; // Difference in latitudes
  const Δλ = ((lon2 - lon1) * Math.PI) / 180; // Difference in longitudes

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in meters

  //   return distance;

  console.log('현재거리', distance);
  if (distance <= threadholds) {
    return true;
  } else {
    return false;
  }
}

// Example usage:
// const distance = isValidatedDistance(seoulLat, seoulLon, seoulStationLat, seoulStationLon); // Distance between Seoul and Seoul Station
// console.log('Distance:', distance, 'meters');

// Check if the distance is less than or equal to 300 meters

export { isValidatedDistance };
