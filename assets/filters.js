var layout2 = "col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6";
var layout3 = "col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4";
var layout4 = "col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3";
var layout5 = "col-6 col-sm-6 col-md-3 col-lg-3 col-xl-2";
var hideShowFiltersEvent = false;
var clearAllFilterButton = false;
let clearAllButton = document.getElementById('yv-applied-filter-cross-all');
var filters = document.getElementById('filterSideBar');
var filterContainer = document.getElementById('CollectionProductsContainer');
if(clearAllButton){
  clearAllFilterButton = true;
}
function changeGridLayout() {
    let parent = document.getElementById('CollectionProductsContainer');
    let gridLayouts = document.querySelectorAll('.sort-grid-icon');
    Array.from(gridLayouts).forEach(function(layoutItem) {
        layoutItem.classList.remove('active');
    });

    var grid_layout_collection = Cookies.get('grid_layout_collection');
    if (parent && gridLayouts.length > 0) {
        if (window.innerWidth < 768) {
            if (grid_layout_collection && grid_layout_collection != "grid-layout-4" && grid_layout_collection != "grid-layout-5") {
                document.querySelector('.sort-grid-icon[data-value="' + grid_layout_collection + '"]').classList.add('active');
                parent.setAttribute("data-view", grid_layout_collection)
            } else {
                document.querySelector('.sort-grid-icon[data-value="grid-layout-2"]').classList.add('active');
                parent.setAttribute("data-view", "grid-layout-2")
            }
        } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
            if (grid_layout_collection && grid_layout_collection != "grid-layout-4" && grid_layout_collection != "grid-layout-5") {
                document.querySelector('.sort-grid-icon[data-value="' + grid_layout_collection + '"]').classList.add('active');
                parent.setAttribute("data-view", grid_layout_collection)
            } else {
                document.querySelector('.sort-grid-icon[data-value="grid-layout-3"]').classList.add('active');
                parent.setAttribute("data-view", "grid-layout-3")
            }
        } else if (window.innerWidth >= 992) {
            if (grid_layout_collection) {
                document.querySelector('.sort-grid-icon[data-value="' + grid_layout_collection + '"]').classList.add('active');
                parent.setAttribute("data-view", grid_layout_collection)
            } else {
                document.querySelector('.sort-grid-icon[data-value="grid-layout-4"]').classList.add('active');
                parent.setAttribute("data-view", "grid-layout-4")
            }
        }
        updateGridView(parent);

    }
}

function hideShowFilters() {
    var filterHeading = document.getElementById('filterHeading');
    if (window.innerWidth < 768) {
        if (filterContainer && filterHeading) {
            if (filterHeading.classList.contains('filters-drawer-toggle')) {
                filterContainer.classList.add('filters-toggle');
            }
        }
    } else {
        if (filters) {
            filters.classList.remove('active')
            document.querySelector('body').classList.remove('open-filter-sort');
        }
    }
    if (hideShowFiltersEvent == false ) {
        if (filterHeading) {
            filterHeading.addEventListener("click", (e) => {
              e.preventDefault();
                if (window.innerWidth > 767) {
                    if (filterContainer && filterHeading) {
                        if (filterHeading.classList.contains('filters-drawer-toggle')) {
                            DOMAnimations.classToggle(filterContainer, 'filters-toggle');
                        }
                    }
                } else {
                    filters.classList.add('active')
                    document.querySelector('body').classList.add('open-filter-sort');
                }
            });
        }
        hideShowFiltersEvent = true;
    }
}
function hideFilters(){
  var cancelFiltes = document.getElementById('cancelFilters');
  if (cancelFiltes) {
    cancelFiltes.addEventListener("click", (e) => {
      e.preventDefault();
      filters.classList.remove('active')
      document.querySelector('body').classList.remove('open-filter-sort');
    });
  }
}
window.addEventListener('load', (event) => {
    changeGridLayout();
    hideShowFilters();
    applyFilters();
    sortByOptions();
    showMoreFilters();
    hideFilters();
  sortBy();
});
window.addEventListener('resize', function(event) {
    changeGridLayout();
    applyFilters();
    hideShowFilters();
    sortByVisibilityChange(); 
    var filters = document.getElementById('filterSideBar');
    if (filters) {
        if (window.innerWidth < 768 && window.innerWidth > 760) {
            filters.style.display = 'none';
            setTimeout(function() { filters.style.display = ''; }, 500)
        }
    }

});

