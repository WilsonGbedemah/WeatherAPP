import { createElement } from './utils';

function Page1() {
  const subTitle = createElement('h3', { textContent: 'Stay informed with WeatherNow' });
  const intro= createElement('p', { textContent: 'WeatherNow is your go-to weather application that provides real-time weather updates for any location around the world. Whether you are planning a trip, going for a run, or simply curious about the weather conditions, WeatherNow has you covered.With a user-friendly interface and accurate weather data sourced from reliable providers, you can easily access essential weather information at your fingertips. Get instant access to the current temperature, weather description, humidity, wind speed, and more. Our intuitive search feature allows you to quickly find weather details for any city, town, or even specific landmarks. Simply enter the location in the search bar, and WeatherNow will provide you with up-to-date weather information tailored to your chosen location. Stay one step ahead of the weather with WeatherNow. Download our app or visit our website today to experience the convenience of staying informed about the weather, no matter where you are.' });
  const page3Link = createElement('a', {
    href: '/#/page3',
    textContent: 'Link to Page 3',
  });

  return createElement('div', {}, [subTitle,intro, page3Link]);
}

export default Page1;