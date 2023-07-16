import {
  createElement
} from './utils';

function Page3() {
  const title = createElement('h2', {
    textContent: 'Contact Us',
    className: 'head',
  });

  const container = createElement('div', {
    className: 'info'
  }, [
    createElement('div', {
      id: 'contact'
    }, [
      createElement('img', {
        src: require('./images/contact-us.png'),
        alt: 'icon',
        className: 'icon'
      }),
      createElement('h2', {
        textContent: 'GET IN TOUCH',
        className: 'touch'
      }),
      createElement('p', {
        textContent: 'Email: ',
        className: 'email'
      }),
      createElement('p', {
        textContent: 'afrogbede09@gmail.com',
        className: 'contact-info'
      }),
      createElement('p', {
        textContent: 'Phone: ',
        className: 'phone'
      }),
      createElement('p', {
        textContent: '+233 556 427 542',
        className: 'contact-info'
      }),
    ]),
    createElement('div', {
      id: 'case'
    }, [
      createElement('img', {
        src: require('./images/document.png'),
        alt: 'icon',
        className: 'icon'
      }),
      createElement('h2', {
        textContent: 'START A NEW CASE',
        className: 'new'
      }),
      createElement('p', {
        textContent: 'Just send us your questions or concerns by starting a new case and we will give you the help you need. Thank You👍',
        className: 'para'
      }),
      createElement('input', { type: 'submit', value: 'Start Case', className: 'click'}),
    ]),
    createElement('div', {
      id: 'chat'
    }, [
      createElement('img', {
        src: require('./images/chat.png'),
        alt: 'icon',
        className: 'icon'
      }),
      createElement('h2', {
        textContent: 'LIVE CHAT',
        className: 'live'
      }),
      createElement('p', {
        textContent: 'Chat with a member of our in-house team',
        className: 'phone'
      }),
      createElement('input', { type: 'submit', value: 'Start Chat', className: 'click' }),
    ]),
  ]);

  const page1Link = createElement('a', {
    href: '/#/page1',
    textContent: 'Go to Home Page',
  });

  return createElement('div', {}, [title, container, page1Link]);
}

export default Page3;