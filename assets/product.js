window.addEventListener('resize', function(event){
  findVisibleItems();
  initProductSlider();
  initProductThumbSlider();
});

function initProductSlider(section = document){
  let sliderMain = section.querySelector('[data-flickity-product-slider]');
  if(sliderMain){
    let optionContainer = sliderMain.getAttribute('data-flickity-product-slider');
    if(optionContainer){
      var options = JSON.parse(optionContainer);
      if(sliderMain.hasAttribute("data-mobile-only")){
        if($(window).width() < 768 ){
          if (!sliderMain.classList.contains('flickity-enabled')) {
             productSlider =new Flickity(sliderMain,options);
            setTimeout(function(){
              productSlider.resize();
            },300)
          }
        }
        else{
          if (sliderMain.classList.contains('flickity-enabled')) {
            productSlider.destroy();
          }
        }
      }      
      else if(sliderMain.hasAttribute("data-desktop-only")){
        if($(window).width() >= 768 ){
          if (!sliderMain.classList.contains('flickity-enabled')) {
              productSlider =new Flickity(sliderMain,options);
              setTimeout(function(){
                productSlider.resize();
              },300)
          }
        }
        else{
          if (sliderMain.classList.contains('flickity-enabled')) {
            productSlider.destroy();
          }
        }
      }
      else{
        if (!sliderMain.classList.contains('flickity-enabled')) {
            productSlider =new Flickity(sliderMain,options);
            setTimeout(function(){
              productSlider.resize();
            },300)
        }
      }
      if(productSlider){
        productSlider.on( 'change', function( index ) {
          let sliderMain= productSlider.$element[0];
          sliderMain.querySelectorAll('.yv-youtube-video').forEach((video) => {
            video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
          });
          sliderMain.querySelectorAll('.yv-vimeo-video').forEach((video) => {
            video.contentWindow.postMessage('{"method":"pause"}', '*');
          });
          sliderMain.querySelectorAll('video').forEach((video) => video.pause() );
        });
      }
    }
  }
}

function initProductThumbSlider(section = document){
  let sliderMain = section.querySelector('[data-flickity-product-thumb-slider]');
  if(sliderMain){
    let optionContainer = sliderMain.getAttribute('data-flickity-product-thumb-slider');
    if(optionContainer){
      var options = JSON.parse(optionContainer);
      if(sliderMain.hasAttribute("data-mobile-only")){
        if($(window).width() < 768 ){
          if (!sliderMain.classList.contains('flickity-enabled')) {
           productThumbSlider =new Flickity(sliderMain,options);
          productThumbSlider.resize();
          }
        }
        else{
          if (sliderMain.classList.contains('flickity-enabled')) {
            productThumbSlider.destroy();
          }
        }
      }      
      else if(sliderMain.hasAttribute("data-desktop-only")){
        if($(window).width() >= 768 ){
          if (!sliderMain.classList.contains('flickity-enabled')) {
              productThumbSlider =new Flickity(sliderMain,options);
          productThumbSlider.resize();
          }
        }
        else{
          if (sliderMain.classList.contains('flickity-enabled')) {
            productThumbSlider.destroy();
          }
        }
      }
      else{
        if (!sliderMain.classList.contains('flickity-enabled')) {
            productThumbSlider =new Flickity(sliderMain,options);
          productThumbSlider.resize();
        }
      }
      if(productThumbSlider){
        productThumbSlider.on( 'change', function( index ) {
          let sliderMain= productThumbSlider.$element[0];
          sliderMain.querySelectorAll('.yv-youtube-video').forEach((video) => {
            video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
          });
          sliderMain.querySelectorAll('.yv-vimeo-video').forEach((video) => {
            video.contentWindow.postMessage('{"method":"pause"}', '*');
          });
          sliderMain.querySelectorAll('video').forEach((video) => video.pause() );
        });
      }
    }
  }
}

