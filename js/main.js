//Fix too fast slides scrolling
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}
//Desktop
const goToNextSlide = () => {
    let currentSlide = document.getElementById(currentIndex);
    currentSlide.classList.toggle('active');
    slides[currentIndex - 1].classList.add('hide');

    if(currentIndex == 3){
        sections[currentIndex - 1].classList.toggle('hide');
        sections[currentIndex - 1].classList.remove('animate');

        currentIndex = 1;
        currentSlide = document.getElementById(currentIndex);
        currentSlide.classList.toggle('active');

        sections[currentIndex - 1].classList.toggle('hide');
        sections[currentIndex - 1].classList.toggle('animate');

        background.style.backgroundImage = `url(../portfolio/img/landing${currentIndex}.jpg)`;
        animateList(currentSlide);
    }else {
        sections[currentIndex - 1].classList.toggle('hide');
        sections[currentIndex - 1].classList.remove('animate');

        currentIndex++;
        currentSlide = document.getElementById(currentIndex);
        currentSlide.classList.toggle('active');

        sections[currentIndex - 1].classList.toggle('hide');
        sections[currentIndex - 1].classList.toggle('animate');

        background.style.backgroundImage = `url(../portfolio/img/landing${currentIndex}.jpg)`;
        animateList(currentSlide);
    }
};
const goToPrevSlide = () => {
    let currentSlide = document.getElementById(currentIndex);
    currentSlide.classList.toggle('active');
    slides[currentIndex - 1].classList.add('hide');

    if(currentIndex == 1){
        sections[currentIndex - 1].classList.toggle('hide');
        sections[currentIndex - 1].classList.remove('animate');

        currentIndex = 3;

        currentSlide = document.getElementById(currentIndex);
        currentSlide.classList.toggle('active');

        sections[currentIndex - 1].classList.toggle('hide');
        sections[currentIndex - 1].classList.toggle('animate');

        background.style.backgroundImage = `url(../portfolio/img/landing${currentIndex}.jpg)`;
        animateList(currentSlide);
    }else {
        sections[currentIndex - 1].classList.toggle('hide');
        sections[currentIndex - 1].classList.remove('animate');

        currentIndex--;
        currentSlide = document.getElementById(currentIndex);

        currentSlide.classList.toggle('active');
        sections[currentIndex - 1].classList.toggle('hide');
        sections[currentIndex - 1].classList.toggle('animate');

        background.style.backgroundImage = `url(../portfolio/img/landing${currentIndex}.jpg)`;
        animateList(currentSlide);
    }
};


const compare = (event) => {
    if(event.deltaY > 0) {
        goToNextSlide();
    }else if (event.deltaY < 0){
        goToPrevSlide();
    }
};

const handleSlides = debounce(compare, 200)

const changeSlidesById = e => {
    let currentSlide = document.getElementById(currentIndex);
    if (currentIndex != e.target.id && e.target.id == 1 || e.target.id == 2 || e.target.id == 3) {

        currentSlide.classList.toggle('active');

        sections[currentIndex - 1].classList.toggle('hide');
        sections[currentIndex - 1].classList.remove('animate');

        nextSlide = e.target;

        slides[currentIndex - 1].classList.add('hide');

        animateList(nextSlide, currentIndex);

        currentIndex = eval(nextSlide.id);
        sections[currentIndex - 1].classList.toggle('hide');
        sections[currentIndex - 1].classList.toggle('animate');
        background.style.backgroundImage = `url(../portfolio/img/landing${currentIndex}.jpg)`;

        nextSlide.classList.toggle('active');
    }
};

const animateList = (nextSlide) => {
    if (nextSlide.id == 1){
        counter.style.transform = `translateY(0px)`;
        slides[eval(nextSlide.id) - 1].classList.remove('hide');
    } else if(nextSlide.id == 2) {
        counter.style.transform = `translateY(-1em)`;
        slides[eval(nextSlide.id) - 1].classList.remove('hide');
    } else if (nextSlide.id == 3) {
        counter.style.transform = `translateY(-2.1em)`;
        slides[eval(nextSlide.id) - 1].classList.remove('hide');
    }
};


//Touch

let clientY;

const changeSlidesTouch = event => {
    let deltaY = event.changedTouches[0].clientY - clientY;
    debounce(handleTouch(-deltaY), 200);
};

const handleTouch = (deltaY) => {
    if(deltaY > 0) {
        goToNextSlide();
    }else if (deltaY < 0){
        goToPrevSlide();
    }
};
// Slider

let currentIndex = document.querySelector('.active').id;
let nextSlide;

const lines = document.querySelector('.scroll__lines');

const counter = document.querySelector('.counter--active');
const slides = document.querySelectorAll('.counter__number');

const work = document.getElementById('work');
const contact = document.getElementById('contact');
const main = document.getElementById('main');

const sections = [main, work, contact];

const background = document.querySelector('.body');

let allowScroll = !menu.className.includes('active');

const bindEventListeners = () => {
    if(allowScroll){
        allowChanges()
    } else {
        blockChanges()
    }
};

const blockChanges = () => {
    lines.removeEventListener('click', changeSlidesById);
    window.removeEventListener('wheel', handleSlides);
    window.removeEventListener('touchend', changeSlidesTouch);
};

const allowChanges = () => {
    if(allowScroll) {
        lines.addEventListener('click', changeSlidesById);

        window.addEventListener('wheel',  handleSlides);

        window.addEventListener('touchstart', (event) => {
            clientY = event.touches[0].clientY;
        });
        window.addEventListener('touchend', changeSlidesTouch);
    }
};

background.addEventListener('transitionstart', blockChanges);
background.addEventListener('transitionend', allowChanges);

bindEventListeners();