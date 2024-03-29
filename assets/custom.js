function getLocalStorageValue(key) {
  // Obtener el valor del localStorage y parsearlo a JSON
  var localStorageValue = localStorage.getItem(key);
  
  // Convertir la cadena JSON a un objeto JavaScript
  var parsedValue = JSON.parse(localStorageValue);

  return parsedValue;
}

// Obtener el valor de showTTC del localStorage
var showTTCValue = getLocalStorageValue('showTTC');
var porcentajeTTC = 0.2;

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

  if (dualPriceElement) {
    let ttcProperty = elemento.getAttribute('ttc');
    if (ttcProperty !== 'true' && showTTC) {
      let precioActual = obtenerPrecio(dualPriceElement.textContent);

      if (!ttcProperty) {
        let nuevoPrecio = precioActual + (precioActual * porcentajeTTC);

        dualPriceElement.textContent = formatearPrecio(nuevoPrecio) + '€';


        ttcProperty = 'true';
        elemento.setAttribute('ttc', ttcProperty);
      }
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


function actualizarPrecios() {
  var showTTCValue = getLocalStorageValue('showTTC');

  if (showTTCValue === true) {
    var elementosPadre = document.querySelectorAll('.yv-product-compare-price');

    elementosPadre.forEach(function (elementoPadre) {

      if (!elementoPadre.classList.contains('actualizado')) {
        var elementosHijos = elementoPadre.querySelectorAll('.dualPrice');

        elementosHijos.forEach(function (elementoHijo) {
          if (!elementoHijo.classList.contains('actualizado')) {
            if (!elementoPadre.classList.contains('no-actualizar')) {
              var textoActual = elementoHijo.textContent;
              var valorNumerico = parseFloat(textoActual.replace(/[^\d,.-]/g, '').replace(',', '').replace('.', '').replace('-', '.'));

              var nuevoValor = valorNumerico + (valorNumerico * porcentajeTTC);
              var valorFinal = nuevoValor / 100;

              var nuevoTexto = '€' + valorFinal.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

              elementoHijo.textContent = nuevoTexto;

              elementoHijo.classList.add('actualizado');
            }
          }
        });

        // Agregar la clase 'actualizado' al elemento padre
        elementoPadre.classList.add('actualizado');
      }
    });
  }
}
function actualizarPrecios() {
  // Obtener el valor de showTTC del localStorage
  var showTTCValue = getLocalStorageValue('showTTC');

  if (showTTCValue === true) {
    var elementosPadre = document.querySelectorAll('.yv-product-compare-price');

    elementosPadre.forEach(function (elementoPadre) {
      // Verificar si el elemento padre ya ha sido actualizado
      if (!elementoPadre.classList.contains('actualizado')) {
        // Verificar si el elemento padre no tiene la clase "no-actualizar"
        if (!elementoPadre.classList.contains('no-actualizar')) {
          // Obtener todos los elementos hijos dentro del elemento padre
          var elementosHijos = elementoPadre.querySelectorAll('.dualPrice');

          elementosHijos.forEach(function (elementoHijo) {
            // Verificar si el elemento hijo ya ha sido actualizado
            if (!elementoHijo.classList.contains('actualizado')) {
              var textoActual = elementoHijo.textContent;
              var valorNumerico = parseFloat(textoActual.replace(/[^\d,.-]/g, '').replace(',', '').replace('.', '').replace('-', '.'));

              var nuevoValor = valorNumerico + (valorNumerico * porcentajeTTC);
              var valorFinal = nuevoValor / 100;

              var nuevoTexto = '€' + valorFinal.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

              elementoHijo.textContent = nuevoTexto;

              // Agregar la clase 'actualizado' al elemento hijo
              elementoHijo.classList.add('actualizado');
            }
          });

          // Agregar la clase 'actualizado' al elemento padre
          elementoPadre.classList.add('actualizado');
        }
      }
    });
  }
}

// Asociar la función de actualización al evento de scroll
window.addEventListener('scroll', actualizarPrecios);

// Llamar a la función por primera vez para que los precios se actualicen al cargar la página
actualizarPrecios();

// Escuchar cambios en showTTCValue
window.addEventListener('storage', function (event) {
  if (event.key === 'showTTC') {
    actualizarPrecios();
  }
});

//TTC Cart/Controller

document.addEventListener("DOMContentLoaded", function() {
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

// Little Functions Variables
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

// Función para ocultar elementos con un solo hijo ul que tiene un solo li
function ocultarSiUnSoloHijoConUnSoloLi(selector) {
  document.querySelectorAll(selector).forEach(function(elemento) {
    // Verificar si tiene solo un hijo ul
    var hijosUl = elemento.querySelectorAll('ul');
    if (hijosUl.length === 1 && hijosUl[0].parentNode === elemento) {
      // Verificar si el ul tiene solo un li
      var hijosLi = hijosUl[0].querySelectorAll('li');
      if (hijosLi.length === 1 && hijosLi[0].parentNode === hijosUl[0]) {
        // Ocultar el elemento
        elemento.style.display = 'none';
      }
    }
  });
}

// Llamar a la función para ocultar .select-color y .select-material
ocultarSiUnSoloHijoConUnSoloLi('.select-color');
ocultarSiUnSoloHijoConUnSoloLi('.select-material');
ocultarSiUnSoloHijoConUnSoloLi('.select-poids');
ocultarSiUnSoloHijoConUnSoloLi('.select-style');




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