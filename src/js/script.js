var header = document.querySelector('.header');
var navMenu = document.querySelector('.nav-menu');
var burger = document.querySelector('.header__hamburger')

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