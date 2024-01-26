var cartNoteTyping;

validateQty = function (qty) {
  if (parseFloat(qty) == parseInt(qty) && !isNaN(qty)) {
    // We have a valid number!
  } else {
    // Not a number. Default to 1.
    qty = 1;
  }
  return qty;
};

const countryList = {
  AF: "Afghanistan",
  AX: "Aland Islands",
  AL: "Albania",
  DZ: "Algeria",
  AS: "American Samoa",
  AD: "Andorra",
  AO: "Angola",
  AI: "Anguilla",
  AQ: "Antarctica",
  AG: "Antigua and Barbuda",
  AR: "Argentina",
  AM: "Armenia",
  AW: "Aruba",
  AU: "Australia",
  AT: "Austria",
  AZ: "Azerbaijan",
  BS: "Bahamas",
  BH: "Bahrain",
  BD: "Bangladesh",
  BB: "Barbados",
  BY: "Belarus",
  BE: "Belgium",
  BZ: "Belize",
  BJ: "Benin",
  BM: "Bermuda",
  BT: "Bhutan",
  BO: "Bolivia",
  BQ: "Bonaire, Sint Eustatius and Saba",
  BA: "Bosnia and Herzegovina",
  BW: "Botswana",
  BV: "Bouvet Island",
  BR: "Brazil",
  IO: "British Indian Ocean Territory",
  BN: "Brunei Darussalam",
  BG: "Bulgaria",
  BF: "Burkina Faso",
  BI: "Burundi",
  KH: "Cambodia",
  CM: "Cameroon",
  CA: "Canada",
  CV: "Cape Verde",
  KY: "Cayman Islands",
  CF: "Central African Republic",
  TD: "Chad",
  CL: "Chile",
  CN: "China",
  CX: "Christmas Island",
  CC: "Cocos (Keeling) Islands",
  CO: "Colombia",
  KM: "Comoros",
  CG: "Congo",
  CD: "Congo, the Democratic Republic of the",
  CK: "Cook Islands",
  CR: "Costa Rica",
  CI: "Cote D'Ivoire",
  HR: "Croatia",
  CU: "Cuba",
  CW: "Curacao",
  CY: "Cyprus",
  CZ: "Czech Republic",
  DK: "Denmark",
  DJ: "Djibouti",
  DM: "Dominica",
  DO: "Dominican Republic",
  EC: "Ecuador",
  EG: "Egypt",
  SV: "El Salvador",
  GQ: "Equatorial Guinea",
  ER: "Eritrea",
  EE: "Estonia",
  ET: "Ethiopia",
  FK: "Falkland Islands (Malvinas)",
  FO: "Faroe Islands",
  FJ: "Fiji",
  FI: "Finland",
  FR: "France",
  GF: "French Guiana",
  PF: "French Polynesia",
  TF: "French Southern Territories",
  GA: "Gabon",
  GM: "Gambia",
  GE: "Georgia",
  DE: "Germany",
  GH: "Ghana",
  GI: "Gibraltar",
  GR: "Greece",
  GL: "Greenland",
  GD: "Grenada",
  GP: "Guadeloupe",
  GU: "Guam",
  GT: "Guatemala",
  GG: "Guernsey",
  GN: "Guinea",
  GW: "Guinea-Bissau",
  GY: "Guyana",
  HT: "Haiti",
  HM: "Heard Island and Mcdonald Islands",
  VA: "Holy See (Vatican City State)",
  HN: "Honduras",
  HK: "Hong Kong",
  HU: "Hungary",
  IS: "Iceland",
  IN: "India",
  ID: "Indonesia",
  IR: "Iran, Islamic Republic of",
  IQ: "Iraq",
  IE: "Ireland",
  IM: "Isle of Man",
  IL: "Israel",
  IT: "Italy",
  JM: "Jamaica",
  JP: "Japan",
  JE: "Jersey",
  JO: "Jordan",
  KZ: "Kazakhstan",
  KE: "Kenya",
  KI: "Kiribati",
  KP: "Korea, Democratic People's Republic of",
  KR: "Korea, Republic of",
  XK: "Kosovo",
  KW: "Kuwait",
  KG: "Kyrgyzstan",
  LA: "Lao People's Democratic Republic",
  LV: "Latvia",
  LB: "Lebanon",
  LS: "Lesotho",
  LR: "Liberia",
  LY: "Libyan Arab Jamahiriya",
  LI: "Liechtenstein",
  LT: "Lithuania",
  LU: "Luxembourg",
  MO: "Macao",
  MK: "Macedonia, the Former Yugoslav Republic of",
  MG: "Madagascar",
  MW: "Malawi",
  MY: "Malaysia",
  MV: "Maldives",
  ML: "Mali",
  MT: "Malta",
  MH: "Marshall Islands",
  MQ: "Martinique",
  MR: "Mauritania",
  MU: "Mauritius",
  YT: "Mayotte",
  MX: "Mexico",
  FM: "Micronesia, Federated States of",
  MD: "Moldova, Republic of",
  MC: "Monaco",
  MN: "Mongolia",
  ME: "Montenegro",
  MS: "Montserrat",
  MA: "Morocco",
  MZ: "Mozambique",
  MM: "Myanmar",
  NA: "Namibia",
  NR: "Nauru",
  NP: "Nepal",
  NL: "Netherlands",
  AN: "Netherlands Antilles",
  NC: "New Caledonia",
  NZ: "New Zealand",
  NI: "Nicaragua",
  NE: "Niger",
  NG: "Nigeria",
  NU: "Niue",
  NF: "Norfolk Island",
  MP: "Northern Mariana Islands",
  NO: "Norway",
  OM: "Oman",
  PK: "Pakistan",
  PW: "Palau",
  PS: "Palestinian Territory, Occupied",
  PA: "Panama",
  PG: "Papua New Guinea",
  PY: "Paraguay",
  PE: "Peru",
  PH: "Philippines",
  PN: "Pitcairn",
  PL: "Poland",
  PT: "Portugal",
  PR: "Puerto Rico",
  QA: "Qatar",
  RE: "Reunion",
  RO: "Romania",
  RU: "Russian Federation",
  RW: "Rwanda",
  BL: "Saint Barthelemy",
  SH: "Saint Helena",
  KN: "Saint Kitts and Nevis",
  LC: "Saint Lucia",
  MF: "Saint Martin",
  PM: "Saint Pierre and Miquelon",
  VC: "Saint Vincent and the Grenadines",
  WS: "Samoa",
  SM: "San Marino",
  ST: "Sao Tome and Principe",
  SA: "Saudi Arabia",
  SN: "Senegal",
  RS: "Serbia",
  CS: "Serbia and Montenegro",
  SC: "Seychelles",
  SL: "Sierra Leone",
  SG: "Singapore",
  SX: "Sint Maarten",
  SK: "Slovakia",
  SI: "Slovenia",
  SB: "Solomon Islands",
  SO: "Somalia",
  ZA: "South Africa",
  GS: "South Georgia and the South Sandwich Islands",
  SS: "South Sudan",
  ES: "Spain",
  LK: "Sri Lanka",
  SD: "Sudan",
  SR: "Suriname",
  SJ: "Svalbard and Jan Mayen",
  SZ: "Swaziland",
  SE: "Sweden",
  CH: "Switzerland",
  SY: "Syrian Arab Republic",
  TW: "Taiwan, Province of China",
  TJ: "Tajikistan",
  TZ: "Tanzania, United Republic of",
  TH: "Thailand",
  TL: "Timor-Leste",
  TG: "Togo",
  TK: "Tokelau",
  TO: "Tonga",
  TT: "Trinidad and Tobago",
  TN: "Tunisia",
  TR: "Turkey",
  TM: "Turkmenistan",
  TC: "Turks and Caicos Islands",
  TV: "Tuvalu",
  UG: "Uganda",
  UA: "Ukraine",
  AE: "United Arab Emirates",
  GB: "United Kingdom",
  US: "United States",
  UM: "United States Minor Outlying Islands",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VU: "Vanuatu",
  VE: "Venezuela",
  VN: "Viet Nam",
  VG: "Virgin Islands, British",
  VI: "Virgin Islands, U.s.",
  WF: "Wallis and Futuna",
  EH: "Western Sahara",
  YE: "Yemen",
  ZM: "Zambia",
  ZW: "Zimbabwe",
};
let convertShippingAmount = freeShippingBarAmount;
function checkShippingAvailablity() {
  let selectedCountry = Shopify.country;
  let shippingCountriesContainer = $("#shippingcountries");
  if (shippingCountriesContainer.length == 0) {
    shippingCountriesContainer = $("#shippingCountry");
  }
  if (
    shippingCountriesContainer &&
    shippingCountriesContainer.find("option").length > 0
  ) {
    let shippingSelectedCountry = countryList[selectedCountry];
    if (
      shippingCountriesContainer.find(
        'option[value="' + shippingSelectedCountry + '"]'
      ).length > 0
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function freeShippingBar(cart) {
  let countryAvailable = checkShippingAvailablity();
  let shippingBarContainer = $("[data-free-shipping-container]");
  if (countryAvailable && shippingBarContainer.length > 0) {
    if (cart.item_count == 0) {
      shippingBarContainer.addClass("hidden");
      return false;
    }
    let cartPrice = cart.original_total_price;
    let shippending = Shopify.formatMoney(
      convertShippingAmount - cartPrice,
      moneyFormat
    );
    let shippingPercentage = parseFloat(
      (cartPrice * 100) / convertShippingAmount
    ).toFixed(2);
    if (shippingPercentage > 10 && shippingPercentage < 100) {
      shippingPercentage = shippingPercentage - 5;
    } else if (shippingPercentage > 100) {
      shippingPercentage = 100;
    }
    if ($("[data-free-shipping-text]").length > 0) {
      if (shippingPercentage >= 100) {
        $("[data-free-shipping-text]").text(freeShippingBarSuccessText);
      } else {
        $("[data-free-shipping-text]").text(
          freeShippingBarText.replace("||amount||", shippending)
        );
      }
    }

    if ($("[data-free-shipping-bar]").length > 0) {
      $("[data-free-shipping-bar]").css("width", shippingPercentage + "%");
    }
    shippingBarContainer.removeClass("hidden");
  }
}
var favicon = false;
function browserTabNotification() {
  if (browserNotificationStatus) {
    favicon = new Favico({
      animation: "pop",
      bgColor: browserNotificationBg,
      textColor: browserNotificationText,
      type: browserNotificationShape,
    });
  }
}
$(document).ready(function () {
  browserTabNotification();
  if (favicon) {
    favicon.badge(cartItemsCount);
  }
  if (freeShippingBarStatus) {
    if (Shopify.currency.active != shopCurrency) {
      let shippingAmount = parseInt(freeShippingBarAmount);
      if (shippingAmount != undefined) {
        convertShippingAmount = parseFloat(
          (shippingAmount * Shopify.currency.rate).toFixed(2)
        );
      }
    }
  }
});

$(document).on("keydown", "[name=note]", function (e) {
  clearTimeout(cartNoteTyping);
});
$(document).on("keyup ", "[name=note]", function (evt) {
  var _this = $(this);
  clearTimeout(cartNoteTyping);
  cartNoteTyping = setTimeout(function () {
    var currentVal = _this.val();
    $.ajax({
      url: cartUpdateUrl,
      type: "POST",
      data: { note: currentVal },
      dataType: "json",
      success: function (result) {},
    });
  }, 750);
});
if (window.location.pathname.indexOf("/cart") > -1) {
  // Shipping Estimations

  (function () {
    function shippingEstimates() {
      if (Shopify && Shopify.CountryProvinceSelector) {
        var country = document.getElementById("shippingCountry");
        if (!country) {
          return false;
        }
        var shipping = new Shopify.CountryProvinceSelector(
          "shippingCountry",
          "shippingProvince",
          {
            hideElement: "shippingProvinceContainer",
          }
        );

        setupEventListeners();
      }
    }

    function setupEventListeners() {
      var button = document.getElementById("getShippingEstimates");
      if (button) {
        button.addEventListener("click", (e) => {
          e.preventDefault();
          $("#ShippingWrapperResponse")
            .html("")
            .removeClass("success")
            .removeClass("error")
            .hide();
          var shippingAddress = {};
          shippingAddress.zip = jQuery("#shippingZip").val() || "";
          shippingAddress.country = jQuery("#shippingCountry").val() || "";
          shippingAddress.province = jQuery("#shippingProvince").val() || "";
          _getCartShippingRates(shippingAddress);
        });
      }
    }

    var _getCartShippingRates = function (shippingAddress) {
      var params = {
        type: "POST",
        url: "/cart/shipping_rates.json",
        data: jQuery.param({ shipping_address: shippingAddress }),
        success: function (data) {
          _render(data.shipping_rates);
        },
        error: _onError,
      };
      jQuery.ajax(params);
    };

    var _fullMessagesFromErrors = function (errors) {
      var fullMessages = [];
      jQuery.each(errors, function (attribute, messages) {
        jQuery.each(messages, function (index, message) {
          fullMessages.push(message);
        });
      });
      return fullMessages;
    };
    var _onError = function (XMLHttpRequest, textStatus) {
      var data = eval("(" + XMLHttpRequest.responseText + ")");
      feedback = _fullMessagesFromErrors(data).join(", ") + ".";
      $("#ShippingWrapperResponse")
        .html('<p class="error-text">' + feedback + "</p>")
        .addClass("error")
        .show();
    };
    var _render = function (response) {
      if (response && response.length > 0) {
        // Ordenar las tarifas de envío de la más barata a la más cara
        response.sort((a, b) => a.price - b.price);
    
        var html = '<p class="success-text">';
    
        response.forEach(function (shipping) {
          // Utilizar <br> para agregar un salto de línea después de cada elemento
          html += `<span style="max-width:200px;white-space: nowrap;overflow:hidden;text-overflow:ellipsis;"><strong>${shipping.name}: </strong> ${Shopify.formatMoney(shipping.price * 100, moneyFormat)}</span><br>`;
        });
    
        html += "</p>";
        $("#ShippingWrapperResponse").html(html).addClass("success").show();
      } else {
        $("#ShippingWrapperResponse")
          .html('<p class="error-text">' + notAvailableLabel + "</p>")
          .addClass("error")
          .show();
      }
    };
    setTimeout(function () {
      shippingEstimates();
      $.ajax({
        url: mainCartUrl,
        type: "GET",
        dataType: "json",
        success: function (result) {
          if (result.item_count > 0) {
            freeShippingBar(result);
            upsellCartProducts(result)
          }
        },
      });
    }, 500);

    window.shippingEstimates = shippingEstimates;
  })();

  // Update quantity based on input on change

  changeCartItem = function (line, quantity) {
    var params = {
      type: "POST",
      url: cartChangeUrl,
      data: "quantity=" + quantity + "&line=" + line,
      dataType: "json",
      success: function (cart) {
        // if (quantity == 0) {
        //     $('[name="updates[]"][data-line="' + line + '"]').closest('tr').remove();
        // }
        if (cart.item_count == 0) {
          emptyCartStatus = true;
          // $('[data-cart-form]').hide();
          // $('[data-cart-empty]').show();
          $("[data-cart-count]").hide();
        } else {
          emptyCartStatus = false;
          cartItemsCount = cart.item_count;
          if (favicon) {
            favicon.badge(cartItemsCount);
          }
          $("[data-cart-count]").show();

          var item = cart.items[line - 1];
          if (item) {
            $('[name="updates[]"][data-line="' + line + '"]').val(
              item.quantity
            );
          }
        }
        cartPageUpdate(cart);
      },
      error: function (XMLHttpRequest, textStatus) {
        jQuery.getJSON(cartUrl, function (cart, textStatus) {
          if (quantity == 0) {
            $('[name="updates[]"][data-line="' + line + '"]')
              .closest("tr")
              .remove();
          }
          cartItemsCount = cart.item_count;
          if (favicon) {
            favicon.badge(cartItemsCount);
          }
          if (cart.item_count == 0) {
            // $('[data-cart-form]').hide();
            // $('[data-cart-empty]').show();
            $("[data-cart-count]").hide();
          } else {
            $("[data-cart-count]").show();

            var item = cart.items[line - 1];
            if (item) {
              $('[name="updates[]"][data-line="' + line + '"]').val(
                item.quantity
              );
            }
          }
          cartPageUpdate(cart);
        });
      },
    };
    jQuery.ajax(params);
  };

  $(document).on("click", ".line_item_change", function (evt) {
    evt.preventDefault();
    var $el = $(this),
      line = $el.data("line"),
      parent = $el.closest("tr"),
      $qtySelector = $el.siblings('input[name="updates[]"]');

    $("#cartItemError-" + line).html("");
    var qty = parseInt($qtySelector.val().replace(/\D/g, ""));

    parent.addClass("disabled");
    parent.closest("[data-cart-items]").addClass("disabled");
    var qty = validateQty(qty);

    if ($el.hasClass("quantity-up")) {
      qty += 1;
    } else {
      qty -= 1;
      if (qty <= 0) qty = 0;
    }
    $qtySelector.val(qty);
    if (line) {
      changeCartItem(line, qty);
    }
  });

  $(document).on("change", '[name="updates[]"]', function (evt) {
    evt.preventDefault();
    var $el = $(this),
      line = $el.data("line"),
      parent = $el.closest("tr"),
      qty = parseInt($el.val().replace(/\D/g, ""));
    parent.addClass("disabled");
    parent.closest("[data-cart-items]").addClass("disabled");

    $("#cartItemError-" + line).html("");
    qty = validateQty(qty);
    // Add or subtract from the current quantity

    if (line) {
      changeCartItem(line, qty);
    }
  });

  $(document).on("click", ".line_item_remove", function (evt) {
    evt.preventDefault();
    var $el = $(this),
      parent = $el.closest("tr"),
      line = $el.data("line");
    // If it has a data-line, update the cart
    if (line) {
      parent.addClass("disabled");
      parent.closest("[data-cart-items]").addClass("disabled");
      changeCartItem(line, 0);
    }
  });
} else {
  // POST to cart/change.js returns the cart in JSON
  changeItem = function (line, quantity, callback) {
    var $body = $(document.body),
      params = {
        type: "POST",
        url: cartChangeUrl,
        data: "quantity=" + quantity + "&line=" + line,
        dataType: "json",
        success: function (cart) {
          if (cart.item_count == 0) {
            emptyCartStatus = true;
            $("[data-cart-count]").hide();
          } else {
            emptyCartStatus = false;
            $("[data-cart-count]").show();
          }
          var item = cart.items[line - 1];
          if (item) {
            $(
              '.ajaxcart__qty-num[name="updates[]"][data-line="' + line + '"]'
            ).val(item.quantity);
          }
          callback(cart);
        },
        error: function (XMLHttpRequest, textStatus) {
          jQuery.getJSON(cartUrl, function (cart, textStatus) {
            callback(cart);
          });
        },
      };
    jQuery.ajax(params);
  };

  updateQuantity = function (line, qty, callback) {
    isUpdating = true;
    setTimeout(function () {
      changeItem(line, qty, callback);
    }, 250);
  };

  function getvaluefromdataattribute(name) {
    return $('input[data-attr="' + name + '"]').val();
  }
  $("#Recipient-Checkbox").click(function () {
    if (!this.checked) {
      $('input[data-attr="' + "email" + '"]').val("");
      $('input[data-attr="' + "name" + '"]').val("");
    }
  });

  if (cartDrawerEnable) {
    // POST to cart/add.js returns the cart in JSON
    $("body").on("click", ".Sd_addProduct", function (evt) {
      evt.preventDefault();

      let submit = $(this);
      let form = $(this).closest("form");
      if (submit.hasClass("Sd_addProductSticky")) {
        form = jQuery("#" + submit.attr("form"));
      }
      if (form.closest(".yv_side_drawer_wrapper").length == 0) {
        focusElement = submit;
      }
      let parentSection = form.closest(".shopify-section");
      var Email = $('input[data-attr="' + "email" + '"]').val();
      $('input[data-attr="' + "email" + '"]').val("");
      $('input[data-attr="' + "name" + '"]').val("");
      parentSection.find(".productErrors").hide().html("");
      submit.addClass("is-loading");
      if (form.closest(".yv_side_drawer_wrapper").length == 0) {
        $("[data-drawer-body]").html(preLoadLoadGif);
        $("body")
          .find("[data-side-drawer]")
          .attr("class", "yv_side_drawer_wrapper");
        $("body").find("[data-drawer-title]").html(cartTitleLabel);
        $("body").find("[data-side-drawer]").attr("id", "mini__cart");
        $("body").find("[data-side-drawer]").addClass("mini_cart");
      }
      params = {
        type: "POST",
        url: cartAddUrl,
        data: form.serialize(),
        dataType: "json",
        success: function (line_item) {
          if (form.closest(".yv_side_drawer_wrapper").length > 0) {
            $("[data-drawer-body]").html(preLoadLoadGif);
            $("body")
              .find("[data-side-drawer]")
              .attr("class", "yv_side_drawer_wrapper");
            $("body").find("[data-drawer-title]").html(cartTitleLabel);
            $("body").find("[data-side-drawer]").attr("id", "mini__cart");
            $("body").find("[data-side-drawer]").addClass("mini_cart");
          }

          $("body").removeClass("quickview-open");
          $("body").addClass("side_Drawer_open");
          jQuery.getJSON(cartUrl, function (cart, textStatus) {
            buildCart(cart, true);
            setTimeout(function () {
              submit.removeClass("is-loading");
            }, 1000);
          });
        },
        error: function (XMLHttpRequest, textStatus) {
          focusElement = "";
          if (typeof errorCallback === "function") {
            errorCallback(XMLHttpRequest, textStatus);
          } else {
            let errorContainer = parentSection.find(".productErrors");
            if (errorContainer.length > 0) {
              if(XMLHttpRequest.responseJSON.errors){
                let giftCardWrapper = form.find('[data-gift-card-box]');
                if(giftCardWrapper.length > 0 && XMLHttpRequest.responseJSON.errors['email']){
                    let errormessageWrapper = giftCardWrapper.find('[data-gift-card-errors]');
                    let giftCardEmail = giftCardWrapper.find('[type=email]');
                    errorContainer.html(giftCardEmail.attr('data-attr') +' '+  XMLHttpRequest.responseJSON.errors['email']).show();
                }
              }
              else{
                errorContainer.html(XMLHttpRequest.responseJSON.description).show();
              }
            }
          }
          setTimeout(function () {
            $(".Sd_addProductSticky").removeClass("is-loading");
            submit.removeClass("is-loading");
          }, 1000);
        },
      };
      jQuery.ajax(params);
    });

    // Update quantity based on input on change

    $(document).on("click", ".quantity-button", function (evt) {
      evt.preventDefault();
      var $el = $(this),
        parent = $el.closest(".media-link"),
        line = $el.data("line"),
        $qtySelector = $el.closest(".quantity").find(".ajaxcart__qty-num");
      var qty = $qtySelector.val();
      parent.addClass("disabled");
      parent.closest(".cart-items-wrapper").addClass("disabled");
      if (qty) {
        qty = parseInt(qty.replace(/\D/g, ""));
      }

      var qty = validateQty(qty);

      // Add or subtract from the current quantity
      if ($el.hasClass("ajaxcart__qty--plus")) {
        qty += 1;
      } else {
        qty -= 1;
        if (qty <= 0) qty = 0;
      }
      $qtySelector.val(qty);
      if (line) {
        updateQuantity(line, qty, buildCart);
      }
    });

    // Update quantity based on input on change
    $(document).on("change", ".ajaxcart__qty-num", function (evt) {
      evt.preventDefault();
      var $el = $(this),
        parent = $el.closest(".media-link"),
        line = $el.data("line"),
        qty = parseInt($el.val().replace(/\D/g, ""));

      parent.addClass("disabled");
      parent.closest(".cart-items-wrapper").addClass("disabled");
      var qty = validateQty(qty);

      // If it has a data-line, update the cart
      if (line) {
        updateQuantity(line, qty, buildCart);
      }
    });

function openCartDrawer(element) {
  $("[data-drawer-body]").html(preLoadLoadGif);
  $("body").find("[data-drawer-title]").html(cartTitleLabel);
  $("body")
    .find("[data-side-drawer]")
    .attr("class", "yv_side_drawer_wrapper");
  $("body")
    .find("[data-side-drawer]")
    .attr("id", "mini__cart")
    .addClass("mini_cart");
  $("body").addClass("side_Drawer_open");
  jQuery.getJSON(cartUrl, function (cart, textStatus) {
    buildCart(cart, true, element);

    document.dispatchEvent(new Event('cartDrawerOpened'));
  });
}
    $("body").on("click", ".openCartDrawer", function (e) {
      e.preventDefault();
      openCartDrawer($(this));
    });

    $("body").on("keydown", ".openCartDrawer", function (e) {
      if (e.code.toUpperCase() === "SPACE") {
        e.preventDefault();
        openCartDrawer($(this));
      }
    });

    $(document).on("click", ".sd_mini_removeproduct", function (evt) {
      evt.preventDefault();
      var $el = $(this),
        parent = $el.closest(".media-link"),
        line = parseInt($el.attr("data-line"));
      parent.addClass("disabled");
      parent.closest(".cart-items-wrapper").addClass("disabled");
      // If it has a data-line, update the cart
      if (line) {
        updateQuantity(line, 0, buildCart);
      }
    });

    $(document).on("click ", ".cartDrawerNote", function (evt) {
      $(this).toggleClass("active");
      var textArea = $(this).siblings(".cartNoteContainer");
      textArea.slideToggle();
    });
  }
}
$("body").on("click", "#GiftWrapProduct", function () {
  params = {
    type: "POST",
    url: cartAddUrl,
    data: { id: parseInt($(this).attr("data-product")), quantity: 1 },
    dataType: "json",
    success: function (line_item) {
      jQuery.getJSON(cartUrl, function (cart, textStatus) {
        if (window.location.pathname.indexOf("/cart") > -1) {
          cartPageUpdate(cart);
        } else {
          buildCart(cart, true);
        }
      });
    },
    error: function (XMLHttpRequest, textStatus) {
      jQuery.getJSON(cartUrl, function (cart, textStatus) {
        if (window.location.pathname.indexOf("/cart") > -1) {
          buildCart(cart, true);
        } else {
          cartPageUpdate(cart);
        }
      });
    },
  };
  jQuery.ajax(params);
});
cartPageUpdate = function (cart) {
  $.ajax({
    url: mainCartUrl,
    type: "GET",
    dataType: "html",
    success: function (result) {
      $("body")
        .find("[data-cart-wrapper]")
        .html($(result).find("[data-cart-wrapper]").html());
      $(".cart-section").find("a:first").trigger("focus");
      freeShippingBar(cart);
     upsellCartProducts(cart)
      window.shippingEstimates();
      // $('body').find('[data-cart-items]').html($(result).find('[data-cart-items]').html());
      // $("body").find("[data-cart-items]").removeClass('disabled');
      // if (cart.item_count == 0) {
      //     emptyCartStatus = true;
      //     $('[data-cart-count').hide();
      //     $('.cart-section').find('a:first').trigger('focus');
      // } else {
      //     emptyCartStatus = false;
      //     $('body').find('[data-cart-items]').find('a:first').trigger('focus');
      // }
      // $('[data-cart-item-count]').text(cart.item_count);
      // $('[data-cart-original-price]').text(Shopify.formatMoney(cart.original_total_price, moneyFormat));
      // $('[data-cart-total-price]').text(Shopify.formatMoney(cart.total_price, moneyFormat));
      // if (cart.cart_level_discount_applications.length > 0) {
      //     var discounts = '';
      //     $.each(cart.cart_level_discount_applications, function(index, discount) {
      //         discounts += '<li data-cart-discount>Discount[' + discount.title + '] <strong>-' + Shopify.formatMoney(discount.total_allocated_amount, moneyFormat) + '</strong></li>';
      //     })
      //     $('li[data-cart-discount]').remove();
      //     $('li[data-cart-original]').removeClass('hidden');
      //     $(discounts).insertAfter('li[data-cart-original]')
      // } else {
      //     $('li[data-cart-original]').addClass('hidden');
      //     $('li[data-cart-discount]').remove();
      // }
      if (animationStatus) {
        if (AOS) {
          AOS.refreshHard();
        }
      }
    },
  });
};
buildCart = function (cart, showCart, element) {
  if (cart.item_count === 0) {
    emptyCartStatus = true;
    $("[data-cart-count]").hide();
  } else {
    emptyCartStatus = false;
    $("[data-cart-count]").show();
  }
  cartItemsCount = cart.item_count;
  if (favicon) {
    favicon.badge(cartItemsCount);
  }
  $("[data-drawer-body]").load(mainCartUrl + "?view=jsonData", function () {
    freeShippingBar(cart);
     upsellCartDrawerProducts(cart,'drawer')
    if (showCart) {
      $("body").addClass("yv_side_Drawer_open");
      $(".wrapper-overlay").css({ display: "block" });
      focusElementsRotation($("[data-side-drawer]"));
      if (element) {
        focusElement = element;
      }
      $(document).find(".yv_side_drawer_wrapper").trigger("focus");
      // $('[data-drawer-body]').find('a:first').trigger('focus');
    }
    if (animationStatus) {
      if (AOS) {
        AOS.refreshHard();
      }
    }
  });
};

$(document).on("click","[data-drawer-side-header]",function(){
  if($(this).closest(".yv-upsell-drawer").hasClass("active")){
    $(this).closest(".yv-upsell-drawer").removeClass("active")
  }else{
     $(this).closest(".yv-upsell-drawer").addClass("active")
  }
})
function upsellCartDrawerProducts(cart) {
  if(cart.item_count != 0){
    if(document.querySelector("[data-drawer-side-content]")){
      let upsellContainer=document.querySelector("[data-drawer-side-content]");
      let intent=upsellContainer.getAttribute("data-related-products");
      if(intent != "product-list"){
        let productId=cart.items[0].product_id; 
        let limit=upsellContainer.getAttribute("data-limit");
        fetch(window.Shopify.routes.root + "recommendations/products?product_id="+productId+"&limit="+limit+"&section_id=upsell-products&intent="+intent)
         .then(response => response.text())
         .then((text) => {
            const html = document.createElement('div');
            html.innerHTML = text;
            const recommendations = html.querySelector('#product-recommendations');
            if (recommendations && recommendations.innerHTML.trim().length) {
               upsellContainer.innerHTML = recommendations.innerHTML;
                document.querySelector(".yv-upsell-drawer").classList.remove('hidden')
            }else{
              document.querySelector(".yv-upsell-drawer").classList.add('hidden')
            }
         });
      }
      else{
        if(upsellContainer.children.length > 0){
          document.querySelector(".yv-upsell-drawer").classList.remove('hidden')
        }
        else{
          document.querySelector(".yv-upsell-drawer").classList.add('hidden')
        }
      }
    }  
  }
}
function upsellCartProducts(cart) {
  if(cart.item_count != 0){
    if(document.querySelector("[data-cart-upsell-wrapper]")){
      let upsellWrapper=document.querySelector("[data-cart-upsell-wrapper]");
      let upsellContainer=upsellWrapper.querySelector("[data-cart-upsell]");
      let intent=upsellWrapper.getAttribute("data-related-products");
      if(intent != "product-list"){
        let productId=cart.items[0].product_id; 
        let limit=upsellWrapper.getAttribute("data-limit");
        fetch(window.Shopify.routes.root + "recommendations/products?product_id="+productId+"&limit="+limit+"&section_id=upsell-products&intent="+intent)
         .then(response => response.text())
         .then((text) => {
            const html = document.createElement('div');
            html.innerHTML = text;
            const recommendations = html.querySelector('#product-recommendations');
            if (recommendations && recommendations.innerHTML.trim().length) {
              if(window.innerWidth >= 768 ){
                if(upsellContainer.classList.contains('flickity-enabled')){
                  let slider = Flickity.data(upsellContainer);
                  if(slider){
                    slider.destroy();
                     upsellContainer.innerHTML = recommendations.innerHTML;
                    upsellWrapper.classList.remove('hidden')
                    flickitySlider(jQuery(upsellContainer));
                  }
                }
                else{
                    upsellContainer.innerHTML = recommendations.innerHTML;
                    upsellWrapper.classList.remove('hidden')
                    flickitySlider(jQuery(upsellContainer));
                }
              }
              else{
                  upsellContainer.innerHTML = recommendations.innerHTML;
                  upsellWrapper.classList.remove('hidden')
              }
            }else{
              upsellWrapper.classList.add('hidden')
            }
         });
      }
      else{
        if(upsellContainer.classList.contains('flickity-enabled')){
            let slider = Flickity.data(upsellContainer);
            if(slider){
              slider.destroy();
            }
        }
        if(upsellContainer.children.length > 0){
          if(window.innerWidth >= 768 ){
              upsellWrapper.classList.remove('hidden')
              flickitySlider(jQuery(upsellContainer));
          }
          else{
              upsellWrapper.classList.remove('hidden')
          }
        }
        else{
          upsellWrapper.classList.add('hidden')
        }
      }
    }  
  }
}