function showMoreFilters() {
    const filterForm = document.getElementById('FiltersForm');
    if(filterForm){
        var showMoreFilters = filterForm.querySelectorAll('.filters-expand');
        if (showMoreFilters) {
            Array.from(showMoreFilters).forEach(function(showMoreFilter) {
                showMoreFilter.addEventListener("click", (e) => {
                    e.preventDefault();
                    if (showMoreFilter.classList.contains('active')) {
                        showMoreFilter.classList.remove('active');
                        DOMAnimations.slideUp(showMoreFilter.parentNode.querySelector('.more-options'), 150);
                        showMoreFilter.querySelector('span').textContent = showMoreText;
                    } else {
                        showMoreFilter.classList.add('active');
                        DOMAnimations.slideDown(showMoreFilter.parentNode.querySelector('.more-options'), 150);
                        showMoreFilter.querySelector('span').textContent = showLessText;
                    }
                });
            });
        }
    }
}

function applyFilters() {
    var section = document.getElementById('CollectionProductsContainer');
    if (section) {
        var sectionParent = section.closest('.shopify-section');
        var sectionId = section.dataset.id;
        const filterForm = document.getElementById('FiltersForm');
        if (!filterForm) {
            return false;
        }
        //   showMultipleOptions(); 
        var layouts = sectionParent.querySelectorAll('.sort-grid-icon');
        Array.from(layouts).forEach(function(layout) {
            layout.addEventListener("click", (e) => {
                e.preventDefault();
                if (!layout.classList.contains('active')) {
                    layout.classList.add('active');
                    let allGrids = section.querySelectorAll('.aos-init');

                    Array.from(allGrids).forEach(function(grid) {
                        grid.classList.remove('aos-animate');
                        grid.classList.remove('aos-init');
                    });

                    setTimeout(function() {
                        Array.from(layouts).forEach(function(layoutItem) {
                            if (layoutItem != layout) {
                                layoutItem.classList.remove('active');
                            }
                        });
                        var _thisLayout = layout.dataset.value;
                        section.setAttribute('data-view', _thisLayout)
                        updateGridView(section);
                        var date = new Date();

                        date.setTime(date.getTime() + (parseInt(24 * 60 * 60 * 1000)));
                        Cookies.set('grid_layout_collection', _thisLayout, { expires: date, path: '/' });
                        let allImages = section.querySelectorAll('.lazyloaded');

                        Array.from(allImages).forEach(function(image) {
                            image.classList.remove('lazyloaded');
                            image.classList.add('lazyload');
                        });
                    }, 800);
                }

            });
        });

        var priceRangeBars = filterForm.querySelectorAll('.mall-slider-handles');
        Array.from(priceRangeBars).forEach(function(rangeBar) {
            var el = rangeBar;
            var sliderEventListener = '';
            if (el.noUiSlider) {
                sliderEventListener = el.noUiSlider;
            } else {
                sliderEventListener = noUiSlider.create(el, {
                    start: [el.dataset.start, el.dataset.end],
                    step: 1,
                    connect: true,
                    tooltips: false,
                    range: {
                        min: [parseInt(el.dataset.min)],
                        max: [parseInt(el.dataset.max)]
                    }
                });
            }
            if (window.innerWidth > 767) {
                sliderEventListener.on('change', function(values) {
                    var minRange = $(this)[0].options.range.min;
                    var maxRange = $(this)[0].options.range.max;
                    var minVal = parseInt(values[0]);
                    var newformatMoney = moneyFormat;
                    if (minVal > minRange) {
                        section.querySelectorAll('input[name="filter.v.price.gte"]')[0].value = minVal;
                    }
                    var maxVal = parseInt(values[1]);
                    if (maxVal < maxRange) {
                        section.querySelectorAll('input[name="filter.v.price.lte"]')[0].value = maxVal;
                    }
                  if (window.innerWidth > 767) {
                    getFilterData(rangeBar, sectionId);
                  }
                })
            }
            sliderEventListener.on("update", function(values) {
                var minRange = $(this)[0].options.range.min;
                var maxRange = $(this)[0].options.range.max;
                var minVal = parseInt(values[0]);
                // var newformatMoney = moneyFormat;
                // section.querySelector('[data-min-value]').innerHTML =  Shopify.formatMoney(minVal*100,moneyFormatWithoutCurrency);
                // var maxVal =  parseInt(values[1]);
                // section.querySelector('[data-max-value]').innerHTML = Shopify.formatMoney(maxVal*100,moneyFormatWithoutCurrency);
                if (minVal > minRange) {
                    section.querySelectorAll('input[name="filter.v.price.gte"]')[0].value = minVal;
                }
                var maxVal = parseInt(values[1]);
                if (maxVal < maxRange) {
                    section.querySelectorAll('input[name="filter.v.price.lte"]')[0].value = maxVal;
                }
            })
        })

        if (window.innerWidth > 767) {
            var prices = filterForm.querySelectorAll('input[type=number]');
            Array.from(prices).forEach(function(price) {
                price.addEventListener("change", () => {
                    getFilterData(price, sectionId)
                });
            });
            var inputs = filterForm.querySelectorAll('input[type=checkbox]');
            Array.from(inputs).forEach(function(input) {
                input.addEventListener("click", () => {
                  if (window.innerWidth > 767) {
                    getFilterData(input, sectionId)
                  }
                });
            });
        } else {
            filterForm.addEventListener("submit", (e) => {
                e.preventDefault();
                getFilterData(filterForm, sectionId)
                document.querySelector('body').classList.remove('open-filter-sort');
            });
        }

      var removeFilters = sectionParent.querySelectorAll('a.yv-applied-filter-remove');
        Array.from(removeFilters).forEach(function(removeFilter) {
            if(removeFilter.id == 'yv-applied-filter-cross-all' & clearAllFilterButton == false){
              return false;
            }
          else{
              clearAllFilterButton == false
              removeFilter.addEventListener("click", (e) => {
                  e.preventDefault();
                  var _url = removeFilter.getAttribute('href');
                  getFilterData(removeFilter, sectionId, _url);
              });
            }
        });
    }
}

