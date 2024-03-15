function getLocalStorageValue(key) {
  let localStorageValue = localStorage.getItem(key);
  let parsedValue = JSON.parse(localStorageValue);

  return parsedValue;
}

let showTTCValue = getLocalStorageValue('showTTC');
let porcentajeTTC = 0.2;

// Toggle Button
document.addEventListener('DOMContentLoaded', function () {
  const togglePricesBtn = document.getElementById('togglePreciosBtn');
  const toggleContainer = document.querySelector('.toggle-container');

  let showTTC = getToggleState();

  function saveToggleState(state) {
    localStorage.setItem('showTTC', JSON.stringify(state));
  }

  function getToggleState() {
    const savedState = localStorage.getItem('showTTC');
    return savedState !== null ? JSON.parse(savedState) : true;
  }

  function updateStyles() {
    if (showTTC) {
      toggleContainer.classList.remove('active');
      togglePricesBtn.innerText = 'TTC';
    } else {
      toggleContainer.classList.add('active');
      togglePricesBtn.innerText = 'HT';
    }
  }

  function handleToggleClick() {

    showSpinner();

    showTTC = !showTTC;
    saveToggleState(showTTC);
    updateStyles();

    const toggleChangeEvent = new CustomEvent('toggleStateChanged', { detail: { showTTC } });
    document.dispatchEvent(toggleChangeEvent);

    location.reload();
  }

  togglePricesBtn.addEventListener('click', handleToggleClick);

  updateStyles();
});

// TTC Functionality

function modifyElement(element, showTTC) {
  const dualPriceElement = element.querySelector('.yv-product-price .dualPrice');

  if (dualPriceElement) {
    let ttcProperty = element.getAttribute('ttc');
    if (ttcProperty !== 'true' && showTTC) {
      let currentPrice = getPrice(dualPriceElement.textContent);

      if (!ttcProperty) {
        let newPrice = currentPrice + (currentPrice * porcentajeTTC);

        dualPriceElement.textContent = formatPrice(newPrice) + '€';


        ttcProperty = 'true';
        element.setAttribute('ttc', ttcProperty);
      }
    }
  }
}

function getPrice(textPrice) {
  return parseFloat(textPrice.replace(/[^\d,]/g, '').replace(',', '.'));
}

function formatPrice(price) {
  return price.toFixed(2).replace('.', ',');
}

const observerConfig = {
  threshold: 0.5,
};

function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      modifyElement(entry.target);
    }
  });
}

const observer = new IntersectionObserver(handleIntersection, observerConfig);

const observedElements = document.querySelectorAll('.yv-product-price');

observedElements.forEach(element => {
  observer.observe(element);
});

function handleScroll(showTTC) {
  const elements = document.querySelectorAll('.yv-product-price');

  elements.forEach(element => {
    modifyElement(element, showTTC);
  });
}

function init() {
  const togglePricesBtn = document.getElementById('togglePreciosBtn');

  function saveToggleState(state) {
    localStorage.setItem('showTTC', JSON.stringify(state));
  }

  function getToggleState() {
    const savedState = localStorage.getItem('showTTC');
    return savedState ? JSON.parse(savedState) : false;
  }

  function updateStateAndToggleText() {
    const showTTC = !getToggleState();
    saveToggleState(showTTC);
    togglePricesBtn.innerText = showTTC ? 'TTC' : 'HT';
    handleScroll(showTTC);
  }

  togglePricesBtn.addEventListener('click', updateStateAndToggleText);

  const showTTCOnLoad = getToggleState();
  togglePricesBtn.innerText = showTTCOnLoad ? 'TTC' : 'HT';

  handleScroll(showTTCOnLoad);

  window.addEventListener('scroll', () => {
    const showTTC = getToggleState();
    handleScroll(showTTC);
  });
}

init();

function actualizarPrecios() {
  let showTTCValue = getLocalStorageValue('showTTC');

  if (showTTCValue === true) {
    let parentElements = document.querySelectorAll('.yv-product-compare-price');

    parentElements.forEach(function (parentElement) {
      if (!parentElement.classList.contains('actualizado')) {
        if (!parentElement.classList.contains('no-actualizar')) {
          let elementsHijos = parentElement.querySelectorAll('.dualPrice');
          elementsHijos.forEach(function (elementHijo) {
            if (!elementHijo.classList.contains('actualizado')) {
              let textoActual = elementHijo.textContent;
              let valorNumerico = parseFloat(textoActual.replace(/[^\d,.-]/g, '').replace(',', '').replace('.', '').replace('-', '.'));
              let nuevoValor = valorNumerico + (valorNumerico * porcentajeTTC);
              let valorFinal = nuevoValor / 100;
              let nuevoTexto = '€' + valorFinal.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

              elementHijo.textContent = nuevoTexto;

              elementHijo.classList.add('actualizado');
            }
          });

          parentElement.classList.add('actualizado');
        }
      }
    });
  }
}

window.addEventListener('scroll', actualizarPrecios);

actualizarPrecios();

window.addEventListener('storage', function (event) {
  if (event.key === 'showTTC') {
    actualizarPrecios();
  }
});

//TTC Cart/Controller

document.addEventListener("DOMContentLoaded", function () {
  let showTTC = localStorage.getItem("showTTC");

  let dualPriceElement = document.querySelector('.list-unstyled.cart-total-list .cart-total-item.text-large .h2 .dualPrice');
  if (dualPriceElement.innerHTML) {
    let num = dualPriceElement.innerHTML.replace('€', '').replace('.', '').replace(',', '.')
    if (showTTC === 'true') {
      num *= (1 + porcentajeTTC);
    }
    let totalAmount = parseFloat(num)
    dualPriceElement.textContent = '€' + totalAmount.toFixed(2);
    let totalElement = document.querySelector('.cart-total-item p');
    if (totalElement) {
      totalElement.textContent = 'Total ' + (showTTC === 'true' ? 'TTC' : 'HT');
    }
  }
});



