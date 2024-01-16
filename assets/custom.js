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

// assets/notification.js

document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('notification-container');

  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = message;

    container.appendChild(notification);
    container.style.display = 'block';

    setTimeout(() => {
      container.style.display = 'none';
      notification.remove();
    }, 5000);
  }

  window.showNotification = showNotification; // Hacer la función accesible globalmente
});

