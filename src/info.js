import { createElement } from './utils';

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

  return createElement('div', {}, [title, container, darkModeToggle]);
}

export default Page3;
