$(function(){
    //fade in website
    $('body').removeClass('fade-out');
    // hamburger meny
    $('.nav-toggle').click(mobileMenuToggle);


    document.onscroll = stickyMenu;

    $('.button-testimonial').on('click', testimonialSwitch);
    
    $('.main-nav a').on('click', smoothScroll);
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
                $('#work').addClass('fadeInUp');
            }
            $(this).parent().addClass('active');
            $(this).parent().siblings().removeClass('active');
        }
        })  
    });
}

  

/* ===========================================================================================*/
/* ===========================================================================================*/
//parralax scroll function
function parallax(scrollTop){
    var wScroll = scrollTop;
    $('.parallax--bg').css('background-position', 'center '+(wScroll*0.6)+'px');
};

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



