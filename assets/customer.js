const selectors = {
    customerAddresses: 'body',
    addressCountrySelect: '[data-address-country-select]',
    addressContainer: '[data-address]',
    toggleAddressButton: 'button[aria-expanded]',
    cancelAddressButton: 'button[type="reset"]',
    deleteAddressButton: 'button[data-confirm-message]'
};

const attributes = {
    expanded: 'aria-expanded',
    confirmMessage: 'data-confirm-message'
};

class CustomerAddresses {
    constructor() {
        this.elements = this._getElements();
        if (Object.keys(this.elements).length === 0) return;
        this._setupCountries();
        this._setupEventListeners();
    }

    _getElements() {
        const container = document.querySelector(selectors.customerAddresses);
        return container ? {
            container,
            addressContainer: container.querySelector(selectors.addressContainer),
            toggleButtons: document.querySelectorAll(selectors.toggleAddressButton),
            cancelButtons: container.querySelectorAll(selectors.cancelAddressButton),
            deleteButtons: container.querySelectorAll(selectors.deleteAddressButton),
            countrySelects: container.querySelectorAll(selectors.addressCountrySelect)
        } : {};
    }

    _setupCountries() {
        if (Shopify && Shopify.CountryProvinceSelector) {
            // eslint-disable-next-line no-new
            new Shopify.CountryProvinceSelector('AddressCountryNew', 'AddressProvinceNew', {
                hideElement: 'AddressProvinceContainerNew'
            });
            this.elements.countrySelects.forEach((select) => {
                const formId = select.dataset.formId;
                // eslint-disable-next-line no-new
                new Shopify.CountryProvinceSelector(`AddressCountry_${formId}`, `AddressProvince_${formId}`, {
                    hideElement: `AddressProvinceContainer_${formId}`
                });
            });
        }
    }

    _setupEventListeners() {
        this.elements.toggleButtons.forEach((element) => {
            element.addEventListener('click', this._handleAddEditButtonClick);
        });
        this.elements.cancelButtons.forEach((element) => {
            element.addEventListener('click', this._handleCancelButtonClick);
        });
        this.elements.deleteButtons.forEach((element) => {
            element.addEventListener('click', this._handleDeleteButtonClick);
        });
    }

    _toggleExpanded(target) {

        let elementId = target.getAttribute('id');
        if (target.hasAttribute('data-address')) {
            elementId = target.dataset.id;
        }
        focusElement = $('#' + elementId)
        $(document).find('.yv_side_drawer_close').trigger('focus');
        var popUp = target.parentNode.querySelector(".addressPopUp").innerHTML;
        var newTarget = document.querySelector('[data-drawer-body]');
        var parent = document.querySelector('[data-side-drawer]');
        parent.setAttribute('class', 'yv_side_drawer_wrapper');
        parent.setAttribute('id', 'addressSection');
        parent.classList.add('addressSection');
        document.querySelector('[data-drawer-title]').innerHTML = target.getAttribute('data-title');
        newTarget.innerHTML = popUp;

        document.querySelector('body').classList.add('side_Drawer_open');
        this.elements = this._getElements();
        this._setupCountries();
        this._setupEventListeners();
    }

    _handleAddEditButtonClick = ({ currentTarget }) => {
        this._toggleExpanded(currentTarget);
    }

    _handleCancelButtonClick = ({ currentTarget }) => {
        document.querySelector('body').classList.remove('side_Drawer_open');
    }

    _handleDeleteButtonClick = ({ currentTarget }) => {
        // eslint-disable-next-line no-alert
        if (confirm(currentTarget.getAttribute(attributes.confirmMessage))) {
            Shopify.postLink(currentTarget.dataset.target, {
                parameters: { _method: 'delete' },
            });
        }
    }
}


//** Reorder Product **//

$('.reorderButton').on('click', function(e) {
    e.preventDefault();
    console.log('reorderButton')
    let button = e.target;
    let formHtml = button.closest('.action-container').querySelector('.Reorder__container');
    let cloneForm = formHtml.cloneNode(true);
    let cartData = $('.yv-reorder-popup-body').html(cloneForm);
    if (emptyCartStatus) {
        $('.yv-reorder-popup-body').find('.Reorder__container').addClass('cart-empty');
        $(cartData).find('.reorder__clear-cart').attr("disabled", true);
    }
    let addToCart = $('.yv-reorder-popup-body').find('.Reorder__container');
    if (emptyCartStatus) {
        $(cartData).find('.reorder__clear-cart').attr("disabled", true);
    } else {
        $(cartData).find('.reorder__clear-cart').attr("disabled", false);
        $(cartData).find('.cart-warning-wrapper').html("<p class='error-text'>"+cartStatusNotEmpty+"</p>");
    }
    $('body').addClass('reorderPopupShow');
});

