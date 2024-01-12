document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('pay-credit-element');
    const productPrice = document.querySelector('.yv-product-price .dualPrice');

    if (container && productPrice) {
        const priceText = productPrice.textContent;
        const priceValue = parseFloat(priceText.replace('€', '').replace(',', '.'));

        if (!isNaN(priceValue)) {
            const installmentPrice = (priceValue / 4).toFixed(2);

            container.addEventListener('mouseenter', function () {
                container.classList.add('hovered');
                container.innerHTML = `
                    <div class="info-card">
                        Initial Payment: €${installmentPrice}<br>
                        Second Payment: €${installmentPrice}<br>
                        Third Payment: €${installmentPrice}<br>
                        Fourth Payment: €${installmentPrice}
                    </div>
                `;
            });

            container.addEventListener('mouseleave', function () {
                container.classList.remove('hovered');
                container.innerHTML = `
                    <img src="https://i.ibb.co/4STZpWj/credit-card.png" />
                    <p>PAY IN 3X OR 4X FREE OF CHARGE FROM €100 TO €2000 INCL. TAX</p>
                `;
            });
        }
    }
});
