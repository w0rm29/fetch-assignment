import { useState, useCallback } from 'react';

// Custom hook that manages fetching dog information
const useFetchDogData = () => {
  const [searchData, setSearchData] = useState();
  const [dogData, setDogData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDogData = useCallback(async searchParams => {
    setIsLoading(true);
    setError(null);

    let url = "https://frontend-take-home-service.fetch.com/dogs/search?";
    // If no breeds in params, set breeds=Affenpinscher (the first breed)
    if (!searchParams.get('breeds')) {
      url += 'breeds=Affenpinscher&';
    }

    // Loop through each query param and concat to url
    searchParams.forEach((value, key) => {
      url += `${key}=${value}&`;
      console.log(`${key} -> ${value}`);
    });
    // remove & off the end of url
    url = url.substring(0, url.length - 1);

    // Fetch dog data based on search params
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      console.log(response);

      if (!response.ok) {
        throw new Error('Failed to execute search fetch!');
      }

      const data = await response.json();
      setSearchData(data);

      // Find dog data based on returned id's
      const dogResponse = await fetch("https://frontend-take-home-service.fetch.com/dogs", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data.resultIds),
      });

      if (!dogResponse.ok) {
        throw new Error('Failed to fetch dogs!');
      }

      const dogData = await dogResponse.json();
      setDogData(dogData);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    dogData,
    fetchDogData,
    searchData,
  };
};

export default useFetchDogData;
