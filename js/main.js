$(function(){
    //fade in website
    $('body').removeClass('fade-out');
    // hamburger meny
    $('.nav-toggle').on('click',mobileMenuToggle);
    //sticky menu
    document.onscroll = stickyMenu;
    //testimonial
    $('.button-testimonial').on('click', testimonialSwitch);
    //smooth scrolling
    $('.main-nav a').on('click', smoothScroll);
    //active link display
    activeLinkSwitcher();


});



//smooth scroll


function smoothScroll(e) {
  e.preventDefault();
  $('body,html').animate({
    scrollTop: $(this.hash).offset().top
  }, 1000 );
}

//active link switcher
function activeLinkSwitcher(){
    var scrollLink = $('.main-nav a');
    $(window).scroll(function() {
        var scrollbarLocation = $(this).scrollTop();
        scrollLink.each(function() {
        var sectionOffset = $(this.hash).offset().top -30;
        if ( sectionOffset <= scrollbarLocation ) {
            if((this.hash) === "#work"){
                //$('#work').addClass('fadeInUp');
            }
            $(this).parent().addClass('active');
            $(this).parent().siblings().removeClass('active');
        }
        })  
    });
}

  

/* ===========================================================================================*/
/* ===========================================================================================*/

//Sticky menu
function stickyMenu(){
    var menu = $('.main-header');
    var origOffsetY = menu.outerHeight();
    if ($(window).scrollTop() >= origOffsetY) {
        $('.main-header').addClass('sticky');
    } else {
        $('.main-header').removeClass('sticky');
    }
}
//testimonialSwitch between customers
function testimonialSwitch(){
    var currentActive = $('.testimonial-slideshow-container').find('.active-testimonial');
    var position = $('.testimonial-slideshow-container').children().index(currentActive);
    var testiLength = $('.testimonial-container').length;
    if($(this).hasClass('next-testimonial')){
        if(position < testiLength-1){
            $('.active-testimonial').removeClass('active-testimonial').next().addClass('active-testimonial');
        }else{
            $('.testimonial-container').removeClass('active-testimonial').first().addClass('active-testimonial');
        }
    }else{
        if(position > 0){
            
            $('.active-testimonial').removeClass('active-testimonial').prev().addClass('active-testimonial');
        }else{
            $('.testimonial-container').removeClass('active-testimonial').last().addClass('active-testimonial');
        }
    } 
}

// mobile menu toggle
function mobileMenuToggle(){
   $('.main-nav').toggleClass('is-open');
   $('.hamburger').toggleClass('is-open');
   return false;
}


(function(){
  

const slideImages = document.querySelectorAll('.slide-in-section');
const botImage = document.querySelectorAll('.hero-title-image');
///////
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		}, wait);
		if (immediate && !timeout) func.apply(context, args);
	};
}
/////
function slideIn(e){


  slideImages.forEach(function(currentImage){
    //image is halfway visible if its a image use currentImage.height, if its element use currentImage.offsetHeight
    const slideInLoc = (window.scrollY + window.innerHeight)-currentImage.offsetHeight /2;
    //pixel value of where image ends
    const imageEnd = currentImage.offsetTop+currentImage.offsetHeight;
    //check if image is in view, greater than halfway visible in this case
    const isInView = slideInLoc > currentImage.offsetTop;
    //if image is not scrolled past
    const stillInView = window.scrollY < imageEnd;
    console.log(window.getComputedStyle(currentImage).height);
    if(isInView && stillInView){
      currentImage.classList.add('active-section');
    }else{
      currentImage.classList.remove('active-section');
    }
  });
}

///////
var slider = debounce(function(){
  console.log('1');
  slideIn();
}, 20);


window.addEventListener('scroll', slider);
  
}());



///////JQUERY SCROLL REVEAL ////////

/*
//element in viewport
function isElementInViewport (el) {
    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();
    return rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth) *//* or $(window).width() *//* &&
        rect.top < (window.innerHeight || document.documentElement.clientHeight)    
}
*/

/*
//jQuery
$(window).scroll(function(){
    if(isElementInViewport(document.getElementById('work'))){
        console.log('view')
    }
})*/

///////JQUERY SCROLL REVEAL ////////
///////PARAlaX EFFECT ///////////
//parralax scroll function
/*function parallax(scrollTop){
    var wScroll = scrollTop;
    $('.parallax--bg').css('background-position', 'center '+(wScroll*0.6)+'px');
};
*/
///////PARAlaX EFFECT ///////////