(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });
})(jQuery); // End of use strict

var swiper = new Swiper('.swiper-container', {
  slidesPerView: 3,
  centeredSlides: true,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  virtual: {
    slides: (function () {
      var slides = [];
      slides.push('<img width="300" height="250" src="http://www.clirror.com/wp-content/uploads/2018/05/Screen-Shot-2018-05-18-at-12.16.15-AM.jpeg" />');
      slides.push('<img width="300" height="250" src="http://www.clirror.com/wp-content/uploads/2018/05/Screen-Shot-2018-05-18-at-12.22.06-AM.jpeg" />');
      slides.push('<img width="300" height="250" src="http://www.clirror.com/wp-content/uploads/2018/04/6P0A7987-1.jpg" />');
      slides.push('<img width="300" height="250" src="http://www.clirror.com/wp-content/uploads/2018/05/sitting.jpg" />');
      return slides;
    }()),
  },
});
