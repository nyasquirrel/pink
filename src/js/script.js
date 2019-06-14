var header = document.querySelector('.header');
var navMenu = document.querySelector('.nav-menu');
var burger = document.querySelector('.header__hamburger')

header.classList.remove('header--no-js');
navMenu.classList.remove('nav-menu--no-js');
burger.classList.remove('header__hamburger--toggled');

burger.addEventListener('click', function () {
  if (burger.classList.contains('header__hamburger--toggled')) {
    burger.classList.remove('header__hamburger--toggled');
    navMenu.classList.add('nav-menu--closed');
    header.classList.add('header--closed');
  } else {
    burger.classList.add('header__hamburger--toggled');
    navMenu.classList.remove('nav-menu--closed');
    header.classList.remove('header--closed');
    header.classList.add('header--opened');
  }
});