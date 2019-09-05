let header = document.querySelector('.header');
let navMenu = document.querySelector('.nav-menu');
let burger = document.querySelector('.header__hamburger');

header.classList.remove('header--no-js');
navMenu.classList.remove('nav-menu--no-js');
burger.classList.remove('header__hamburger--toggled');

burger.addEventListener('click', function (event) {
  event.preventDefault();
  this.classList.toggle('header__hamburger--toggled');
  navMenu.classList.toggle('nav-menu--closed');
  header.classList.toggle('header--closed');
  header.classList.toggle('header--opened');
});

let filterIcons = document.querySelectorAll('.post__filter-icon');

for (let i = 0; i < filterIcons.length; i++) {
  filterIcons[i].addEventListener('click', function (event) {
    event.preventDefault();
    for (let i = 0; i < filterIcons.length; i++) {
      filterIcons[i].classList.remove('post__filter-icon--active');
    }
    this.classList.add('post__filter-icon--active');
  })
};


$(document).ready(function () {
  $(".range-slider").slider();
});

$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    loop: true,
    items: 1,
    responsive: {
      0: {
        dots: true
      },
      1200: {
        dots: false,
        nav: true,
        navText: ['<img src="img/left-arrow.svg.png" alt="Левая стрелка отзывов">', '<img src="img/right-arrow.svg.png" alt="Правая стрелка отзывов">']
      }
    } 
  });
});

/* ymaps.ready(function () {
  var map = new ymaps.Map("map", {
    center: [55.76, 37.64],
    zoom: 10
  });

  if (map) {
    ymaps.modules.require(['Placemark', 'Circle'], function (Placemark, Circle) {
      var placemark = new Placemark([55.37, 35.45]);
    });
  }
}); */