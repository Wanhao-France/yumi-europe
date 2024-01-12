document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('pay-credit-element');
    const productPrice = document.querySelector('.yv-product-price .dualPrice');

    if (container && productPrice) {
        const beforeElement = document.createElement('div');
        beforeElement.style.position = 'absolute';
        beforeElement.style.top = '0';
        beforeElement.style.left = '0';
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
        beforeElement.style.transition = 'opacity 0.3s ease'; // Agregada propiedad de transición

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
                beforeElement.style.opacity = '0'; // Inicialmente oculto
                container.insertBefore(beforeElement, container.firstChild);

                // Aplicar el cambio de opacidad después de un pequeño retraso
                setTimeout(function () {
                    beforeElement.style.opacity = '1';
                    container.style.opacity = '0'; // Oculta el contenedor original
                }, 10);
            });

            container.addEventListener('mouseleave', function () {
                beforeElement.textContent = '';
                beforeElement.style.backgroundColor = 'transparent';
                beforeElement.style.border = 'none';
                container.style.opacity = '1'; // Restaura la opacidad del contenedor original
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

