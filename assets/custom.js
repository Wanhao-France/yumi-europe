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

    // Disparar un evento personalizado para indicar que el estado ha cambiado
    const toggleChangeEvent = new CustomEvent('toggleStateChanged', { detail: { showTTC } });
    document.dispatchEvent(toggleChangeEvent);

    // Recargar la página (puedes cambiar esto a solo actualizar el contenido si es necesario)
    location.reload();
  }

  togglePricesBtn.addEventListener('click', handleToggleClick);

  // Inicializar el toggle con los estilos correctos
  updateStyles();
});

// TTC Functionality

function modificarElemento(elemento, showTTC) {
  const dualPriceElement = elemento.querySelector('.yv-product-price .dualPrice');

  // Verificar que dualPriceElement no sea null antes de continuar
  if (dualPriceElement) {
    const rect = elemento.getBoundingClientRect();
    let ttcProperty = elemento.getAttribute('ttc');

    if (rect.top >= 0 && rect.bottom <= window.innerHeight && ttcProperty !== 'true' && showTTC) {
      let precioActual = obtenerPrecio(dualPriceElement.textContent);

      if (!ttcProperty) {
        let nuevoPrecio = precioActual * 1.2;

        // Buscar el elemento .discounts en toda la jerarquía ascendente
        const discountElement = buscarDescuento(elemento);
        console.log(discountElement);

        if (discountElement) {
          // Obtener el porcentaje de descuento del elemento .discounts
          const porcentajeDescuento = obtenerPorcentajeDescuento(discountElement.textContent);

          // Calcular el precio tachado en TTC
          let precioTachadoTTC = obtenerPrecioTachadoTTC(precioActual, porcentajeDescuento);


          // Actualizar el contenido de los elementos
          dualPriceElement.textContent = formatearPrecio(nuevoPrecio) + '€';

          // Crear un nuevo elemento para el precio tachado en TTC
          let nuevoElemento = document.createElement('span');
          nuevoElemento.className = 'compare-price';  // Ajusta la clase según tus necesidades
          nuevoElemento.innerHTML = '<span class="dualPrice">' + formatearPrecio(precioTachadoTTC) + '€</span>';

          // Insertar el nuevo elemento después de dualPriceElement
          elemento.appendChild(nuevoElemento);

          ttcProperty = 'true';
          elemento.setAttribute('ttc', ttcProperty);
        }
      }
    }
  }
}


function buscarDescuento(elemento) {
  return elemento.querySelector('.discounts') || (elemento.parentNode && buscarDescuento(elemento.parentNode));
}

function obtenerPorcentajeDescuento(textoDescuento) {
  // Función para extraer el porcentaje del texto del descuento
  const match = textoDescuento.match(/\d+/); // Buscar dígitos en el texto
  return match ? parseFloat(match[0]) : 0; // Convertir los dígitos a número, si se encuentran
}

function obtenerPrecioTachadoTTC(precio, porcentajeDescuento) {
  // Función para calcular el precio tachado en TTC restando el porcentaje de descuento
  return precio - (precio * porcentajeDescuento / 100);
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
