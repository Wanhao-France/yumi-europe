document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('pay-credit-element');

  if (container) {
    const card = container.querySelector('.card');
    const cardBack = container.querySelector('.card-back');

    container.addEventListener('mouseenter', function () {
      const priceText = document.querySelector('.yv-product-price .dualPrice').textContent;
      const priceValue = parseFloat(priceText.replace('€', '').replace(',', '.'));

      if (!isNaN(priceValue)) {
        const installmentPrice = (priceValue / 4).toFixed(2);

        cardBack.textContent = `Initial Payment: €${installmentPrice} \n
          Second Payment: €${installmentPrice} \n
          Third Payment: €${installmentPrice} \n
          Fourth Payment: €${installmentPrice}`;
        cardBack.style.backgroundColor = '#000';
        cardBack.style.border = '1px solid #ccc';
        card.insertBefore(cardBack, card.firstChild);
      }
    });

    container.addEventListener('mouseleave', function () {
      cardBack.textContent = '';
      cardBack.style.backgroundColor = 'transparent';
      cardBack.style.border = 'none';
    });

    window.addEventListener('scroll', function () {
      const boundingBox = card.getBoundingClientRect();

      if (boundingBox.bottom < 0 && boundingBox.top > -boundingBox.height) {
        cardBack.style.top = '20px';
      } else {
        cardBack.style.top = '-20px';
      }
    });
  }
});
