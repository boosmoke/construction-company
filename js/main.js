$(function(){
    var activeSkill = false;
    var wScroll = $(window).scrollTop();
    //fade in website
    $('body').removeClass('fade-out');
    // hamburger meny
    $('.nav-toggle').click(function(){
        $('.main-nav').toggleClass('is-open');
        $('.hamburger').toggleClass('is-open');
    });
/*
    $(window).on('scroll',function(){
        var wScroll = $(window).scrollTop();
        console.log('blubblub');
        
        //if window height goes over 50% of section run following things
        if($('.skill-bar-chart').offset().top - $(window).height()/1.2 < wScroll){
            console.log('active skill go');
            activateSkill();
            $(window).off('scroll', callOnce);
        }
      
});
*/

    //window scroll function
    $(window).scroll(function(){
        var wScroll = $(window).scrollTop();
      //parallax();
      //toggleSkill();
      //startPortfolio(wScroll);
      //console.log('blubblub');
      scrollTrigger(wScroll, $('.skill-description'), 1.2, 'fadeInLeft');

    });

    /*
    $('.items').on('inview', function(event, isInView) {
        if (isInView) {
            $(this).addClass('fadeInLeft');
        } else {
            $(this).removeClass('fadeInLeft');
        }
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
/* ===========================================================================================*/
/* ===========================================================================================*/
function startPortfolio(scrollTop){
    var wScroll = scrollTop;
    if($('.portfolio').offset().top - $(window).height()/3 < wScroll){
        $('.port-item').each(function(i){
            setTimeout(function(){
                $('.port-item').eq(i).addClass('is-visible');
        },100*i);
        });
    }   
}
/* ===========================================================================================*/
/* ===========================================================================================*/
// animate skill section
function activateSkill(){
    //add classes 
    $('.skill-percent').addClass('levelpercent visible');
    $('.skill-cap').addClass('levelup');
    //for each skill-percent do the following
    $('.skill-percent').each(function () {
        //create property counter and set it to 0
            $(this).prop('Counter', 0).animate({
                //add property 0 to skill-percent
                Counter: $(this).text()
            }, {
                //animation options
                duration: 1000,
                easing: 'swing',
                step: function (now) {
                    //add each number percent to skill-percent making count effect
                    $(this).text(Math.ceil(now)+'%');
                }
            });
    });
};
/* ===========================================================================================*/
/* ===========================================================================================*/
//scrollTrigger for animations on scroll. PARAMETERS: wScroll ,classname, offset(1-2), animation name
function scrollTrigger(scrollTop, element, offset, animation){
    var wScroll = scrollTop;
    //take element top and add elements height of the element
    var elementBottom = element.position().top + element.outerHeight(true);
    //take window top and add window height
    var windowBottom = $(window).scrollTop() + $(window).height();
    console.log(windowBottom);
    //console.log(scrollTop)

    //check if scrolled past element remove class 
    if(scrollTop > elementBottom){
        element.removeClass(animation);    
    }
    //check if scrolled on element add class
    else if(element.offset().top - $(window).height()/offset < wScroll){
        element.addClass(animation);
    }
    //check if scrolled above element remove class 
    else if(element.position().top > windowBottom ){
        element.removeClass(animation);
    }
}
/* ===========================================================================================*/
/* ===========================================================================================*/
//function to toggle skill
function toggleSkill(scrollTop){
    var wScroll = scrollTop;
    //if window height goes over 50% of section run following things
    if($('.skill-bar-chart').offset().top - $(window).height()/1.2 < wScroll && activeSkill === false){
        activeSkill = true;
        console.log('active skill go');
        activateSkill();
    }
}
/* ===========================================================================================*/
/* ===========================================================================================*/
function callOnce(){
    //if window height goes over 50% of section run following things
    if($('.skill-bar-chart').offset().top - $(window).height()/1.2 < wScroll){
        console.log('active skill go');
        activateSkill();
        $(window).off('scroll', callOnce);
    }
}




