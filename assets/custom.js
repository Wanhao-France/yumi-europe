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
                container.style.transform = 'rotateY(180deg)';
                setTimeout(function () {
                    beforeElement.textContent = `Initial Payment: €${installmentPrice}\n
          Second Payment: €${installmentPrice}\n
          Third Payment: €${installmentPrice}\n
          Fourth Payment: €${installmentPrice}`;
                    container.style.opacity = '0';
                    beforeElement.style.opacity = '1';
                }, 300); // ajusta el tiempo según la duración de la animación CSS de rotación y desvanecimiento
            });

            container.addEventListener('mouseleave', function () {
                container.style.transform = 'rotateY(0deg)';
                container.style.opacity = '1';
                beforeElement.textContent = '';
                beforeElement.style.opacity = '0';
            });
        }
    }
});
