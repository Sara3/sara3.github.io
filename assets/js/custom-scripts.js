// (function($) {
    
//     'use strict';



//     /**
//      * ==============================
//      * Function for email address validation         
//      * ==============================
//      */
//     function isValidEmail(emailAddress) {
//     var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
//         return pattern.test(emailAddress);
//     };



    // makes sure the whole site is loaded
    $(window).on('load', function() {


        /**
         * ================================
         * PRELOADER                     
         * ================================
         */
        // will first fade out the loading animation
        $("#main-preloader").fadeOut();
        //then background color will fade out slowly
            // $("#main-preloader .loading-center-absolute").delay(200).fadeOut(300);
    
    
            // /**
            //  * ====================
            //  * PORTFOLIO 
            //  * ====================
            //  */
            // if( $('.grid').length ) {
            //     $('.grid').isotope({
            //       layoutMode: 'packery',
                  
            //       packery: {
                    
            //       },
            //       itemSelector: '.grid-item',
            //       percentPosition: true,
            //     });

            // Portfolio function
            var textProp = document.documentElement.textContent !== undefined ? 'textContent' : 'innerText';
            function getText( elem ) {
                return elem[ textProp ];
            }

            docReady( function() {
              // init Isotope
              var iso = new Isotope( '.grid', {
                  itemSelector: '.grid-item',
                  layoutMode: 'fitRows'
              });
              // bind filter button click
              var filtersElem = document.querySelector('.filters-button-group');
              eventie.bind( filtersElem, 'click', function( event ) {
                  // only work with buttons
                  if ( !matchesSelector( event.target, '.filter-project' ) ) {
                      return;
                  }
                  var filterValue = event.target.getAttribute('data-filter');
                  // use matching filter function
                  filterValue =  filterValue;
                  iso.arrange({ filter: filterValue });
              });
              // change is-checked class on buttons
              var buttonGroups = document.querySelectorAll('.filter-button');
              for ( var i=0, len = buttonGroups.length; i < len; i++ ) {
                  var buttonGroup = buttonGroups[i];
                  radioButtonGroup( buttonGroup );
              }
            });

            function radioButtonGroup( buttonGroup ) {
                eventie.bind( buttonGroup, 'click', function( event ) {
                    // only work with buttons
                    if ( !matchesSelector( event.target, '.filter-project' ) ) {
                        return;
                    }
                    classie.remove( buttonGroup.querySelector('.is-checked'), 'is-checked' );
                    classie.add( event.target, 'is-checked' );
                });
            }
        }

    }); 

  

    $(document).on('ready', function() {


        /**
         * =======================================
         * SUBCRIBE  BUTTON SCROLL FROM HOME PAGE
         * =======================================
         */
        $('.btn-scroll').localScroll({
            offset: -Math.abs($('#header-navbar').height())
        });



        /**
         * =======================================
         * NAVIGATION SCROLL
         * =======================================
         */
        $('.navbar-nav').onePageNav({
            currentClass: 'active',
            scrollThreshold: 0.2, // Adjust if Navigation highlights too early or too late
            scrollSpeed: 1000
        });

        $('.navbar-nav, .btn-scroll').localScroll({
            offset: -Math.abs($('.sa-header-nav-1').height())
        });



        /**
         * ======================================
         *  STICKY NAVBAR 
         * ======================================
         */
        //if ( matchMedia( 'only screen and (min-width: 768px)' ).matches ) {
           $(document).on('scroll', function() {
              var scrollPos = $(this).scrollTop();

              if( scrollPos > 30 ) {
                 $('.sa-nav-fixed').addClass('navbar-home');
              } 
              else {
                 $('.sa-nav-fixed').removeClass('navbar-home');
              }
           });
        //}



        /**
         * =======================================
         * WOW ANIMATION
         * =======================================
         */
        var wow = new WOW({ mobile: false });
        wow.init();



        /**
         * =======================================
         * Skill Style Setup
         * =======================================
         */
        $('.sa-skill-detail-1').find('.progress').each( function() {
            var el = $(this).attr('data-progress');
            $(this).html("<div class='progress-bar' style='width: " + el + "'><span class='sr-only'>" + el + " Complete</span><span class='process-end' style='left: " + el + "'></span></div>");
        });



        /**
         * =======================================
         * TESTIMONIAL SYNC WITH CLIENTS 
         * =======================================
         */
        $(".carousel-slider").owlCarousel({
            autoPlay: 5000,
            stopOnHover : true,
            navigation: true,
            singleItem : true,
            slideSpeed : 1000,
            afterAction : syncPosition,
            navigation: true,
            navigationText: [
              "<div class='button-body'><i class='fa arrow_carrot-left'></i></div>",
              "<div class='button-body'><i class='fa arrow_carrot-right'></i></div>"
            ],
            pagination:false,
            responsiveRefreshRate : 200,
            afterInit : function(el){
                el.find(".owl-item").eq(0).addClass("synced");
              }
        });


        function syncPosition(el){
          var current = this.currentItem;
          $(".carousel-slider")
            .find(".owl-item")
            .removeClass("synced")
            .eq(current)
            .addClass("synced")
          // if($(".carousel-slider").data("owlCarousel") !== undefined){
          //   center(current);
          // }
        }




        /**
         * ===================================================================
         * Bootstrap Internet Explorer 10 in Windows 8 and Windows Phone 8 FIX
         * ===================================================================
         */
        if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
          var msViewportStyle = document.createElement('style')
          msViewportStyle.appendChild(
            document.createTextNode(
              '@-ms-viewport{width:auto!important}'
            )
          )
          document.querySelector('head').appendChild(msViewportStyle)
        };



        /**
         * =======================================
         * PARALLAX
         * =======================================
         */
        $(window).stellar({
          responsive: true,
          horizontalScrolling: false,
          hideDistantElements: false,
          horizontalOffset: 0,
          verticalOffset: 0,
        });



        /**
         * ==============================
         * PROJECT LOADING           
         * ==============================
         */
        $('.sa-view-project-detail').on('click', function(event) {
            event.preventDefault();
            var href          = $(this).attr('href') + ' ' + $(this).attr('data-action'),
                dataShow      = $('#project-gallery-view'),
                dataShowMeta  = $('#project-gallery-view meta'),
                dataHide      = $('#project-gallery'),
                preLoader     = $('#project-filter-loader'),
                backBtn       = $('#back-button'),
                filterBtn     = $('#filter-button');

            dataHide.animate( { 'marginLeft':'-120%' }, { duration: 400, queue: false } );
            filterBtn.animate( { 'marginLeft':'-120%' }, { duration: 400, queue: false } );
            dataHide.fadeOut(400);
            filterBtn.fadeOut(400);
            setTimeout( function() { preLoader.show(); }, 400);
            setTimeout( function() {
                dataShow.load( href, function() {
                    dataShowMeta.remove();
                    preLoader.hide();
                    dataShow.fadeIn(600);
                    backBtn.fadeIn(600);
                });
            },800);
        });

        $('#back-button').on('click', function(event) {
            event.preventDefault();
            var dataShow    = $('#project-gallery'),
                dataHide    = $('#project-gallery-view'),
                filterBtn   = $('#filter-button');

            $("[data-animate]").each( function() {
                $(this).addClass($(this).attr('data-animate'));
            });

            dataHide.fadeOut(400);
            $(this).fadeOut(400);
            setTimeout(function(){
                dataShow.animate( { 'marginLeft': '0' }, { duration: 400, queue: false } );
                filterBtn.animate( { 'marginLeft': '0' }, { duration: 400, queue: false } );
                dataShow.fadeIn(400);
                filterBtn.fadeIn(400);
            },400);
            setTimeout(function(){
                dataShow.find('.fadeInRight, .fadeInLeft, .fadeInUp, .fadeInDown').removeClass('fadeInRight').removeClass('fadeInLeft').removeClass('fadeInUp').removeClass('fadeInDown');
            },1500);
        });




        /**
         * ============================
         * CONTACT FORM 
         * ============================
        */
//         $("#contact-us-form").submit(function(e) {
//             e.preventDefault();
//             var data = {
//                 name: $("#contact-us-name").val(),
//                 email: $("#contact-us-email").val(),
//                 subject: $("#contact-us-subject").val(),
//                 message: $("#contact-us-message").val()
//             };
//             //alert(data['name']+data['email']+data['subject']+data['message']);

//             if ( isValidEmail(data['email']) && (data['message'].length > 1) && (data['name'].length > 1) && (data['subject'].length > 1) ) {
//                 $.ajax({
//                     type: "POST",
//                     url: "./contactform.php",
//                     data: data,
//                     success: function() {
//                         $('.email-success').delay(500).fadeIn(1000);
//                         $('.email-failed').fadeOut(500);
//                     }
//                 });
//             } else {
//                 $('.email-failed').delay(500).fadeIn(1000);
//                 $('.email-success').fadeOut(500);
//             }

//             return false;
//         });

//     });

// } (jQuery) );



/** 
 * ===============================
 * Flex Slider
 * ===============================
 */
var $ = jQuery.noConflict();
$(window).load(function() {
    $('.flexslider').flexslider({
          animation: "fade"
    });

    $(function() {
        $('.show_menu').on('click', function() {
            $('.menu').fadeIn();
            $('.show_menu').fadeOut();
            $('.hide_menu').fadeIn();
        });
        $('.hide_menu').on('click', function() {
            $('.menu').fadeOut();
            $('.show_menu').fadeIn();
            $('.hide_menu').fadeOut();
        });
    });

    // $('.prev').html("<span class='icon-wrap'></span>");
    // $('.next').html("<span class='icon-wrap'></span>");;
});




