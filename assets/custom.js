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
    let alwaysTTC = element.classList.contains('always-ttc') || element.getAttribute('data-always-ttc') === 'true';
    if (!alwaysTTC) {
      if (ttcProperty !== 'true' && showTTC) {
        let currentPrice = getPrice(dualPriceElement.textContent);

      if (!ttcProperty) {
        let newPrice = currentPrice + (currentPrice * porcentajeTTC);

        dualPriceElement.textContent = formatPrice(newPrice) + '€';
        ttcProperty = 'true';
        element.setAttribute('ttc', ttcProperty); 
      } 
      else {
        let newPrice = currentPrice * 1.2; // Always show TTC for specific products
      dualPriceElement.textContent = formatPrice(newPrice) + '€';
      element.setAttribute('ttc', 'true');
      }}
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

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('pay-credit-element');
  const productPrice = document.querySelector('.yv-product-price .dualPrice');

  const iconInfo = document.getElementById('info_button');
  const beforeElement = document.createElement('div');
  beforeElement.className = 'info-card';
  beforeElement.style.opacity = '0';

  iconInfo.addEventListener('click', () => {
    if (container && productPrice) {
      const priceText = productPrice.textContent;
      const priceValue = parseFloat(priceText.replace('€', '').replace(',', '.'));
      if (!isNaN(priceValue)) {
        const installmentPrice = (priceValue / 4).toFixed(2);
        beforeElement.textContent = `Initial Payment: €${installmentPrice}\n
          Second Payment: €${installmentPrice}\n
          Third Payment: €${installmentPrice}\n
          Fourth Payment: €${installmentPrice}`;
        beforeElement.style.opacity = '1';
      }
    }
  });

  iconInfo.addEventListener('mouseenter', () => {
    if (container && productPrice) {
      const priceText = productPrice.textContent;
      const priceValue = parseFloat(priceText.replace('€', '').replace(',', '.'));
      if (!isNaN(priceValue)) {
        const installmentPrice = (priceValue / 4).toFixed(2);
        beforeElement.textContent = `Initial Payment: €${installmentPrice}\n
          Second Payment: €${installmentPrice}\n
          Third Payment: €${installmentPrice}\n
          Fourth Payment: €${installmentPrice}`;
        beforeElement.style.opacity = '1';
      }
    }
  });

  iconInfo.addEventListener('mouseleave', () => {
    beforeElement.style.opacity = '0';
  });

  container.appendChild(beforeElement);
});

// Box pay in 4X/3X Animation 
/*
document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('pay-credit-element');
  const productPrice = document.querySelector('.yv-product-price .dualPrice');

  if (container && productPrice) {
    const beforeElement = document.createElement('div');
    beforeElement.className = 'info-card';
    beforeElement.style.opacity = '0';
    const priceText = productPrice.textContent;
    const priceValue = parseFloat(priceText.replace('€', '').replace(',', '.'));

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
}); */

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
hideIfSingleChildWithSingleLi('.select-titulo');

