document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('pay-credit-element');
    const productPrice = document.querySelector('.yv-product-price .dualPrice');

    if (container && productPrice) {
        const beforeElement = document.createElement('div');
        beforeElement.style.position = 'absolute';
        beforeElement.style.top = '70px';
        beforeElement.style.left = '0';
        beforeElement.style.backgroundColor = 'transparent';
        beforeElement.style.color = '#fff';
        beforeElement.style.padding = '5px';
        beforeElement.style.border = 'none';
        beforeElement.style.borderRadius = '5px';
        beforeElement.style.whiteSpace = 'pre-line';
        beforeElement.style.zIndex = '1';
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
        }
    }
});


document.addEventListener('DOMContentLoaded', function () {
    var displayStockElement = document.getElementById("display-stock");

    if (productData && productData.variants && productData.variants.length > 0) {
        var inventoryQuantity = productData.variants[0].inventory_quantity;
        console.log("Inventory Quantity:", inventoryQuantity); // Imprime la cantidad de inventario en la consola

        if (inventoryQuantity !== undefined) {
            displayStockElement.innerHTML = "In Stock: " + inventoryQuantity + " units available";
        } else {
            displayStockElement.innerHTML = "Out of Stock";
        }
    } else {
        displayStockElement.innerHTML = "Product data not available";
    }
});
