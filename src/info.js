/*import { createElement } from './utils';

function Page3() {
  const title = createElement('h2', {
    textContent: 'Contact Us',
    className: 'head',
  });

  const container = createElement('div', { className: 'info' }, [
    createElement('div', { id: 'contact' }, [
      createElement('img', {
        src: require('./images/contact-us.png'),
        alt: 'icon',
        className: 'icon',
      }),
      createElement('h2', {
        textContent: 'GET IN TOUCH',
        className: 'touch',
      }),
      createElement('p', {
        textContent: 'Email: ',
        className: 'email',
      }),
      createElement('p', {
        textContent: 'afrogbede09@gmail.com',
        className: 'contact-info',
      }),
      createElement('p', {
        textContent: 'Phone: ',
        className: 'phone',
      }),
      createElement('p', {
        textContent: '+233 556 427 542',
        className: 'contact-info',
      }),
    ]),
  
    createElement('div', { id: 'case' }, [
      createElement('img', {
        src: require('./images/document.png'),
        alt: 'icon',
        className: 'icon',
      }),
      createElement('h2', {
        textContent: 'START A NEW CASE',
        className: 'new',
      }),
      createElement('h3', {
        textContent: 'What are your concerns?',
        className: 'para',
      }),
      createElement('p', {
        textContent: 'Send us your questions and concern and we will get back to you as soon as possible. Thank you!',
        className: 'para',
      }),
      createElement('form', { className: 'form' }, [
        createElement('label', { className: 'info' }, [
          createElement('textarea', { id: 'description', name: 'description', rows: '10', cols: '30' }),
        ]),
        createElement('input', { type: 'submit', value: 'Contact us', className: 'submitbtn' }),
      ]),
    ]),
    
    createElement('div', { id: 'chat' }, [
      createElement('img', {
        src: require('./images/question.png'),
        alt: 'icon',
        className: 'icon',
      }),
      createElement('h2', {
        textContent: 'FREQUENTLY ASKED QUESTIONS',
        className: 'faq',
      }),
      createElement('p', {
        textContent: 'Find answers to commonly asked questions',
        className: 'info',
      }),
      createElement('a', {
        href: 'https://openweathermap.org/faq',
        textContent: 'view FAQs',
      }),
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

export default Page3;*/
import { createElement } from './utils';

function handleFormSubmit(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  
  // Get the form input values
  const descriptionInput = document.getElementById('description');
  const description = descriptionInput.value;
  
  // Create a div for displaying the confirmation message
  const confirmationDiv = createElement('div', { className: 'confirmation-message' });
  const confirmationMessage = `Thank you for submitting your concerns. We will get back to you as soon as possible. Your concerns: ${description}`;
  confirmationDiv.textContent = confirmationMessage;
  
  // Clear the form input
  descriptionInput.value = '';
  
  // Append the confirmation message div to the page
  const form = event.target;
  form.parentNode.insertBefore(confirmationDiv, form.nextSibling);
}

function createCaseForm() {
  const form = createElement('form', { className: 'form' }, [
    createElement('label', { className: 'info' }, [
      createElement('textarea', { id: 'description', name: 'description', rows: '10', cols: '30' }),
    ]),
    createElement('input', { type: 'submit', value: 'Submit', className: 'submitbtn' }),
  ]);

  form.addEventListener('submit', handleFormSubmit);

  const caseFormDiv = createElement('div', { className: 'case-form' }, [
    createElement('img', {
      src: require('./images/document.png'),
      alt: 'icon',
      className: 'icon',
    }),
    createElement('h2', {
      textContent: 'START A NEW CASE',
      className: 'new',
    }),
    createElement('h3', {
      textContent: 'What are your concerns?',
      className: 'para',
    }),
    createElement('p', {
      textContent: 'Send us your questions and concern and we will get back to you as soon as possible. Thank you!',
      className: 'para',
    }),
    form,
  ]);

  return caseFormDiv;
}

function Page3() {
  const title = createElement('h2', {
    textContent: 'Contact Us',
    className: 'head',
  });

  const contactSection = createElement('div', { className: 'info' }, [
    createElement('div', { id: 'contact' }, [
      createElement('img', {
        src: require('./images/contact-us.png'),
        alt: 'icon',
        className: 'icon',
      }),
      createElement('h2', {
        textContent: 'GET IN TOUCH',
        className: 'touch',
      }),
      createElement('p', {
        textContent: 'Email: ',
        className: 'email',
      }),
      createElement('p', {
        textContent: 'afrogbede09@gmail.com',
        className: 'contact-info',
      }),
      createElement('p', {
        textContent: 'Phone: ',
        className: 'phone',
      }),
      createElement('p', {
        textContent: '+233 556 427 542',
        className: 'contact-info',
      }),
    ]),
    createCaseForm(),
    createElement('div', { id: 'chat' }, [
      createElement('img', {
        src: require('./images/question.png'),
        alt: 'icon',
        className: 'icon',
      }),
      createElement('h2', {
        textContent: 'FREQUENTLY ASKED QUESTIONS',
        className: 'faq',
      }),
      createElement('p', {
        textContent: 'Find answers to commonly asked questions',
        className: 'info',
      }),
      createElement('a', {
        href: 'https://openweathermap.org/faq',
        textContent: 'View FAQs',
      }),
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

  return createElement('div', {}, [title, contactSection, darkModeToggle]);
}

export default Page3;