document.addEventListener('DOMContentLoaded', function timeNotification() {
  const container = document.getElementById('notification-container');

  // Initialisation des éléments de notification
  let notification = document.createElement('div');
  notification.id = 'custom-notification';
  notification.className = 'notification info';
  let messageContent = document.createElement('div');
  messageContent.className = 'message-content notranslate';
  let countdownElement = document.createElement('span');
  countdownElement.className = 'countdown countdown-red notranslate';

  container.appendChild(notification);
  notification.appendChild(messageContent);
  notification.appendChild(countdownElement);

  // Initialisation du message de base
  function initBaseMessage() {
    const currentTime = new Date();
    if (currentTime.getDay() >= 1 && currentTime.getDay() <= 5 && currentTime.getHours() < 13) {
      messageContent.innerHTML = "Garantie d'expédition aujourd'hui, plus que ";
    } else if ((currentTime.getDay() >= 1 && currentTime.getDay() <= 4 && currentTime.getHours() >= 13) || currentTime.getDay() === 1) {
      messageContent.innerHTML = "Garantie d'expédition demain, plus que ";
    } else {
      messageContent.innerHTML = "Garantie d'expédition lundi, plus que ";
    }
  }

  function formatTime(time) {
    return time < 10 ? `0${time}` : `${time}`;
  }

  function timeRemaining(expirationTime, currentTime) {
    const timeTo = (expirationTime - currentTime) / 1000;
    const hoursRemaining = Math.floor(timeTo / 3600);
    const minutesRemaining = Math.floor((timeTo % 3600) / 60);
    const secondsRemaining = Math.floor(timeTo % 60);
    return { hoursRemaining, minutesRemaining, secondsRemaining };
  }

  function updateCountdown() {
    const currentTime = new Date();
    let expirationTime = new Date(currentTime);
    if (currentTime.getDay() >= 1 && currentTime.getDay() <= 5 && currentTime.getHours() < 13) {
      expirationTime.setHours(13, 0, 0, 0);
    } else if ((currentTime.getDay() >= 1 && currentTime.getDay() <= 4 && currentTime.getHours() >= 13) || currentTime.getDay() === 1) {
      expirationTime.setDate(currentTime.getDate() + 1);
      expirationTime.setHours(13, 0, 0, 0);
    } else {
      const daysToMonday = (8 - currentTime.getDay()) % 7;
      expirationTime.setDate(currentTime.getDate() + daysToMonday);
      expirationTime.setHours(13, 0, 0, 0);
    }

    let timeFormat = timeRemaining(expirationTime, currentTime);
    countdownElement.innerHTML = `${formatTime(timeFormat.hoursRemaining)}h${formatTime(timeFormat.minutesRemaining)}m${formatTime(timeFormat.secondsRemaining)}s`;
  }

  initBaseMessage();
  setInterval(updateCountdown, 1000);
});



const containerDelivery = document.querySelector('.container-delivery');

function getDeliveryMessage() {
  const currentTime = new Date();
  const currentDay = currentTime.getDay();
  const currentHour = currentTime.getHours();

  let deliveryMessage;

  if ((currentDay >= 1 && currentDay <= 5 && currentHour < 13)) {
    deliveryMessage = " Expédié aujourd’hui ";
  } else if ((currentDay >= 1 && currentDay <= 4 && currentHour >= 13) || currentDay === 0) {
    deliveryMessage = " Expédié demain";
  } else {
    deliveryMessage = " Expédié lundi";
  }
  return deliveryMessage;
}
const deliveryMessage = getDeliveryMessage();
if (deliveryMessage) {
  document.querySelector('.delivery-info__message').textContent = deliveryMessage;
  const deliveryLogoDiv = document.querySelector('.delivery-info__logo');
  /* const img = document.createElement('img');
  img.src = 'https://i.ibb.co/wpXqVsR/logo-delivery.png';
  deliveryLogoDiv.appendChild(img); */
}
const walletContainer = document.querySelector('.wallet__reward')
let rewardCounter = document.querySelector('.reward')
const imgWallet = document.createElement('img');
imgWallet.setAttribute('src', 'https://i.ibb.co/94WDtLZ/reward.png')
walletContainer.appendChild(imgWallet)

if (rewardCounter.innerHTML === '') {
  let priceBfFormat = document.querySelector('.yv-product-price.h2')
  let spanPrice = priceBfFormat.querySelector('.dualPrice').innerHTML
  let priceAfFormat = parseFloat(spanPrice.replace(/\D/g, "")) / 100;
  let rewardCalUnite = (priceAfFormat * 0.05).toFixed(2)
  rewardCounter.innerHTML = `+${rewardCalUnite}€ sur votre cagnotte en achetant ce produit.`
}

/*
document.addEventListener('DOMContentLoaded', () => {
  const variantOptions = document.querySelectorAll('.poids__option.variant_option');
  variantOptions.forEach(option => {
    const labelText = option.querySelector('label').textContent.trim();
    if (labelText === '500g') {
      option.style.display = 'none';
    }
  });
});
*/

