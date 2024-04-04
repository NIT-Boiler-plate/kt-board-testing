const isValidatedDistance = (lat1, lon1, lat2, lon2, threadholds) => {
  // Haversine formula
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180; // Latitude 1 in radians
  const φ2 = (lat2 * Math.PI) / 180; // Latitude 2 in radians
  const Δφ = ((lat2 - lat1) * Math.PI) / 180; // Difference in latitudes
  const Δλ = ((lon2 - lon1) * Math.PI) / 180; // Difference in longitudes

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in meters

  console.log('현재거리', distance);
  if (distance <= threadholds) {
    return true;
  } else {
    return false;
  }
};

const getCurrentPosition = async () => {
  if (navigator) {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          resolve({ latitude, longitude });
        },
        error => {
          reject(error);
        },
      );
    });

    return position;
  } else {
    console.log('no navigator');
  }
};

export { isValidatedDistance, getCurrentPosition };
