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


document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('notification-container');
  
  function showCustomNotification(message, type = 'info') {
    const existingNotification = document.getElementById('custom-notification');
  
    if (existingNotification) {
      existingNotification.remove();
    }
  
    const notification = document.createElement('div');
    notification.id = 'custom-notification';
    notification.className = `notification ${type}`;
    notification.innerHTML = message;
  
    container.appendChild(notification);
    container.style.display = 'block';
  }
  
  // Obtén la hora actual en el formato HH:MM
  const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
  
  if (currentTime < '13:00') {
    const notificationMessage = "Si haces tu compra antes de las 13:00, tu comanda puede ser liberada el mismo día.";
    showCustomNotification(notificationMessage, 'info');
  }
});

