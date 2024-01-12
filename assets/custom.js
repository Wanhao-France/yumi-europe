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
});




