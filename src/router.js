import { createElement } from './utils';

import Page1 from './home';
import Page2 from './weather';
import Page3 from './info';

export function initRouter(mainView) {
  function updateView(newView) {
    mainView.innerHTML = '';
    if (newView instanceof Node) { // Check if newView is a valid DOM element
      mainView.appendChild(newView);
    }
  }

  function hashToRoute(hash) {
    switch (hash) {
      case '#/page1':
        updateView(Page1());
        break;

      case '#/page2':
        updateView(Page2());
        break;

      case '#/page3':
        updateView(Page3());
        break;

      default:
        updateView(createElement('h3', { textContent: '404 Page Not Found' }));
        break;
    }
  }

  const defaultHash = window.location.hash || '#/page1';
  hashToRoute(defaultHash);

  window.addEventListener('hashchange', (evt) => {
    const newUrl = new URL(evt.newURL);
    const hash = newUrl.hash;

    hashToRoute(hash);
  });
}
