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



//
document.addEventListener('DOMContentLoaded', function () {
  const toggleContainer = document.querySelector('.toggle-container');
  const togglePreciosBtn = document.getElementById('togglePreciosBtn');
  let preciosOriginales = [];
  let mostrarTTC = false;


  
togglePreciosBtn.addEventListener('click', async function () {
  console.log('Botón clickeado');
  mostrarTTC = !mostrarTTC;
  await actualizarPrecios();
});
  
  function calcularTTC(precioHT) {
    return precioHT * 1.2;
  }

  async function actualizarPrecios() {
    await esperarProductosCargados();

    const dualPriceElements = document.querySelectorAll('.dualPrice');

    dualPriceElements.forEach((dualPriceElement, index) => {
      const precioOriginal = preciosOriginales[index];
      const nuevoPrecio = mostrarTTC ? calcularTTC(precioOriginal) : precioOriginal;
      
      if (!isNaN(nuevoPrecio)) {
        dualPriceElement.textContent = nuevoPrecio.toFixed(2) + '€';
      }
    });

    toggleContainer.classList.toggle('mostrar-ttc', mostrarTTC);
    togglePreciosBtn.innerText = mostrarTTC ? 'HT' : 'TTC';
  }

  async function esperarProductosCargados() {
    return new Promise((resolve) => {
      const observer = new MutationObserver(() => {
        const dualPriceElements = document.querySelectorAll('.dualPrice');

        if (dualPriceElements.length > 0) {
          observer.disconnect();
          dualPriceElements.forEach((dualPriceElement) => {
            const precioOriginal = parseFloat(dualPriceElement.textContent.replace('€', '').replace(',', '.'));
            preciosOriginales.push(precioOriginal);
          });
          resolve();
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
    });
  }

  togglePreciosBtn.addEventListener('click', async function () {
    mostrarTTC = !mostrarTTC;
    await actualizarPrecios();
  });

  document.addEventListener('lazybeforeunveil', async function () {
    await actualizarPrecios();
  });

  // Capturar eventos específicos de lazy loading de imágenes
  window.addEventListener('scroll', async function () {
    await actualizarPrecios();
  });

  window.addEventListener('load', async function () {
    await actualizarPrecios();
  });
});

//

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




