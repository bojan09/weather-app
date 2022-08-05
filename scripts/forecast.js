const key = "b1CkladolG6Ek7vxpmXoD8SnyIJ67QvI";

// Get weather information
const getWeather = async (cityLocationId) => {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${cityLocationId}?apikey=${key}`;

  const response = await fetch(base + query); // returns and resolves a promise, and passes it to the response constant

  //   converting the response to data with JSON() method
  const data = await response.json();

  return data[0];
};

// Get city information
const getCity = async (city) => {
  // The city search base resource url
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
  //   query parameter to the end of the base resource url, the query is equal to the city entered
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(base + query); // returns and resolves a promise, and passes it to the response constant

  //   converting the response to data with JSON() method
  const data = await response.json();

  return data[0];
};
