/* ===========================================================================================*/
/* ===========================================================================================*/
/*Polyfill IE nodelist to array forEach*/
(function () {
    if ( typeof NodeList.prototype.forEach === "function" ) return false;
    NodeList.prototype.forEach = Array.prototype.forEach;
})();
(function(){
    /* G L O B A L S */
    const slideImages = document.querySelectorAll('.slide-in-section');
    /* F U N C T I O N S */
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
            const slideInLoc = (window.pageYOffset/*window.scrollY no support for IE*/ + window.innerHeight)-currentImage.offsetHeight /2;
            //pixel value of where image ends
            const imageEnd = currentImage.offsetTop+currentImage.offsetHeight;
            //check if image is in view, greater than halfway visible in this case
            const isInView = slideInLoc > currentImage.offsetTop;
            //if image is not scrolled past
            const stillInView = window.pageYOffset/*window.scrollY no support for IE*/ < imageEnd;
            if(isInView && stillInView){
            currentImage.classList.add('active-section');
            }else{
            currentImage.classList.remove('active-section');
            }
        });
    }
    /* O T H E R  F U N C T I O N S */
    //smooth scroll
    function smoothScroll(e) {
        e.preventDefault();
        $('body,html').animate({
        scrollTop: $(this.hash).offset().top
        }, 1000 );
    }
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
    //active link switcher
    function activeLinkSwitcher(){
        var scrollLink = $('.main-nav a');
        var scrollbarLocation = $(this).scrollTop();
        scrollLink.each(function() {
            var sectionOffset = $(this.hash).offset().top -30;
            if ( sectionOffset <= scrollbarLocation ) {
                $(this).parent().addClass('active');
                $(this).parent().siblings().removeClass('active');
            }
        })  
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
    //scrollToTopButton
    function scrollToTopButton(){
        var el = $('.st-top');
        var offset = document.getElementById('about').offsetTop;
        var offset_opacity = document.getElementById('work').offsetTop;
        ( $(this).scrollTop() > offset ) ? el.addClass('st-is-visible') : el.removeClass('st-is-visible st-fade-out');
		if( $(this).scrollTop() > offset_opacity ) { 
			el.addClass('st-fade-out');
		}
    }
    /***************S C R O L L  E V E N T S ************/
    var slider = debounce(function(){
        //slide in animations
        slideIn();
        //active link display
        activeLinkSwitcher();
        //sticky menu
        stickyMenu();
        //scrollToTopButton
        scrollToTopButton();
    }, 20);
    window.addEventListener('scroll', slider);
    /***************C L I C K  T O G G L E S ************/
    //$('body').removeClass('fade-out');
    // hamburger meny
    $('.nav-toggle').on('click',mobileMenuToggle);
    //testimonial
    $('.button-testimonial').on('click', testimonialSwitch);
    //smooth scrolling navigation links
    $('.main-nav a').on('click', smoothScroll);
    //smooth scrolling backToTop link
    $('.st-top').on('click', smoothScroll);

}());
