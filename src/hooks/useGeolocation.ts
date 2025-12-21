import { useState, useEffect } from 'react';

const useGeolocation = () => {
  const [country, setCountry] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountryFromCoordinates = async (latitude: number, longitude: number) => {
      const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
      try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`);
        const data = await response.json();
        const addressComponents = data.results[0].address_components;
        const countryComponent = addressComponents.find((component: any) => component.types.includes('country'));
        const _country = countryComponent ? countryComponent.long_name : null;
        setCountry(_country);
      } catch (err) {
        console.error('Error fetching country:', err);
        setError('Failed to retrieve country information');
      }
    };

    const showPosition = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      fetchCountryFromCoordinates(latitude, longitude);
    };

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const showError = (error: GeolocationPositionError) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          setError('User denied the request for Geolocation.');
          break;
        case error.POSITION_UNAVAILABLE:
          setError('Location information is unavailable.');
          break;
        case error.TIMEOUT:
          setError('The request to get user location timed out.');
          break;
        default:
          setError('An unknown error occurred.');
          break;
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  return { country, error };
};

export default useGeolocation;