var productMediaModel = {
  loadShopifyXR() {
    Shopify.loadFeatures([
      {
        name: 'shopify-xr',
        version: '1.0',
        onLoad: this.setupShopifyXR.bind(this),
      },
      {
        name: 'model-viewer-ui',
        version: '1.0',
        onLoad: (function(){
          
          document.querySelectorAll('.yv-product-model-item').forEach((model) => {   
            let model3D = model.querySelector('model-viewer')
            model.modelViewerUI = new Shopify.ModelViewerUI(model3D);
            model3D.addEventListener('shopify_model_viewer_ui_toggle_play', function(evt) {
              model.querySelectorAll('.close-product-model').forEach(el => {
                el.classList.remove('hidden');
              });
              if(productSlider){
                productSlider.options.draggable = false;
                productSlider.updateDraggable();
              }
            }.bind(this));

            model3D.addEventListener('shopify_model_viewer_ui_toggle_pause', function(evt) {
              model.querySelectorAll('.close-product-model').forEach(el => {
                el.classList.add('hidden');
              });
              if(productSlider){
                productSlider.options.draggable = true;
                productSlider.updateDraggable();
              }
            }.bind(this));
			
            model.querySelectorAll('.close-product-model').forEach(el => {
              el.addEventListener('click', function() {
                if (model3D) {
                  model.modelViewerUI.pause();
                }
              }.bind(this))
            });
            
          });

        })
      }
    ]);
  },

  setupShopifyXR(errors) {
    if (!errors) {
      if (!window.ShopifyXR) {
        document.addEventListener('shopify_xr_initialized', () =>
                                  this.setupShopifyXR()
        );
        return;
      }
      document.querySelectorAll('[id^="product3DModel-"]').forEach((model) => {
        window.ShopifyXR.addModels(JSON.parse(model.textContent));
      });
      window.ShopifyXR.setupXRElements();
    }
  },
};

window.addEventListener('DOMContentLoaded', () => {
  let productModel = document.querySelectorAll('[id^="product3DModel-"]');
  if (productMediaModel && productModel.length > 0 ){
    productMediaModel .loadShopifyXR();
  }
});

function findVisibleItems(){
  let mainSliderParent =  document.getElementById('yv-product-gallery-slider');
  if(mainSliderParent){
    var elements = mainSliderParent.getElementsByClassName('gallery-main-item');

    var thumbs = mainSliderParent.getElementsByClassName('gallery-thumbs-item');
    
    window.addEventListener('scroll', function(event){
      Array.from(elements).forEach(function(item) {
        if (isOnScreen(item)) {
          thumbs = mainSliderParent.getElementsByClassName('gallery-thumbs-item');
          
          var relatedThumb = mainSliderParent.querySelector('.gallery-thumbs-item[data-image="'+item.id+'"]');
          if(relatedThumb){
            Array.from(thumbs).forEach(function(thumb) {
              if(thumb != relatedThumb){
              thumb.classList.remove('active');
              }
            });
            if(!relatedThumb.classList.contains('active')){
              relatedThumb.classList.add('active'); 
            }
          }
        }
      });

    });
  }

  let mainTabsContent =  document.getElementById('yvProductFeatureListwrapper');
  if(mainTabsContent){
    // setTimeout(function(){
    //   let headerMain = document.getElementById('headerSection');
    //   let body = document.querySelector('body');
    //   let headerHeight = headerMain.offsetHeight+5;
    //   if(body.classList.contains('sticky-header')){
    //     mainTabsContent.style.top = headerHeight+'px';
    //   }
    //   else{
    //     mainTabsContent.style.top = '5px';    	
    //   }
    // },300);
    let contentTabs = document.getElementsByClassName('yv-product-feature');

	
    window.addEventListener('scroll', function(event){
     
      Array.from(contentTabs).forEach(function(item) {
        if (isOnScreen(item)) {
          let headTabs = document.getElementsByClassName('feature-link');
          Array.from(headTabs).forEach(function(head) {
            head.parentNode.classList.remove('active');
          });
          var relatedHead = document.querySelector('.feature-link[href="#'+item.id+'"]');
          if(relatedHead){
            relatedHead.parentNode.classList.add('active');
          }
        }
      });

    });
  }
}

function initStickyAddToCart(){
  let mainProductForm =  document.querySelector('.main-product-form[action^="'+cartAdd+'"]');
  if(mainProductForm){
    let stickyBar =  document.getElementById('yvProductStickyBar');
    if(stickyBar){
      window.addEventListener('scroll', function(event){
        if (isOnScreen(mainProductForm,true)) {
          stickyBar.classList.remove('show');
        }else{     
          stickyBar.classList.add('show');
        }
      });  	
    }
  }
}

