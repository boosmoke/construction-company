$(function(){
    //fade in website
    $('body').removeClass('fade-out');
    // hamburger meny
    $('.nav-toggle').click(function(){
        $('.main-nav').toggleClass('is-open');
        $('.hamburger').toggleClass('is-open');
    });


    //window scroll function
/*    $(window).scroll(function(){
        var wScroll = $(window).scrollTop();


    });*/


});



/* ===========================================================================================*/
/* ===========================================================================================*/
//parralax scroll function
function parallax(scrollTop){
    var wScroll = scrollTop;
    $('.parallax--bg').css('background-position', 'center '+(wScroll*0.6)+'px');
    $('.parallax--box').css('top', (wScroll*0.005)+'em');
};







