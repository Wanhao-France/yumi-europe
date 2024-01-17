// Get the current date
var currentDate = new Date();
// Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
var currentDay = currentDate.getDay();

// Define an object with schedule information for each day
var schedules = {
    0: { day: "Sunday", startTime: "10:00 AM", endTime: "6:00 PM" },
    1: { day: "Monday", startTime: "9:00 AM", endTime: "5:00 PM" },
    2: { day: "Tuesday", startTime: "9:30 AM", endTime: "4:30 PM" },
    3: { day: "Wednesday", startTime: "8:00 AM", endTime: "4:00 PM" },
    4: { day: "Thursday", startTime: "10:30 AM", endTime: "6:30 PM" },
    5: { day: "Friday", startTime: "8:30 AM", endTime: "5:30 PM" },
    6: { day: "Saturday", startTime: "11:00 AM", endTime: "7:00 PM" }
};

// Get the schedule information for the current day
var currentSchedule = schedules[currentDay];

// Create a new li element
var newLi = document.createElement("li");

// Create the content of the new li with the schedule information for the current day
newLi.textContent = currentSchedule.day + ': ' + currentSchedule.startTime + ' - ' + currentSchedule.endTime;

// Add the new li to the pickUpAvailabilityContent element
var pickUpAvailabilityContent = document.getElementById(".pickUpAvailabilityContent");
pickUpAvailabilityContent.appendChild(newLi);


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

      // Actualiza el contenido del elemento 'dualPrice' con el nuevo precio
      dualPriceElement.textContent = nuevoPrecio.toFixed(2) + '€';
    });

    // Cambia la clase para alternar el estado del botón
    toggleContainer.classList.toggle('mostrar-ttc', mostrarTTC);

    // Cambia el texto del botón
    togglePreciosBtn.innerText = mostrarTTC ? 'HT' : 'TTC';
  }

  function calcularTTC(precioHT) {
    // Calcula el precio TTC sumando un 20% al precio HT
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





