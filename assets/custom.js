document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('pay-credit-element');
    const productPrice = document.querySelector('.yv-product-price .dualPrice');

    if (container && productPrice) {
        const cardElement = document.createElement('div');
        cardElement.style.position = 'absolute';
        cardElement.style.top = '20px';
        cardElement.style.left = '10px';
        cardElement.style.backgroundColor = 'transparent';
        cardElement.style.color = '#fff';
        cardElement.style.padding = '5px';
        cardElement.style.border = 'none';
        cardElement.style.borderRadius = '5px';
        cardElement.style.whiteSpace = 'pre-line';
        cardElement.style.zIndex = '9999';
        cardElement.style.fontSize = '16px';
        cardElement.style.fontWeight = 'bold';
        cardElement.style.lineHeight = '1';
        cardElement.style.display = 'block';
        cardElement.style.padding = '1rem';
        cardElement.style.transition = 'transform 0.3s ease'; // Añade una transición para suavizar el giro
        const priceText = productPrice.textContent;
        const priceValue = parseFloat(priceText.replace('€', '').replace(',', '.'));

        if (!isNaN(priceValue)) {
            const installmentPrice = (priceValue / 4).toFixed(2);

            container.addEventListener('mouseenter', function () {
                cardElement.textContent = `Initial Payment: €${installmentPrice} \n
          Second Payment: €${installmentPrice} \n
          Third Payment: €${installmentPrice} \n
          Fourth Payment: €${installmentPrice}`;
                cardElement.style.backgroundColor = '#000';
                cardElement.style.border = '1px solid #ccc';
                cardElement.style.transform = 'rotateY(180deg)'; // Gira la tarjeta en el eje Y
                container.insertBefore(cardElement, container.firstChild);
            });

            container.addEventListener('mouseleave', function () {
                cardElement.textContent = '';
                cardElement.style.backgroundColor = 'transparent';
                cardElement.style.border = 'none';
                cardElement.style.transform = 'rotateY(0deg)'; // Vuelve a la posición inicial
            });
        }
    }
});


