// Box pay in 4X/3X Animation
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
});

// Toggle Button

function manageToggle() {
  const togglePricesBtn = document.getElementById('togglePreciosBtn');
  const toggleContainer = document.querySelector('.toggle-container');
  let showTTC = getToggleState();
  
  function saveToggleState(state) {
    localStorage.setItem('showTTC', JSON.stringify(state));
  }

  function getToggleState() {
    const savedState = localStorage.getItem('showTTC');
    return savedState ? JSON.parse(savedState) : false;
  }

  function updateStateAndToggleText() {
    showTTC = !showTTC;
    saveToggleState(showTTC);
    toggleContainer.classList.toggle('active', showTTC);
    togglePricesBtn.innerText = showTTC ? 'TTC' : 'HT';
  }

  // Add event listener to the toggle button
  togglePricesBtn.addEventListener('click', updateStateAndToggleText);

  // Update the button text on page load
  togglePricesBtn.innerText = showTTC ? 'TTC' : 'HT';
}

// Call the function to initialize the toggle
manageToggle();


// TTC Functionality

function modificarElemento(elemento, showTTC) {
  const dualPriceElement = elemento.querySelector('.dualPrice');

  const rect = elemento.getBoundingClientRect();
  let ttcProperty = elemento.getAttribute('ttc');

  if (rect.top >= 0 && rect.bottom <= window.innerHeight && ttcProperty !== 'true' && showTTC) {
    let precioActual = obtenerPrecio(dualPriceElement.textContent);

    if (!ttcProperty) {
      let nuevoPrecio = precioActual * 1.2;
      dualPriceElement.textContent = formatearPrecio(nuevoPrecio) + '€';
      ttcProperty = 'true';
      elemento.setAttribute('ttc', ttcProperty);
    }
  }
}

function obtenerPrecio(textoPrecio) {
  return parseFloat(textoPrecio.replace(/[^\d,]/g, '').replace(',', '.'));
}

function formatearPrecio(precio) {
  return precio.toFixed(2).replace('.', ',');
}

const observerConfig = {
  threshold: 0.5,
};

function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      modificarElemento(entry.target);
    }
  });
}

const observer = new IntersectionObserver(handleIntersection, observerConfig);

const elementosObservados = document.querySelectorAll('.yv-product-price');

elementosObservados.forEach(elemento => {
  observer.observe(elemento);
});

function handleScroll(showTTC) {
  const elementos = document.querySelectorAll('.yv-product-price');

  elementos.forEach(elemento => {
    modificarElemento(elemento, showTTC);
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
    const notificationMessage = "For purchases made before 13:00 , your parcel will be dispatched the same day! Offer ends in:";
    showCustomNotification(notificationMessage, 'info', expirationTime);
  }
});

// 
