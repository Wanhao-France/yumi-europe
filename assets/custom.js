document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('pay-credit-element');
    const card = document.querySelector('.card');

    if (container && card) {
        const cardBack = card.querySelector('.card-back');

        container.addEventListener('mouseenter', function () {
            // Aquí puedes personalizar la información que se muestra en el reverso de la tarjeta
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
            }
        });

        container.addEventListener('mouseleave', function () {
            cardBack.textContent = '';
            cardBack.style.backgroundColor = 'transparent';
            cardBack.style.border = 'none';
        });

        window.addEventListener('scroll', function () {
            const boundingBox = container.getBoundingClientRect();

            if (boundingBox.bottom < 0 && boundingBox.top > -boundingBox.height) {
                cardBack.style.top = '20px';
            } else {
                cardBack.style.top = '-20px';
            }
        });
    }
});
