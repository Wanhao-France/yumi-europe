document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('pay-credit-element');
    const productPrice = document.querySelector('.yv-product-price .dualPrice');

    if (container && productPrice) {
        const beforeElement = document.createElement('div');
        beforeElement.style.position = 'absolute';
        beforeElement.style.top = '20px';
        beforeElement.style.left = '10px';
        beforeElement.style.backgroundColor = 'transparent';
        beforeElement.style.color = '#fff';
        beforeElement.style.padding = '5px';
        beforeElement.style.border = 'none';
        beforeElement.style.borderRadius = '5px';
        beforeElement.style.whiteSpace = 'pre-line';
        beforeElement.style.zIndex = '9999'; // Ajusta el zIndex a un valor alto para asegurar que esté sobre todo
        beforeElement.style.fontSize = '16px';
        beforeElement.style.fontWeight = 'bold';
        beforeElement.style.lineHeight = '1';
        beforeElement.style.display = 'block';
        beforeElement.style.padding = '1rem';
        const priceText = productPrice.textContent;
        const priceValue = parseFloat(priceText.replace('€', '').replace(',', '.'));

        if (!isNaN(priceValue)) {
            const installmentPrice = (priceValue / 4).toFixed(2);

            container.addEventListener('mouseenter', function () {
                beforeElement.textContent = `Initial Payment: €${installmentPrice} \n
          Second Payment: €${installmentPrice} \n
          Third Payment: €${installmentPrice} \n
          Fourth Payment: €${installmentPrice}`;
                beforeElement.style.backgroundColor = '#000';
                beforeElement.style.border = '1px solid #ccc';
                container.insertBefore(beforeElement, container.firstChild);
            });

            container.addEventListener('mouseleave', function () {
                beforeElement.textContent = '';
                beforeElement.style.backgroundColor = 'transparent';
                beforeElement.style.border = 'none';
            });

            window.addEventListener('scroll', function () {
                const boundingBox = beforeElement.getBoundingClientRect();

                // Verifica si el elemento está fuera del viewport y se ha hecho hover
                if (boundingBox.bottom < 0 && boundingBox.top > -boundingBox.height) {
                    beforeElement.style.top = '20px'; // Muestra hacia arriba si está fuera del viewport
                } else {
                    beforeElement.style.top = '-20px';
                }
            });
        }
    }
});