function sortByOptions() {
    var section = document.getElementById('CollectionProductsContainer');
    var sortBy = document.querySelectorAll('[name="sort_by"]');
    if(section){
        var sectionId = section.dataset.id;
        Array.from(sortBy).forEach(function(sort) {
            sort.addEventListener("change", (e) => {
                e.preventDefault();
                Array.from(sortBy).forEach(function(sort) {
                    sort.parentNode.classList.remove('selected');
                })

                sort.parentNode.classList.add('selected');
                var sortMenu = document.getElementById('sort__list');
                if (sortMenu.classList.contains('active')) {
                    sortMenu.classList.remove('active');
                    if (window.innerWidth > 767) {
                        DOMAnimations.slideUp(sortMenu);
                    } else {
                        document.querySelector('body').classList.remove('open-filter-sort');
                    }
                }
                document.querySelector('body').classList.remove('open-filter-sort');
                getFilterData(sort, sectionId);
            });
        });
    }
}
function sortByVisibilityChange(){
     var sortMenu = document.querySelector('.collection-sortby-selected');
    var sortList = document.getElementById('sort__list');
    if (sortMenu && sortList) {
        if (window.innerWidth > 767) {
          if(sortList.classList.contains('active')){
            sortList.style.display = 'block';
          }else{
            sortList.style.display = 'none';
          }
          document.querySelector('body').classList.remove('open-filter-sort');
          
        }else{
          sortList.style.display = 'block';
          if(sortList.classList.contains('active')){
          document.querySelector('body').classList.add('open-filter-sort');
          }else{
          document.querySelector('body').classList.remove('open-filter-sort');
          }
        }
    }
}
function sortBy() {
    var sortMenu = document.querySelector('.collection-sortby-selected');
    if (sortMenu) {          
        sortMenu.addEventListener("click", (e) => {
            e.preventDefault();
            var sortMenu = document.getElementById('sort__list');
            if (sortMenu.classList.contains('active')) {
                sortMenu.classList.remove('active');
                if (window.innerWidth > 767) {
                    DOMAnimations.slideUp(sortMenu);
                } else {
                    document.querySelector('body').classList.remove('open-filter-sort');
                }
            } else {
                sortMenu.classList.add('active');
                if (window.innerWidth > 767) {
                    DOMAnimations.slideDown(sortMenu);
                } else {
                    document.querySelector('body').classList.add('open-filter-sort');
                }
            }
        });
    }
    var closeSortMenu = document.querySelector('.close-sort');
    if (closeSortMenu) {
        closeSortMenu.addEventListener("click", (e) => {
            e.preventDefault();
            var sortMenu = document.getElementById('sort__list');
            if (window.innerWidth < 768) {
                sortMenu.classList.remove('active');
                document.querySelector('body').classList.remove('open-filter-sort');
            }
        });
    }
}

function updateGridView(section) {
    if (section) {
        var mainSection = document.getElementById('CollectionProductsContainer');
        var _layout = mainSection.getAttribute('data-view');
        var productItems = section.querySelectorAll('[data-product-grid]');
        if (productItems.length > 0) {
            Array.from(productItems).forEach(function(item) {
                if (_layout == 'grid-layout-2') {
                    item.setAttribute('class', layout2);
                } else if (_layout == 'grid-layout-3') {
                    item.setAttribute('class', layout3);
                } else if (_layout == 'grid-layout-4') {
                    item.setAttribute('class', layout4);
                } else if (_layout == 'grid-layout-5') {
                    item.setAttribute('class', layout5);
                }
            });
        }
        if(animationStatus){
          if (AOS) { 
            AOS.refreshHard() 
          }
        }
    }
}

