/**
 * Contain Custom JS
 */

(function($){
  $(window).bind('load',function(){

    $(window).resize(function(){
    $('.bx-wrapper .slider-caption').each(function(){
    var cap_height = $(this).actual( 'outerHeight' );
    $(this).css('margin-top',-(cap_height/2));
    });
    }).resize();
       
    /*Masonory for Event*/
    var $container = $('#event-grid');
    $container.isotope({
    itemSelector : '.events',
    getSortData : {
      date : '[data-time]',
      name : '.event-title',
    }
    });

    var $optionSets = $('.event-listing .event-button'),
    $optionLinks = $optionSets.find('li');
    $optionLinks.click(function(){
    var $this = $(this);
    // don't proceed if already is-checked
    if ( $this.hasClass('is-checked') || $this.hasClass('no-link') ) {
    return false;
    }
    var $optionSet = $this.parents('.event-button');
    $optionSets.find('.is-checked').removeClass('is-checked');
    $this.addClass('is-checked');
    // make option object dynamically, i.e. { filter: '.my-filter-class' }
    var options = {},
    key = $optionSet.attr('data-option-key'),
    value = $this.attr('data-option-value');
    // parse 'false' as false boolean
    value = value === 'false' ? false : value;
    options[ key ] = value;
    if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
    // changes in layout modes need extra logic
    changeLayoutMode( $this, options )
    } else {
    // otherwise, apply new options
    $container.isotope( options );
    }
    return false;
    }); 

    /*Masonory for Portfolio*/
    $container2 =  $('#portfolio-grid');
    $('#portfolio-grid').isotope({
      itemSelector: '.portfolios',
    });

    $('.portfolio-listing .button-group').on( 'click', 'li:not(".no-link")', function() {
    var filterValue = $(this).attr('data-filter');
    $container2.isotope({ filter: filterValue });
    });

    // change is-checked class on buttons
    $('.button-group').each( function( i, buttonGroup ) {
      var $buttonGroup = $( buttonGroup );
      $buttonGroup.on( 'click', 'li', function() {
        if($(this).hasClass('no-link')){
            return;
        }
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $( this ).addClass('is-checked');
      });
    });

    /*Client Logo up Slider*/
    $('.logo-slider').bxSlider({
      pager:false,
      auto:true,
      moveSlides:1,
      minSlides: 3,
      maxSlides: 6,
      slideWidth: 170,
      slideMargin: 15
    });
  });

  /*Resize the iframe video proportionally*/
   $("#page").fitVids();

  /*Super Fish Menu*/
    $('#site-navigation .menu > ul').superfish({
      animation:   {opacity:'show',height:'show'},  // fade-in and slide-down animation
      animationOut:{opacity:'hide',height:'hide'},  // fade-in and slide-down animation
      speed:       'fast',                          // faster animation speed
    });

  /*Sticky Header*/
  if($('.sticky-header').length > 0){
  var top_pos = $('.sticky-header').offset().top + $('.sticky-header').outerHeight();
  var top_poss = $('.sticky-header').offset().top
  $(window).scroll(function(){
    if($(window).scrollTop() > top_pos ){
      $('.sticky-header').addClass('fixed');
    }else if($(window).scrollTop() < top_poss ){
      $('.sticky-header').removeClass('fixed');
    }
  });
  }

  /*Go to Top*/
  $(window).scroll(function(){
    if($(this).scrollTop() > 300){
      $('#ak-top').css('right',0);
    }else{
      $('#ak-top').css('right',-65);
    }
  });

  $("#ak-top").click(function(){
  $('html,body').animate({scrollTop:0},600);
  });
  

  $('.commentmetadata').after('<div class="clear"></div>');

  /*Responsive Nav Toggle*/
  $('.menu-toggle').click(function(){
    $('#site-navigation .menu').slideToggle('slow');
  });
    
  /*Pop up Gallery*/    
  $(".portfolio-image").nivoLightbox();

  /*FAQ Toggle*/
  $('.faq_hide .faq-question').click(function(){
    $(this).next('.faq-answer').slideToggle();
    $(this).toggleClass('active');
  });

  /*Google Map Toggle*/ 
  $('.google-icon').click(function(){
    $('#masthead').toggleClass('slide-open');
  });

  $(window).scroll(function(){
    $('#masthead').removeClass('slide-open');
  });

  /*Testimonial Slider*/
  $('.testimonial-slider').bxSlider({
   controls:false,
   auto:true,
   mode:'fade',
   speed:500,
   pause : 5000
  });


  /*Short Codes Js*/
  $('.slider_wrap').bxSlider({
    pager:false,
    auto:true,
    adaptiveHeight: true,
    captions:true,
    prevText:'<i class="fa fa-angle-left"></i>',
    nextText:'<i class="fa fa-angle-right"></i>'
  });

  $('.ap_accordian:first').children('.ap_accordian_content').show();
  $('.ap_accordian:first').children('.ap_accordian_title').addClass('active');
  $('.ap_accordian_title').click(function(){
    if($(this).hasClass('active')){
    }
    else{
      $(this).parent('.ap_accordian').siblings().find('.ap_accordian_content').slideUp();
      $(this).next('.ap_accordian_content').slideToggle();
      $(this).parent('.ap_accordian').siblings().find('.ap_accordian_title').removeClass('active')
      $(this).toggleClass('active')
    }
  });

  $('.ap_toggle_title').click(function(){
      $(this).next('.ap_toggle_content').slideToggle();
      $(this).toggleClass('active')
  });

  $('.ap_tab_wrap').prepend('<div class="ap_tab_group clearfix"></div>');

  $('.ap_tab_wrap').each(function(){
    $(this).children('.ap_tab').find('.tab-title').prependTo($(this).find('.ap_tab_group'));
    $(this).children('.ap_tab').wrapAll( "<div class='ap_tab_content' />");
  });

  $('#page').each(function(){
    $(this).find('.ap_tab:first-child').show();
    $(this).find('.tab-title:first-child').addClass('active')
  });
 

  $('.ap_tab_group .tab-title').click(function(){
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    $(this).parent('.ap_tab_group ').next('.ap_tab_content').find('.ap_tab').hide();
    var ap_id = $(this).attr('id');
    $(this).parent('.ap_tab_group ').next('.ap_tab_content').find('.'+ap_id).show();
  });

  var open = false;
  $('.search-icon').on('click',function(){
    open = !open;
    if(open){
      $('.ak-search').show();
      $(this).find('i.fa4').removeClass('fa-search').addClass('fa-caret-right');
    }else{
      $('.ak-search').hide();
      $(this).find('i.fa4').addClass('fa-search').removeClass('fa-caret-right');
    }
  });

  
  $('.gallery-item').each(function(){
    $(this).find('a').addClass('fancybox-gallery').attr('data-lightbox-gallery','gallery');
  });
  $('.fancybox-gallery').nivoLightbox();

  $('.ap-progress-bar').each(function() { 
      var that = $(this);
      var progressWidth = that.find('.ap-progress-bar-percentage').data('width') + '%';
      that.find('.ap-progress-bar-percentage').animate({width: progressWidth}, 2000);
  });

})(jQuery);