function sizeChart(){
  var sizeChartInit = document.querySelectorAll('.sizeChart-label');
  console.log(sizeChartInit);
  if(sizeChartInit){
    var sizeChartModel = document.getElementById('sizeChartModel');
    if(sizeChartModel){
      var sizeChartClose = sizeChartModel.querySelector('#sizeChartClose');
      sizeChartInit.forEach(function (sizeChart) {
      sizeChart.addEventListener("click", (e)=>{ 
        e.preventDefault();             
        sizeChartModel.fadeIn(100);
        document.querySelector('body').classList.add('sizeChartOpen'); 
        focusElement = sizeChart;
        sizeChartClose.focus();
      });
      });
      sizeChartClose.addEventListener("click", ()=>{
        document.querySelector('body').classList.remove('sizeChartOpen');
        sizeChartModel.fadeOut(100);
        focusElement.focus();
        focusElement='';
    });
  }
}
}
// function ThzhotspotPosition(evt, el, hotspotsize, percent) {
//   var left = el.offset().left;
//   var top = el.offset().top;
//   var hotspot = hotspotsize ? hotspotsize : 0;
//   if (percent) {
//     x = (evt.pageX - left - (hotspot / 2)) / el.outerWidth() * 100 + '%';
//     y = (evt.pageY - top - (hotspot / 2)) / el.outerHeight() * 100 + '%';
//   } else {
//     x = (evt.pageX - left - (hotspot / 2));
//     y = (evt.pageY - top - (hotspot / 2));
//   }

//   return {
//     x: x,
//     y: y
//   };
// }

// function productZoomInit(){
//   $('[data-flickity-product-slider]').mouseenter(function(e){
//     $('.yv-product-zoom').removeClass('show');
    
//     var _target = e.target
//     if (!_target.classList.contains("yv-product-zoom")) {
//       return false;
//     }
//     var zoomElement = $(this).find('.yv-product-zoom');
//     if($(this).hasClass('flickity-enabled')){
//       zoomElement = $(this).find('.yv-product-image-item.is-selected').find('.yv-product-zoom');
//     }
//     if($(window).width() > 1021){
//       zoomElement.addClass('show');
//     }
//   })
//   $('[data-flickity-product-slider]').mousemove(function(e){
//     var zoomElement = $(this).find('.yv-product-zoom');
//     if($(this).hasClass('flickity-enabled')){
//       zoomElement = $(this).find('.yv-product-image-item.is-selected').find('.yv-product-zoom');
//     }
//     $('.yv-product-zoom').removeClass('show');
    
//     var _target = e.target
//     console.log('hp',_target,_target.classList.contains("yv-product-zoom"))
//     if (!_target.classList.contains("yv-product-zoom")) {
//       $('.yv-product-zoom').removeClass('show');
//       return false;
//     }
   
//     if($(window).width() > 1021){
//       zoomElement.addClass('show');
//       let hp = ThzhotspotPosition(e, zoomElement, 0, true); 
//       zoomElement.find('.gallery-cursor').css({
//         "top":hp.y,
//         "left":hp.x
//       });
//     }
//   })
//   $('[data-flickity-product-slider]').mouseleave(function(e){
//     $('.yv-product-zoom').removeClass('show');
//   })
// }

const getMousePos = (e) => {
  var pos = e.currentTarget.getBoundingClientRect();
  return {
    x: e.clientX - pos.left,
    y: e.clientY - pos.top,
  };
};
let zoomIcon = document.querySelector('[zoom-icon]').getAttribute('zoom-icon');
if(zoomIcon){
function productZoomInit(){
  $('.yv-product-zoom').mouseenter(function(e){
    $('.yv-product-zoom').removeClass('show');
    if($(window).width() > 1021){
      $(this).addClass('show');
    }
  })
  $('.yv-product-zoom').mousemove(function(e){
    if($(window).width() > 1021){
      let t = getMousePos(e);
      this.querySelector('.gallery-cursor').style.translate = `${t.x}px ${t.y}px`;
    }
  })
  $('.yv-product-zoom').mouseleave(function(e){
    $('.yv-product-zoom').removeClass('show');
  })
}
}
document.addEventListener("DOMContentLoaded", findVisibleItems,false);
document.addEventListener("shopify:section:load", findVisibleItems,false);