// Reorder Popup Close
$(document).on('click', '.reorder__cancel-item', function(e) {
    e.preventDefault();
    var addToCartForm = $(this).closest('.Reorder__container');
    addToCartForm.removeClass('cart-warning');
    addToCartForm.removeClass('addToCart');
    $('body').removeClass('reorderPopupShow');
});
//** Add To Cart **//

$(document).on('click', '.reorder__add_to_cart', function(e) {
    e.preventDefault();
    var button = e.target
    this.classList.add('is-loading');
    var addToCartForm = button.closest('.Reorder__container').querySelectorAll('form');
    Shopify.queue = [];
    addToCartForm.forEach(form => {
        var formData = new FormData(form);
        Shopify.queue.push({
            form: formData,
            formSelector: form
        });
    });
    multipleProductsAddToCart();
});

//**  Move Along Function **//

multipleProductsAddToCart = function() {
    // If we still have requests in the queue, let's process the next one.
    if (Shopify.queue.length) {
        var request = Shopify.queue.shift();
        let formData = request.form;
        let form = request.formSelector;
        var data = $(form).serialize();
        // $(form).find('.form-status').addClass('adding_to_cart');
        // $(form).find('.form-status').html('adding items to cart.');
        // $(form).find('.form-error').html('');

        $(form).find('.form-status').addClass('hidden');
        $(form).find('.form-loading').removeClass('hidden');
        $.ajax({
            type: 'POST',
            url: cartAddUrl,
            data: data,
            dataType: 'json',
            success: function(res) {
                // $(form).find('.form-status').removeClass('adding_to_cart');
                // $(form).find('.form-status').addClass('items__added');
                // $(form).find('.form-status').html('items added');
                $(form).find('.form-status').addClass('hidden');
                $(form).find('.form-success').removeClass('hidden');
                multipleProductsAddToCart();
            },
            error: function(XMLHttpRequest, textStatus) {
                let submit = $('.reorder__add_to_cart');
                if (textStatus) {
                    $(form).find('.form-status').addClass('hidden');
                    // $(form).find('.form-status').removeClass('adding_to_cart');
                    $(form).find('.form-error').removeClass('hidden');
                }
                if (Shopify.queue.length) {
                    multipleProductsAddToCart()
                }
                setTimeout(function() {
                    submit.removeClass('is-loading');
                }, 1000)
            }
        });
    }
    // If the queue is empty, we add 1 to cart
    else {
        setTimeout(function() {
            let submit = $('.reorder__add_to_cart');
            $('body').removeClass('reorderPopupShow');
            if (cartDrawerEnable) {
                $('[data-drawer-body]').html(preLoadLoadGif);
                $('body').find('[data-side-drawer]').attr('class', 'yv_side_drawer_wrapper')
                $('body').find('[data-drawer-title]').html(cartTitleLabel);
                $('body').find('[data-side-drawer]').attr('id', 'mini__cart');
                $('body').find('[data-side-drawer]').addClass('mini_cart');
                $('body').removeClass('quickview-open');
                $('body').addClass('side_Drawer_open');
                jQuery.getJSON(cartUrl, function(cart, textStatus) {
                    buildCart(cart, true);
                    setTimeout(function() {
                        submit.removeClass('is-loading');
                    }, 1000)
                });
            } else {
                window.location.assign(mainCartUrl);
            }
        }, 1000)
    }
}

//** Clear Cart **// 

$(document).on('click', '.reorder__clear-cart', function(e) {
    e.preventDefault();
    var button = e.target;
    var addToCartForm = $(this).closest('.Reorder__container');
    fetch(window.Shopify.routes.root + 'cart/clear.js', {

        })
        .then((response) => {
            return response.json();
        })
        .then(function(json) {
            jQuery.getJSON(cartUrl, function(cart, textStatus) {
                buildCart(cart, true);
                if (emptyCartStatus = true) {
                    button.setAttribute("disabled", true);
                    $(addToCartForm).closest('.Reorder__container').find('.cart-warning-wrapper').html("<p class='success-text'>"+cartStatusEmpty+"</p>");
                }
            });
        });
});
$(document).on('change', '#variantQty', function() {
    let value = parseInt($(this).val());
    let maxLength = parseInt($(this).attr('maxlength'));
    if (value > maxLength) {
        $(this).val(maxLength);
    } else if (value <= 0) {
        $(this).val(1);
    }
});