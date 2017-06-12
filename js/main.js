$(function(){
    //fade in website
    $('body').removeClass('fade-out');
    // hamburger meny
    $('.nav-toggle').click(function(){
        $('.main-nav').toggleClass('is-open');
        $('.hamburger').toggleClass('is-open');
    });
/*sr.reveal({reset: true});
sr.reveal('.cta-content-testimonial', {duration: 2000, delay: 100, origin: 'left', distance: '100px'});
sr.reveal('.cta-contact', {duration: 2000, delay: 100, origin: 'right', distance: '100px'});
*/

    //window scroll function
/*    $(window).scroll(function(){
        var wScroll = $(window).scrollTop();


    });*/

document.onscroll = stickyMenu;

});

window.sr = ScrollReveal();

/* ===========================================================================================*/
/* ===========================================================================================*/
//parralax scroll function
function parallax(scrollTop){
    var wScroll = scrollTop;
    $('.parallax--bg').css('background-position', 'center '+(wScroll*0.6)+'px');
    $('.parallax--box').css('top', (wScroll*0.005)+'em');
};

var menu = $('.main-header');
//var origOffsetY = menu.offset().top+200;
var origOffsetY = menu.outerHeight();
function stickyMenu(){
    
    console.log(origOffsetY);
    console.log($(window).scrollTop());
    if ($(window).scrollTop() >= origOffsetY) {
        $('.main-header').addClass('sticky');
        //$('.content').addClass('menu-padding');
    } else {
        $('.main-header').removeClass('sticky');
        //$('.content').removeClass('menu-padding');
    }
}






