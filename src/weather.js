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
    createElement('div', { id: 'favorites' }),
  ]);
  document.body.appendChild(container);

  const apikey = "46f80a02ecae410460d59960ded6e1c6";
  const weatherDataEl = document.getElementById("weather-data");
  const cityInputEl = document.getElementById("city-input");
  const formEl = document.querySelector("form");
  const favoritesEl = document.getElementById("favorites");
  const favoritesListEl = favoritesEl; // Assign favoritesEl to favoritesListEl

  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  let isFavoritesShown = false;

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

      addToFavoritesButton.addEventListener('click', () => {
        addToFavorites(cityValue);
      });

      getHourlyWeatherForecast(cityValue);
    } catch (error) {
      weatherDataEl.querySelector(".icon").innerHTML = "";
      weatherDataEl.querySelector(".temperature").textContent = "";
      weatherDataEl.querySelector(".description").textContent =
        "An error happened, please try again later";
      weatherDataEl.querySelector(".details").innerHTML = "";
    }
  }

  async function getHourlyWeatherForecast(cityValue) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityValue}&appid=${apikey}&units=metric`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const forecastData = data.list.slice(0, 6); // Get the first 6 hourly forecasts

      const forecastContainer = document.getElementById("forecast");
      forecastContainer.innerHTML = ""; // Clear previous forecast data

      forecastData.forEach((forecastItem) => {
        const forecastDate = new Date(forecastItem.dt_txt);
        const forecastTemperature = Math.round(forecastItem.main.temp);
        const forecastDescription = forecastItem.weather[0].description;
        const forecastIcon = forecastItem.weather[0].icon;
        const forecastHour = forecastDate.getHours();

        const forecastElement = createElement('div', { className: 'forecast-item' }, [
          createElement('div', { className: 'forecast-hour', textContent: `${forecastHour}:00` }),
          createElement('div', { className: 'forecast-icon', innerHTML: `<img src="http://openweathermap.org/img/wn/${forecastIcon}.png" alt="Forecast Icon">` }),
          createElement('div', { className: 'forecast-temperature', textContent: `${forecastTemperature}°C` }),
          createElement('div', { className: 'forecast-description', textContent: forecastDescription }),
        ]);

        forecastContainer.appendChild(forecastElement);
      });
    } catch (error) {
      console.error("Error retrieving hourly weather forecast:", error);
    }
  }

  const favoritesContainer = createElement('div', { className: 'favorites-container' }, [
    createElement('button', { id: 'add-to-favorites', textContent: 'Add to Favorites' }),
    createElement('button', { id: 'show-favorites', textContent: 'Show Favorites' }),
    createElement('button', { id: 'clear-favorites', textContent: 'Clear Favorites' }),
  ]);

  container.appendChild(favoritesContainer);

  const addToFavoritesButton = document.getElementById("add-to-favorites");
  const showFavoritesButton = document.getElementById("show-favorites");
  const clearFavoritesButton = document.getElementById("clear-favorites");

  showFavoritesButton.addEventListener('click', () => {
    if (!isFavoritesShown) {
      displayFavorites();
    } else {
      favoritesEl.innerHTML = ""; // Clear favorites
    }
    isFavoritesShown = !isFavoritesShown;
  });

  function addToFavorites(cityValue) {
    if (!favorites.includes(cityValue)) {
      favorites.push(cityValue);
      saveFavoritesToStorage();
    }
  }

  function saveFavoritesToStorage() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  function displayFavorites() {
    favoritesListEl.innerHTML = ""; // Clear previous favorites

    favorites.forEach((favorite) => {
      const favoriteItem = createElement('div', {
        className: 'favorite-item',
        textContent: favorite,
      });

      favoriteItem.addEventListener('click', () => {
        cityInputEl.value = favorite; // Populate the input field with the favorite city
        getWeatherData(favorite); // Fetch weather data for the favorite city

        // Add active class to the clicked favorite item
        const favoriteItems = favoritesListEl.getElementsByClassName('favorite-item');
        Array.from(favoriteItems).forEach((item) => {
          item.classList.remove('active');
        });
        favoriteItem.classList.add('active');
      });

      favoritesListEl.appendChild(favoriteItem);
    });
  }

  clearFavoritesButton.addEventListener('click', () => {
    favorites = [];
    saveFavoritesToStorage();
    favoritesEl.innerHTML = ""; // Clear favorites
  });

  // Dark mode toggle
  const darkModeToggle = createElement('button', {
    className: 'toggle',
  });

  let isDarkMode = localStorage.getItem('isDarkMode') === 'true';

  function setDarkMode(state) {
    isDarkMode = state;

    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      darkModeToggle.textContent = 'Light Mode';
    } else {
      document.body.classList.remove('dark-mode');
      darkModeToggle.textContent = 'Dark Mode';
    }

    localStorage.setItem('isDarkMode', isDarkMode.toString());
  }

  darkModeToggle.addEventListener('click', () => {
    setDarkMode(!isDarkMode);
  });

  setDarkMode(isDarkMode);

  container.appendChild(darkModeToggle);


 
  const prev=createElement('a', {
    href: '/#/page3',
    className: 'chat-bubble',
  }, [
    createElement('img', {
      src: require('./images/arrow-left.png'),
      alt: 'Chat Icon',
    }),
  ]);  
  
  const next= createElement('a', {
    href: '/#/page3',
    className: 'chat-bubble',
  }, [
    createElement('img', {
      src: require('./images/arrow.png'),
      alt: 'Chat Icon',
    }),
  ]);





  const Contain = createElement('div', { className: 'contain' }, [
    container,
   
    darkModeToggle,
    
    
  ]);

  return Contain;
}

export default Page2;