try {
  const elementsToClick = document.querySelectorAll('.AirReviews-Widget--Stars');

  elementsToClick.forEach((element) => {
    element.addEventListener('click', () => {
      const elementToScroll = document.getElementById('AirReviews-BlockWrapper');
      elementToScroll.scrollIntoView({ behavior: 'smooth' });
    });
  });
} catch (error) {
  console.error('An error occurred:', error);
}

// Little Functions 
// Spinner

function showSpinner() {
  const spinnerContainer = document.getElementById('spinner-container');
  if (spinnerContainer) {
    spinnerContainer.style.display = 'flex';
  }
}

function hideSpinner() {
  const spinnerContainer = document.getElementById('spinner-container');
  if (spinnerContainer) {
    spinnerContainer.style.display = 'none';
  }
}




// Box pay in 4X/3X Animation
document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('pay-credit-element');
  const productPrice = document.querySelector('.yv-product-price .dualPrice');
  const parentContainer = document.querySelector('.product_custom_liquid')

  if (container && productPrice) {
    const beforeElement = document.createElement('div');
    beforeElement.className = 'info-card';
    beforeElement.style.opacity = '0';
    const priceText = productPrice.textContent;
    const priceValue = parseFloat(priceText.replace('€', '').replace(',', '.'));
    if (priceValue < 100) {
      parentContainer.style.display = 'none'
    } else {
      if (!isNaN(priceValue)) {
        const installmentPrice = (priceValue / 4).toFixed(2);

        container.appendChild(beforeElement);

        container.addEventListener('mouseenter', function () {
          beforeElement.textContent = `Initial Payment: €${installmentPrice}\n
            Second Payment: €${installmentPrice}\n
            Third Payment: €${installmentPrice}\n
            Fourth Payment: €${installmentPrice}`;
          beforeElement.style.opacity = '1';
          container.querySelector('.info-text').style.opacity = '0';
        });

        container.addEventListener('mouseleave', function () {
          beforeElement.textContent = '';
          beforeElement.style.opacity = '0';
          container.querySelector('.info-text').style.opacity = '1';
        });
      }
    }
  }
});


function hideIfSingleChildWithSingleLi(selector) {
  document.querySelectorAll(selector).forEach(function (element) {

    let ulChildren = element.querySelectorAll('ul');
    if (ulChildren.length === 1 && ulChildren[0].parentNode === element) {

      let liChildren = ulChildren[0].querySelectorAll('li');
      if (liChildren.length === 1 && liChildren[0].parentNode === ulChildren[0]) {

        element.style.display = 'none';
      }
    }
  });
}

hideIfSingleChildWithSingleLi('.select-couleur');
hideIfSingleChildWithSingleLi('.select-material');
hideIfSingleChildWithSingleLi('.select-poids');
hideIfSingleChildWithSingleLi('.select-style');





// Notification dispatched same day

document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('notification-container');
  const notificationClosedCookie = 'notificationClosedTime';

  function showCustomNotification(message, type = 'info', expirationTime) {
    const existingNotification = document.getElementById('custom-notification');

    if (existingNotification) {
      existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.id = 'custom-notification';
    notification.className = `notification ${type}`;

    const messageContainer = document.createElement('div');
    messageContainer.innerHTML = `<i class="fa-solid fa-cart-shopping" style="color: #ffffff;"></i> ${message}`;

    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.className = 'close-button';
    closeButton.addEventListener('click', function () {
      container.style.display = 'none';
      setNotificationClosedCookie();
    });

    const countdownContainer = document.createElement('div');
    countdownContainer.id = 'countdown-container';

    notification.appendChild(messageContainer);
    notification.appendChild(closeButton);
    notification.appendChild(countdownContainer);

    container.appendChild(notification);
    container.style.display = 'block';

    const countdownElement = document.createElement('span');
    countdownContainer.appendChild(countdownElement);

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = expirationTime - now;

      if (distance <= 0) {
        clearInterval(countdownInterval);
        container.style.display = 'none';
      } else {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        countdownElement.innerHTML = `${hours}h ${minutes}m ${seconds}s`;
      }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
  }

  function setNotificationClosedCookie() {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 45);
    document.cookie = `${notificationClosedCookie}=${now.toUTCString()}; expires=${now.toUTCString()}; path=/`;
  }

  function getNotificationClosedTime() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === notificationClosedCookie) {
        return new Date(value);
      }
    }
    return null;
  }

  const currentTime = new Date();
  const expirationTime = new Date(currentTime);
  expirationTime.setHours(13, 0, 0, 0);

  const notificationClosedTime = getNotificationClosedTime();
  const showNotification = !notificationClosedTime || currentTime > notificationClosedTime;

  if (currentTime.getHours() < 13 && showNotification) {
    const notificationMessage = "Pour les achats effectués avant 13h00, votre colis sera expédié le jour même ! L'offre se termine le :";
    showCustomNotification(notificationMessage, 'info', expirationTime);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  let popupInner = document.querySelector('.yv-login-popup-inner');
  if (popupInner) {
    let closeButton = document.createElement('button');
    closeButton.classList.add('button__close--styles');
    let icon = document.createElement('i');
    icon.classList.add('fas', 'fa-times');
    closeButton.appendChild(icon);

    closeButton.addEventListener('click', function () {
      closePopup();
    });

    popupInner.appendChild(closeButton);
  }
});

function closePopup() {
  document.body.classList.remove('account-popup-open');
}
