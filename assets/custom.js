document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('pay-credit-element');
  const productPrice = document.querySelector('.yv-product-price .dualPrice');

  if (container && productPrice) {
    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';
    container.appendChild(cardContainer);

    const cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    cardContainer.appendChild(cardFront);

    const cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.textContent = ''; // Puedes colocar la información que deseas mostrar en la parte posterior de la tarjeta aquí
    cardContainer.appendChild(cardBack);

    const priceText = productPrice.textContent;
    const priceValue = parseFloat(priceText.replace('€', '').replace(',', '.'));

    if (!isNaN(priceValue)) {
      const installmentPrice = (priceValue / 4).toFixed(2);

      container.addEventListener('mouseenter', function () {
        cardBack.textContent = `Initial Payment: €${installmentPrice} \n
          Second Payment: €${installmentPrice} \n
          Third Payment: €${installmentPrice} \n
          Fourth Payment: €${installmentPrice}`;
        cardFront.style.backgroundColor = '#000';
        cardFront.style.border = '1px solid #ccc';
      });

      container.addEventListener('mouseleave', function () {
        cardBack.textContent = '';
        cardFront.style.backgroundColor = 'transparent';
        cardFront.style.border = 'none';
      });

      window.addEventListener('scroll', function () {
        const boundingBox = cardFront.getBoundingClientRect();

        // Verifica si el elemento está fuera del viewport y se ha hecho hover
        if (boundingBox.bottom < 0 && boundingBox.top > -boundingBox.height) {
          cardFront.style.top = '20px'; // Muestra hacia arriba si está fuera del viewport
        } else {
          cardFront.style.top = '-20px';
        }
      });
    }
  }
});



