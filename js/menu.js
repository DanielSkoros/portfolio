//Show menu on hamburger click
const navTrigger = '.navTrigger';
const navItem = '.nav__item';
const full = '.fullpage';

const menu = document.querySelector(navTrigger);
const items = document.querySelectorAll(navItem);
const page = document.querySelector(full);

const pageSections = document.querySelectorAll('.container');

menu.addEventListener('click', () => {
   menu.classList.toggle('active');
   items.forEach(item => item.classList.toggle('animateOnce'));
   pageSections.forEach(section => section.classList.toggle('blur'));
   background.classList.toggle('blur');
   allowScroll = !allowScroll;
   bindEventListeners();
});

page.addEventListener('click', () => {
    menu.classList.remove('active');
    items.forEach(item => item.classList.remove('animateOnce'));
    pageSections.forEach(section => section.classList.remove('blur'));
    background.classList.remove('blur');
    allowScroll = true;
    bindEventListeners();
});