function fetchFilterData(url) {
    return fetch(url)
        .then(response => response.text())
}

function getFilterData(input, sectionId, remove) {
    //   document.getElementById('CollectionProductsContainer').querySelector('.filteredData').classList.add('filtering')

    let allGrids = document.getElementById('CollectionProductsContainer').querySelectorAll('.aos-init');

    Array.from(allGrids).forEach(function(grid) { 
        grid.classList.remove('aos-animate');
        grid.classList.remove('aos-init');
    });
    let filterForm = document.getElementById('FiltersForm');
    const formData = new FormData(filterForm);
    var searchParameters = new URLSearchParams(formData).toString();
    var clearAll = document.getElementById('yv-applied-filter-cross-all');
    
    var url = window.location.pathname + '?section_id=' + sectionId + '&' + searchParameters;
    var _updateUrl = window.location.pathname + '?' + searchParameters;
    if (remove) {
        url = remove;
        _updateUrl = remove;
    }
    const html = fetchFilterData(url).
    then((responseText) => {
        const resultData = new DOMParser().parseFromString(responseText, 'text/html');
        var itemResultCount = resultData.querySelector('.products-count');
        var sortByHtml = '';
        if (resultData.getElementById('toolbox-sort')) {
            sortByHtml = resultData.getElementById('toolbox-sort').innerHTML;
        }

        var html = resultData.getElementById('CollectionProductsContainer');
        var resultClear = resultData.getElementById('yv-applied-filter-cross-all')
        if (resultClear) {
            if (!document.getElementById('yv-applied-filter-cross-all')) {
                document.querySelector('.filter-heading-wrapper').appendChild(resultClear);
                clearAllFilterButton = true;
            }
          else{
            clearAllFilterButton = false;
          }
        }else{
            if (clearAll) {
                clearAll.remove();
                clearAllFilterButton = false;
            }
        }
        var elmnt = document.getElementById('CollectionProductsContainer');
        updateGridView(html);
        if (html) {
            elmnt.innerHTML = html.innerHTML;
        } else {
            let productResultContainer = elmnt.querySelector('[data-collection-products]');
            if (productResultContainer) {
                productResultContainer.innerHTML = noResultFound;
            }
        }

        filters = document.getElementById('filterSideBar');
        filterContainer = elmnt;
        let inputId = input.getAttribute('id');
        let updateInput = document.getElementById(inputId);
        if (updateInput) {
            updateInput.focus();
            let moreOption = updateInput.closest('.more-options');
            if (moreOption) {
                moreOption.style.display = 'block';
                let moreOptionText = updateInput.closest('.yv-filter-content').querySelector('.filters-expand');
                if (moreOptionText) {
                    moreOptionText.classList.add('active');
                    moreOptionText.querySelector('span').innerHTML = showLessText;

                }
            }
        }
        if (itemResultCount) {
            document.querySelector('.products-count').innerHTML = itemResultCount.innerHTML;
        }
        if (document.getElementById('toolbox-sort')) {
            document.getElementById('toolbox-sort').innerHTML = sortByHtml;
        }
        sortBy();
        applyFilters();
        showMoreFilters();
        // hideShowFiltersEvent = false;
        hideFilters();
        if(animationStatus){
          if (AOS) { 
            AOS.refreshHard() 
          }
        }
        productHoverSlider();
        if (input.getAttribute('name') != 'sort_by' && elmnt.closest('.yv-collection-container')) {
            elmnt.closest('.yv-collection-container').scrollIntoView({ top: 150, behavior: "smooth" });
        }
        history.pushState({}, null, _updateUrl);
    });
}



let triggered = false;

function ScrollExecute() {
    var moreButon = $('#more').last();
    var nextUrl = moreButon.find('a').attr("href");
    if (screenVisibility(moreButon) && (triggered == false)) {
        triggered = true;
        $.ajax({
                url: nextUrl,
                type: 'GET',
                beforeSend: function() {
                    moreButon.find('.load').removeClass('hidden');
                }
            })
            .done(function(data) {
                moreButon.remove();
                var e = document.createElement('div');
                e.innerHTML = $(data).find('#CollectionProductsContainer').html();
                updateGridView(e)
                $('[data-collection-products]').append(e.querySelector('[data-collection-products]').innerHTML);
                productVariants();
                gridPickUpAvailability();
                productHoverSlider();
                if(animationStatus){
                  if (AOS) { 
                    AOS.refreshHard() 
                  }
                }
                triggered = false
            });
    }
}
$(document).ready(function() {
    $(window).scroll(function() {
        ScrollExecute();
    });
});