const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

// Update UI
const updateUI = (data) => {
  //   const cityDetails = data.cityDetails;
  //   const weatherDetails = data.weatherDetails;

  //   destructure of the two variables from above
  const { cityDetails, weatherDetails } = data;

  // update details template
  details.innerHTML = ` 
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
     <div class="my-3">${weatherDetails.WeatherText}</div>
     <div class="display-4 my-4">
       <span>${weatherDetails.Temperature.Metric.Value}</span>
       <span>&deg;C</span>
     </div>  `;

  //  UPDATEING THE DAY/NIGHT & ICON SVG

  //   the icon source, using the Weather details variale and attaching to it he weather icon property in order to update the svg dinamicaly
  const iconSource = `img/icons/${weatherDetails.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSource);
  //   this is for the day/night time
  let timeSource = null;

  if (weatherDetails.IsDayTime) {
    timeSource = "img/day.svg";
  } else {
    timeSource = "img/night.svg";
  }
  //   this changes the image based on the condition above if we search for weather info in day/night time
  time.setAttribute("src", timeSource);

  //  remove the d-none class if present
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

// Update City Details

// The code will execute the function updateCity with the city parameter asynchronously.
// The first thing that happens is the function getCity is called, which gets a cityDetails object and returns it to updateCity.
// After that, the weatherDetails object is retrieved from updateCity and returned to getWeather.

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weatherDetails = await getWeather(cityDetails.Key);

  return {
    cityDetails: cityDetails,
    weatherDetails: weatherDetails,
  };
};

cityForm.addEventListener("submit", (event) => {
  // prevent default action
  event.preventDefault();

  //   Get the city value from FORM input
  const city = cityForm.city.value.trim();
  cityForm.reset(); // clears the form field

  //   Update the UI with new city
  //   .then() takes the object returned from the async function above as the data
  updateCity(city)
    .then((data) => {
      updateUI(data);
    })
    .catch((err) => console.log(err));
});
