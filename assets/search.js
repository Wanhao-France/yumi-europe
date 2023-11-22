document.addEventListener("DOMContentLoaded", searchTabsInit, false);
document.addEventListener("shopify:section:load", searchTabsInit, false);

function removeHtmlEntities(str) {
    const htmlEntities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;"
    };
    return str.replace(/([&<>\"'])/g, match => htmlEntities[match]);
}

function searchTabsInit() {
    var tabHead = document.getElementsByClassName('yv-tab-result-head');
    if (tabHead.length > 0) {
        var tabContent = document.getElementsByClassName('yv-search-result-list');
        Array.from(tabHead).forEach(function(btn) {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                Array.from(tabHead).forEach(function(item) {
                item.classList.remove('active');
                });
                let searchUrl = btn.getAttribute("data-resulturl");
                let searchContainer = document.querySelector('.search-bar-container');
                if (searchContainer) {
                    let allresultLink = searchContainer.querySelector('.search-result-bottom');
                    if (searchContainer) {
                        allresultLink.setAttribute('href', searchUrl);
                    }
                }
                Array.from(tabContent).forEach(function(item) {
                    item.classList.remove('active');
                });
                btn.classList.add("active");
                var _value = btn.getAttribute("data-results");
                document.getElementById(_value).classList.add("active");
            });
        });
    }
}

