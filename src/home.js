import { createElement } from './utils';

function Page1() {
  // Create an array of image sources
  const imageSources = [
    require('./images/clear.jpg'),
    require('./images/cloudy.jpg'),
    require('./images/snowy.jpg'),
    require('./images/sunny.jpg'),
    require('./images/Thunderstorm.jpg'),
    require('./images/weather.jpg'),    
  ];

  // Create the hero image element
  const heroImage = createElement('img', {
    src: imageSources[0], // Set initial image source
    alt: 'WeatherNow Hero Image',
    className: 'hero-image',
  });

  // Create a counter variable to keep track of the current image index
  let counter = 0;

  // Function to change the image every 5 seconds
  function changeImage() {
    counter = (counter + 1) % imageSources.length; // Increment counter and loop back to 0 if it reaches the end
    heroImage.src = imageSources[counter]; // Change the image source
  }

  // Set an interval to call the changeImage function every 5 seconds
  setInterval(changeImage, 5000);

  const subTitle = createElement('h2', {
    textContent: 'Stay informed with WeatherNow',
    className: 'head',
  });

  const intro = createElement('div', { className: 'content' }, [
    createElement('p', {
      textContent: 'WeatherNow is your go-to weather application that provides real-time weather updates for any location around the world. Whether you are planning a trip, going for a run, or simply curious about the weather conditions, WeatherNow has you covered. With a user-friendly interface and accurate weather data sourced from reliable providers, you can easily access essential weather information at your fingertips. Get instant access to the current temperature, weather description, humidity, wind speed, and more. Our intuitive search feature allows you to quickly find weather details for any city, town, or even specific landmarks. Simply enter the location in the search bar, and WeatherNow will provide you with up-to-date weather information tailored to your chosen location. Stay one step ahead of the weather with WeatherNow.',
    }),
  ]);

  const callToAction = createElement('div', { className: 'call' }, [
    createElement('p', {
      textContent: 'For more information on the weather conditions in your city, just follow me by clicking 👇d ',
    }),
    createElement('a', {
      href: '/#/page2',
      textContent: 'Check Weather Now',
    }),
  ]);

  const introAndCallToAction = createElement('section', {}, [intro, callToAction]);

  return createElement('div', {}, [heroImage, subTitle, introAndCallToAction]);
}

export default Page1;
