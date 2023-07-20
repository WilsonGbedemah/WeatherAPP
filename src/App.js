import {
  createElement
} from './utils';
import {
  initRouter
} from './router';

function Header() {
  const logoImg = createElement('img', {
    src: require('./images/logo.png'),
    alt: 'WeatherNow logo',
    className: 'logo',
  });

  const appTitle = createElement('h1', {
    textContent: 'WeatherNINJA',
    className: 'heading',
  });

  const header = createElement('header', {}, [logoImg, appTitle]);

  const container = createElement('div', {
    className: 'header-container'
  }, [header]);

  return container;
}

function Navigation() {
  const page1Icon = createElement('div', {
    className: 'nav-item',
    onclick: () => {
      window.location.href = '/#/page1';
    }
  }, [
    createElement('img', {
      src: require('./images/home.png'),
      alt: 'Page 1 Icon',
      className: 'nav-icon',
    }),
    createElement('span', {
      textContent: 'Home'
    }),
  ]);

  const page2Icon = createElement('div', {
    className: 'nav-item',
    onclick: () => {
      window.location.href = '/#/page2';
    }
  }, [
    createElement('img', {
      src: require('./images/weather-icon.png'),
      alt: 'Page 2 Icon',
      className: 'nav-icon',
    }),
    createElement('span', {
      textContent: 'Weather'
    }),
  ]);

  const page3Icon = createElement('div', {
    className: 'nav-item',
    onclick: () => {
      window.location.href = '/#/page3';
    }
  }, [
    createElement('img', {
      src: require('./images/contact.png'),
      alt: 'Page 3 Icon',
      className: 'nav-icon',
    }),
    createElement('span', {
      textContent: 'Contact Us'
    }),
  ]);

  const nav = createElement('nav', {
    className: 'navigation'
  }, [page1Icon, page2Icon, page3Icon]);

  return nav;
}

function Footer() {
  const currentYear = new Date().getFullYear();

  const copyright = createElement('span', {
    textContent: `© ${currentYear} | WeatherNINJA`,
  });

  return createElement('footer', {}, [copyright]);
}

function App() {
  const main = createElement('main', {}, []);

  initRouter(main);

  const header = Header();
  const navigation = Navigation();
  const footer = Footer();

  const appContainer = createElement('div', {
    className: 'app-container'
  }, [header, main, navigation]);

  const appRoot = createElement('div', {}, [appContainer, footer]);

  return appRoot;
}

export default App;