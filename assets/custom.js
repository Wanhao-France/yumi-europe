document.addEventListener('DOMContentLoaded', function () {
  const toggleContainer = document.querySelector('.toggle-container');
  const togglePreciosBtn = document.getElementById('togglePreciosBtn');
  let mostrarTTC = false;

  function calcularTTC(precioHT) {
    return precioHT * 1.2;
  }

  function updatePrices() {
    const dualPriceElements = document.querySelectorAll('.dualPrice:not(.processed)');
    
    dualPriceElements.forEach((dualPriceElement) => {
      const precioOriginalAttr = dualPriceElement.getAttribute('data-original-price');
      const precioOriginal = parseFloat(precioOriginalAttr);

      if (!isNaN(precioOriginal)) {
        const nuevoPrecio = mostrarTTC ? calcularTTC(precioOriginal) : precioOriginal;
        dualPriceElement.textContent = nuevoPrecio.toFixed(2) + '€';
        dualPriceElement.classList.add('processed');
      }
    });
  }

  function handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        updatePrices();
      }
    });
  }

  // Utilizando IntersectionObserver para manejar lazy loading
  const observer = new IntersectionObserver(handleIntersection);

  const dualPriceElements = document.querySelectorAll('.dualPrice:not(.processed)');
  dualPriceElements.forEach((dualPriceElement) => {
    observer.observe(dualPriceElement);
  });

  togglePreciosBtn.addEventListener('click', function () {
    mostrarTTC = !mostrarTTC;
    updatePrices();
  });

  // Manejar eventos de desplazamiento (scroll)
  let scrollTimer;
  window.addEventListener('scroll', function () {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function () {
      observer.disconnect();

      // Obtener nuevos elementos cargados debido al lazy loading (por ejemplo, con clase .lazy-load)
      const newLazyLoadElements = document.querySelectorAll('.lazy-load:not(.processed)');
      newLazyLoadElements.forEach((lazyLoadElement) => {
        observer.observe(lazyLoadElement);
      });

      updatePrices();
    }, 100);
  });

  // Aplicar estilos iniciales
  updatePrices();
});


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
    closeButton.innerHTML = '&times;'; // El símbolo X para cerrar
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





