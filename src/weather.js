import { createElement } from './utils';

function Page2() {
  const container = createElement('div', { className: 'container' }, [
    createElement('h2', { textContent: 'Check the weather' }),
    createElement('form', {}, [
      createElement('input', { type: 'text', id: 'city-input', placeholder: 'Enter city' }),
      createElement('input', { type: 'submit', value: 'Get Weather' }),
    ]),
    createElement('div', { id: 'weather-data' }, [
      createElement('div', { className: 'icon' }),
      createElement('div', { className: 'temperature' }),
      createElement('div', { className: 'description' }),
      createElement('div', { className: 'details' }),
    ]),
    createElement('div', { id: 'forecast' }),
  ]);

  document.body.appendChild(container);

  const apikey = "46f80a02ecae410460d59960ded6e1c6";
  const weatherDataEl = document.getElementById("weather-data");
  const cityInputEl = document.getElementById("city-input");
  const formEl = document.querySelector("form");

  formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
  });

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
}

export default Page2;