document.addEventListener("DOMContentLoaded", productZoomInit,false);
document.addEventListener("shopify:section:load", productZoomInit,false);

document.addEventListener("DOMContentLoaded", initProductSlider(),false);
document.addEventListener("DOMContentLoaded", initProductThumbSlider(),false);

document.addEventListener("shopify:section:load",function (event) {
  initProductSlider(event.target)
  initProductThumbSlider(event.target);
});

document.addEventListener("DOMContentLoaded", sizeChart,false);
document.addEventListener("shopify:section:load", sizeChart,false);

document.addEventListener("DOMContentLoaded", initStickyAddToCart,false);
document.addEventListener("shopify:section:load", initStickyAddToCart,false);



$(document).ready(function(){
 setTimeout(function(){
    var thumbnails = document.querySelector('.yv-product-gallery-thumbs-container');
    var lastKnownY = window.scrollY;
    var currentTop = 0;
    if(thumbnails){
      var initialTopOffset = parseInt(window.getComputedStyle(thumbnails).top);

      window.addEventListener('scroll', function(event){
        var  bounds = thumbnails.getBoundingClientRect(),
            maxTop = bounds.top + window.scrollY - thumbnails.offsetTop + initialTopOffset,
            minTop = thumbnails.clientHeight - window.innerHeight;

        if (window.scrollY < lastKnownY) {
          currentTop -= window.scrollY - lastKnownY;
        } else {
          currentTop += lastKnownY - window.scrollY;
        }
        currentTop = Math.min(Math.max(currentTop, -minTop), maxTop, initialTopOffset);
        lastKnownY = window.scrollY;
        thumbnails.style.top = "".concat(currentTop, "px");
      });
    }
  },1000)

  jQuery('body').on('click','.gallery-thumbs-item',function(e) {
    e.preventDefault();
    var destination = jQuery(this).attr('data-image');
    var top = 10; 
  //  if(jQuery('#headerSection').hasClass('sticky-header')){
      top = jQuery('.shopify-section-main-header').height() + 10;
  //  }
    if(jQuery('#'+destination+'.gallery-main-item').length > 0){
      jQuery('html,body').animate({ scrollTop:(jQuery('#'+destination+'.gallery-main-item').offset().top) - top});
    }
  });


  jQuery('body').on('click','.pdp-view-close',function(e) {
    e.preventDefault();
    jQuery('#yvProductStickyBar').remove();    
  });
  jQuery('body').on('click','.feature-link',function(e) {
    e.preventDefault();

    let destination = jQuery(this).attr('href');
    let top = 10;
    // if(jQuery('#headerSection').hasClass('sticky-header')){
      top = jQuery('.shopify-section-main-header').height() + 90;
    // }
    if(jQuery(destination).length > 0){
      jQuery('html,body').animate({ scrollTop:(jQuery(destination).offset().top) - top});
    }
  });


  jQuery('body').on('change','.sticky-bar-product-options',function(){
    let _section = jQuery(this).closest('.shopify-section');
    let option = jQuery(this).attr('data-name');
    let value = jQuery(this).val();
    let mainOption = _section.find('.productOption[name="'+option+'"]');
    if(mainOption.is(':radio')){
      _section.find('.productOption[name="'+option+'"][value="'+value+'"]').attr('checked',true).trigger('click');
    }
    else{
      mainOption.val(value);
      let sectionId = document.querySelector('#'+_section.attr('id'))
      if(sectionId){
        let optionSelector = document.querySelector('.productOption[name="'+option+'"]');
        if(optionSelector){
          optionSelector.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    }    
  })
  if(fancySelector){
    Fancybox.bind(fancySelector, {
      touch: false,
      thumbs : {
        autoStart : true
      },
      on: {
        load: (fancybox, slide) => {
          document.querySelectorAll('.yv-youtube-video').forEach((video) => {
            video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
          });
          document.querySelectorAll('.yv-youtube-video').forEach((video) => {
            video.contentWindow.postMessage('{"method":"pause"}', '*');
          });
          document.querySelectorAll('video').forEach((video) => video.pause());
          var fancyBoxContainer = $('body').find('.fancybox__container');
        },
        done: (fancybox, slide) => {
          var fancyBoxContainer = $('body').find('.fancybox__container');
        }
      },
      Toolbar: {
        display: [
          "close",
        ],
      }
    });
  }
})
