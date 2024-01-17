document.addEventListener('DOMContentLoaded', function () {
  const toggleContainer = document.querySelector('.toggle-container');
  const togglePreciosBtn = document.getElementById('togglePreciosBtn');
  const dualPriceElements = document.querySelectorAll('.dualPrice');
  let precioOriginals = [];
  let mostrarTTC = false;

  dualPriceElements.forEach((dualPriceElement) => {
    const precioOriginal = parseFloat(dualPriceElement.textContent.replace('€', '').replace(',', '.'));
    precioOriginals.push(precioOriginal);
  });

  togglePreciosBtn.addEventListener('click', function () {
    mostrarTTC = !mostrarTTC;
    togglePrecios();
  });

  function togglePrecios() {
    dualPriceElements.forEach((dualPriceElement, index) => {
      const precioOriginal = precioOriginals[index];
      const nuevoPrecio = mostrarTTC ? calcularTTC(precioOriginal) : precioOriginal;


      dualPriceElement.textContent = nuevoPrecio.toFixed(2) + '€';
    });

    toggleContainer.classList.toggle('mostrar-ttc', mostrarTTC);

    togglePreciosBtn.innerText = mostrarTTC ? 'HT' : 'TTC';
  }

  function calcularTTC(precioHT) {
    return precioHT * 1.2;
  }
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

document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('pay-credit-element');
  const productPrice = document.querySelector('.yv-product-price .dualPrice');

  if (container && productPrice) {
    const cardInfo = document.createElement('div');
    cardInfo.className = 'card-info';
    cardInfo.innerHTML = `
      <p>Initial Payment: €${installmentPrice}</p>
      <p>Second Payment: €${installmentPrice}</p>
      <p>Third Payment: €${installmentPrice}</p>
      <p>Fourth Payment: €${installmentPrice}</p>
    `;
    container.appendChild(cardInfo);

    container.addEventListener('mouseenter', function () {
      container.classList.add('hovered');
    });

    container.addEventListener('mouseleave', function () {
      container.classList.remove('hovered');
    });

    window.addEventListener('scroll', function () {
      const boundingBox = container.getBoundingClientRect();

      // Verifica si el elemento está fuera del viewport y se ha hecho hover
      if (container.classList.contains('hovered') && boundingBox.bottom < 0 && boundingBox.top > -boundingBox.height) {
        container.style.top = '20px'; // Muestra hacia arriba si está fuera del viewport
      } else {
        container.style.top = '-20px';
      }
    });
  }
    const container = document.getElementById('pay-credit-element');
    const productPrice = document.querySelector('.yv-product-price .dualPrice');

    if (container && productPrice) {
        const beforeElement = document.createElement('div');
        beforeElement.style.position = 'absolute';
        beforeElement.style.top = '0';
        beforeElement.style.left = '0';
        beforeElement.style.backgroundColor = 'transparent';
        beforeElement.style.color = '#fff';
        beforeElement.style.padding = '5px';
        beforeElement.style.border = 'none';
        beforeElement.style.borderRadius = '5px';
        beforeElement.style.whiteSpace = 'pre-line';
        beforeElement.style.zIndex = '9999'; // Ajusta el zIndex a un valor alto para asegurar que esté sobre todo
        beforeElement.style.fontSize = '16px';
        beforeElement.style.fontWeight = 'bold';
        beforeElement.style.lineHeight = '1';
        beforeElement.style.display = 'block';
        beforeElement.style.padding = '1rem';
        beforeElement.style.transition = 'opacity 0.3s ease'; // Agregada propiedad de transición

        const priceText = productPrice.textContent;
        const priceValue = parseFloat(priceText.replace('€', '').replace(',', '.'));

        if (!isNaN(priceValue)) {
            const installmentPrice = (priceValue / 4).toFixed(2);

            container.addEventListener('mouseenter', function () {
                beforeElement.textContent = `Initial Payment: €${installmentPrice} \n
          Second Payment: €${installmentPrice} \n
          Third Payment: €${installmentPrice} \n
          Fourth Payment: €${installmentPrice}`;
                beforeElement.style.backgroundColor = '#000';
                beforeElement.style.border = '1px solid #ccc';
                beforeElement.style.opacity = '0'; // Inicialmente oculto
                container.insertBefore(beforeElement, container.firstChild);

                // Aplicar el cambio de opacidad después de un pequeño retraso
                setTimeout(function () {
                    beforeElement.style.opacity = '1';
                    container.style.opacity = '0'; // Oculta el contenedor original
                }, 10);
            });

            container.addEventListener('mouseleave', function () {
                beforeElement.textContent = '';
                beforeElement.style.backgroundColor = 'transparent';
                beforeElement.style.border = 'none';
                container.style.opacity = '1'; // Restaura la opacidad del contenedor original
            });

            window.addEventListener('scroll', function () {
                const boundingBox = beforeElement.getBoundingClientRect();

                // Verifica si el elemento está fuera del viewport y se ha hecho hover
                if (boundingBox.bottom < 0 && boundingBox.top > -boundingBox.height) {
                    beforeElement.style.top = '20px'; // Muestra hacia arriba si está fuera del viewport
                } else {
                    beforeElement.style.top = '-20px';
                }
            });
        }
    }
});



