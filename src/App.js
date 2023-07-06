import { createElement } from './utils';
import { initRouter } from './router';

function Header(mainDiv) {
  const appTitle = createElement('h1', {
    textContent: 'My Cool Project',
    className: 'heading',
  });

  // nav items
  const page1 = createElement('a', {
    href: '/#/page1',
    textContent: 'Page 1',
  });
  const page2 = createElement('a', {
    href: '/#/page2',
    textContent: 'Page 2',
  });
  const page3 = createElement('a', {
    href: '/#/page3',
    textContent: 'Page 3',
  });

  const nav = createElement('nav', {}, [page1, page2, page3]);

  return createElement('header', {}, [appTitle, nav]);
}

function Footer() {
  const copyright = createElement('span', {
    textContent: `Copyright © ${new Date().getFullYear()}`,
  });

  return createElement('footer', {}, [copyright]);
}

function App() {
  const main = createElement('main', {}, []);

  initRouter(main);

  return createElement('div', {}, [Header(main), main, Footer()]);
}

export default App;