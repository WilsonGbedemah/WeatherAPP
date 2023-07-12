import { createElement } from './utils';

function Page2() {
  const container = createElement('div', { className: 'container' }, [
    createElement('h2', { textContent: 'Check the weather' }),
    createElement('form', {}, [
      createElement('input', { type: 'text', id: 'city-input', placeholder: 'Enter city' }),
      createElement('input', { type: 'submit', value: 'Get Weather' }),
      createElement('ul', { id: 'suggestion-list' }), // Add this line to include the suggestion list
    ]),
    createElement('div', { id: 'weather-data' }, [
      createElement('div', { className: 'icon' }),
      createElement('div', { className: 'temperature' }),
      createElement('div', { className: 'description' }),
      createElement('div', { className: 'details' }),
    ]),
    createElement('div', { id: 'forecast' }),
    createElement('div', { id: 'favorites' }),
  ]);
  document.body.appendChild(container);

  const apikey = "46f80a02ecae410460d59960ded6e1c6";
  const weatherDataEl = document.getElementById("weather-data");
  const cityInputEl = document.getElementById("city-input");
  const formEl = document.querySelector("form");
  const favoritesEl = document.getElementById("favorites");

  // Autocomplete feature using location API or database
  cityInputEl.addEventListener("input", async (event) => {
    const userInput = event.target.value;
    const suggestions = await fetchLocationSuggestions(userInput);
    displayLocationSuggestions(suggestions);
  });

  formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
  });

  async function fetchLocationSuggestions(userInput) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=10&appid=${apikey}`
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch location suggestions");
      }
  
      const data = await response.json();
  
      // Extract the location names from the response data
      const suggestions = data.map((location) => location.name);
  
      return suggestions;
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
      return []; // Return an empty array if an error occurs
    }
  }
  

  function displayLocationSuggestions(suggestions) {
    // Clear previous suggestions
    const suggestionList = document.getElementById("suggestion-list");
    suggestionList.innerHTML = "";

    // Display suggestions in a dropdown menu
    suggestions.forEach((suggestion) => {
      const suggestionItem = createElement('li', { textContent: suggestion });
      suggestionList.appendChild(suggestionItem);
    });
  }

  async function getWeatherData(cityValue) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      const temperature = Math.round(data.main.temp);
      const description = data.weather[0].description;
      const icon = data.weather[0].icon;
      const details = [
        `Feels like: ${Math.round(data.main.feels_like)}`,
        `Humidity: ${data.main.humidity}%`,
        `Wind speed: ${data.wind.speed} m/s`,
      ];

      weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
      weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`;
      weatherDataEl.querySelector(".description").textContent = description;
      weatherDataEl.querySelector(".details").innerHTML = details
        .map((detail) => `<div>${detail}</div>`)
        .join("");

      getWeatherForecast(cityValue);

      // Save the searched location to favorites
      saveToFavorites(cityValue);
    } catch (error) {
      weatherDataEl.querySelector(".icon").innerHTML = "";
      weatherDataEl.querySelector(".temperature").textContent = "";
      weatherDataEl.querySelector(".description").textContent = "An error happened, please try again later";
      weatherDataEl.querySelector(".details").innerHTML = "";
    }
  }

  async function getWeatherForecast(cityValue) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityValue}&appid=${apikey}&units=metric`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const forecastData = data.list;

      const forecastContainer = document.getElementById("forecast");
      forecastContainer.innerHTML = ""; // Clear previous forecast data

      for (let i = 0; i < forecastData.length; i += 8) {
        const forecastItem = forecastData[i];
        const forecastDate = new Date(forecastItem.dt_txt);
        const forecastTemperature = Math.round(forecastItem.main.temp);
        const forecastDescription = forecastItem.weather[0].description;
        const forecastIcon = forecastItem.weather[0].icon;

        const forecastElement = createElement('div', { className: 'forecast-item' }, [
          createElement('div', { className: 'forecast-date', textContent: forecastDate.toDateString() }),
          createElement('div', { className: 'forecast-icon', innerHTML: `<img src="http://openweathermap.org/img/wn/${forecastIcon}.png" alt="Forecast Icon">` }),
          createElement('div', { className: 'forecast-temperature', textContent: `${forecastTemperature}°C` }),
          createElement('div', { className: 'forecast-description', textContent: forecastDescription }),
        ]);

        forecastContainer.appendChild(forecastElement);
      }
    } catch (error) {
      console.error("Error retrieving weather forecast:", error);
    }
  }

  // Favorites feature
  let favorites = [];

  function saveToFavorites(cityValue) {
    // Save the searched location to favorites
    favorites.push(cityValue);
    displayFavorites();
  }

  function displayFavorites() {
    favoritesEl.innerHTML = ""; // Clear previous favorites

    favorites.forEach((favorite) => {
      const favoriteItem = createElement('div', { className: 'favorite-item', textContent: favorite });
      favoritesEl.appendChild(favoriteItem);
    });
  }

  displayFavorites();

  const footer = createElement('footer',{ className: 'weather-footer'},[
  container,
  ]);
  return createElement('div', { className: 'counter' }, [
    container
  ]);
}

export default Page2;