var searchTyping;
$(document).ready(function() {
    $('body').on('click','.search-form',function(e) {
        e.preventDefault();
        focusElement = $('.search-form');
        var _class = $(this).data('search-drawer');
        $('body').toggleClass(_class);
        $('input.search-input').trigger('focus');
        $('#recent_search_list').html('');
        recentSearch();
        focusElementsRotation($('.search-bar-container'));
    });

    /// AjaX Product Search
    var $resultsBox = $('.yv-search-result-container');
   var searchbarresult=$('body').find('.yv-header-searchbar-content');
    $('.AjaxSearchResponse').prepend('');
    $('.search-close').show();
    $('body').on('keydown', '.search-input', function(e) {
        clearTimeout(searchTyping);
       if (this.value.length === 0 && e.which === 32) e.preventDefault();
    });
    $('body').on('keyup', '.search-input', function(e) {
        clearTimeout(searchTyping);
        var _this = $(this);
        var section_id='';
        var _drawer = $('[data-search-drawer]').data('search-drawer');
        var _searchContainer = $('body').find('.search-bar-container');
        var retrievedSearch = localStorage.getItem("Recent_search");
        var retrievedSearch_v = JSON.parse(retrievedSearch);
       
          if (retrievedSearch_v == null) {
              var retrievedSearch_v = [];
          }
          var $form = $(this).closest('form');
          searchTyping = setTimeout(function() {
            $resultsBox.html(preLoadLoadGif);
      
            var term = $form.find('input[name="q"]').val();
            var resultType = 'product';
            if (searchPageResults) {
                resultType += ',page'
            }
            if (searchArticleResults) {
                resultType += ',article'
            }
            if (searchSuggestions) {
                resultType += ',query'
            }
          if(_this.hasClass("yv-search-bar")){
            searchbarresult.show();
            searchbarresult.html(preLoadLoadGif);
            section_id='predictive-search-lite';
           
          }else{
              section_id='predictive-search';
          }
        
            if (term.length > 2 && term != _this.data('oldval')) {
               if(_this.hasClass("yv-search-bar")){
                  $("button[data-searchbar-cross]").show();
               }
                fetch(searchUrl+"/suggest?section_id="+ section_id +"&q=" + term + "&resources[type]=" + resultType + "&resources[options][fields]=author,tag,title,product_type,variants.title,vendor,variants.sku")
                    .then((response) => response.text())
                    .then((resultHtml) => {
                        let results = new DOMParser().parseFromString(resultHtml, 'text/html').querySelector('#shopify-section-'+section_id);
                       if(_this.hasClass("yv-search-bar")){
                           if(results){
                             searchbarresult.html(results.innerHTML)
                           }
                       }else{
                         if(_searchContainer.find('[data-search-suggestions]').length > 0){
                        if(results && results.querySelector('[data-search-suggestions]')){
                          _searchContainer.find('[data-search-suggestions]').html(results.querySelector('[data-search-suggestions]').innerHTML)
                            results.querySelector('[data-search-suggestions]').innerHTML = '';
                        }
                          else{
                            _searchContainer.find('[data-search-suggestions]').html('')
                          }                          
                        }
                        if(results){
                          $resultsBox.html(results.innerHTML);
                          searchTabsInit();
                          if (recentProductHandle && retrievedSearch_v.includes(recentProductHandle) === false) {
                              retrievedSearch_v.push(recentProductHandle);
                          }
                           localStorage.setItem("Recent_search", JSON.stringify(retrievedSearch_v));
                        }
                        else{
                          $resultsBox.empty();
                        }
                         focusElementsRotation($('.search-bar-container'));
                       }
                        
                    });
            } else if (term.length <= 2) {
                //Deleted text? Clear results
                $resultsBox.empty();
                searchbarresult.empty();
               $("button[data-searchbar-cross]").hide();
               searchbarresult.css("display","none")
                focusElementsRotation($('.search-bar-container'));
            }

        }, 1000);
    })

    function recentSearch() {
        $('#recent_search_list').html('');
        $('.recent-search-list').siblings('.yv-search-result-container').removeClass('no-recent')
        var recent_Html = '';
        var showRecent = false;
        setTimeout(function() {
            var recent_pro = localStorage.getItem("Recent_search");
            var recent_pro_val = JSON.parse(recent_pro);
            $('.recent-search-list').html('');
            if (recent_pro_val == null) {
                $('.recent-search-list').html('');
                $('.recent-search-list').siblings('.yv-search-result-container').addClass('no-recent');
            } else {
                recent_Html = recent_Html.concat('<h6 class="recent-search-title">' + searchRecentTitleText + '</h6>');
                recent_Html = recent_Html.concat('<ul class="list-unstyled recent-search-listing">');
                var Prev_search = recent_pro_val.reverse();
                $.each(Prev_search, function(index, value) {
                    var productUrl = '';
                    if (rootUrl.length > 1) {
                        productUrl = rootUrl;
                    }
                    if (index < 10) {
                        var getV = value;
                        jQuery.ajax({
                            type: 'GET',
                            url: productUrl + '/products/' + value + '.json',
                            success: function(response) {

                                showRecent = true;
                                let product = response.product;
                                let imgSrc = noProductImage;
                                let productTitle = $('<div>' + product.title + '</div>').text();
                                if (product.image) {
                                    imgSrc = `<img src="${product.image.src}&width=100" alt="${removeHtmlEntities(productTitle)}">`;
                                }
                                recent_Html += `<li><a class="focus-inside" href="${productUrl}/products/${product.handle}">
					      ${imgSrc}<span>${truncate(removeHtmlEntities(productTitle),2)}</span></a></li>`;
                            },
                            error: function(error) {
                                console.log("Error: " + error);
                            }
                        });

                    }
                });
                $(document).ajaxStop(function() {
                    recent_Html = recent_Html.concat('</ul>');
                    if (showRecent) {
                        $('#recent_search_list').html(recent_Html);
                        focusElementsRotation($('.search-bar-container'));
                    }
                });

            }

        }, 500);
    }

    //Search box should mimic live search string: products only, partial match
    $('.search-form, #search-form').on('submit', function(e) {
        e.preventDefault();
        var term = '*' + $(this).find('input[name="q"]').val() + '*';
        var linkURL = $(this).attr('action') + '?q=' + term + '&options%5Bprefix%5D=last';
        window.location = linkURL;
    });

    $('body').on('click', '.yv-search-drawer-close', function(e) {
        e.preventDefault();
        $('input.form-control.search-input').val('');
        $resultsBox.empty();
        $('body').removeClass('addsearch');
        stopFocusElementsRotation();
        focusElement.trigger('focus');
    });


  $('body').on('click', '.yv-search-bar', function(e) {
    if($(this).val().length > 2){
        $('.yv-header-searchbar-content').show();
    }
  })

   $(document).on("focus","button[data-searchbar-cross]",function(e) {
     e.preventDefault();
     $(this).hide();
     $(".yv-search-bar").val("");
     searchbarresult.hide();
      searchbarresult.html("");
   })
    // search ends
});

