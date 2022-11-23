'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');

/////////////////////////////////////////////////////////////////////////

// Modal window

const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//     btnsOpenModal[i].addEventListener('click', openModal);
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

/////////////////////////////////////////////////////////////////////////

// Scroll to section 1
btnScrollTo.addEventListener('click', function (e) {
    section1.scrollIntoView({ behavior: 'smooth' });
});

/////////////////////////////////////////////////////////////////////////

// Page navigation

// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
    e.preventDefault();
    // Matching strategy
    if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
});

/////////////////////////////////////////////////////////////////////////

// Building a tabbed component
tabsContainer.addEventListener('click', function (e) {
    const clicked = e.target.closest('.operations__tab');

    // Guard clause
    if (!clicked) return;

    // Remove active classes
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    tabsContent.forEach(c => c.classList.remove('operations__content--active'));

    // Active tab
    clicked.classList.add('operations__tab--active');
    // Activate content area
    document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add('operations__content--active');
});

/////////////////////////////////////////////////////////////////////////

// Menu fade animation
const handleHover = function (e /*, opacity*/) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img'); // If there is multiple image

        siblings.forEach(el => {
            if (el !== link) el.style.opacity = this /*opacity*/;
        });
        logo.style.opacity = this /*opacity*/;
    }
};

// nav.addEventListener('mouseover', function (e) {
//     handleHover(e, 0.5);
// });
// passing "arguments into handler"
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

/////////////////////////////////////////////////////////////////////////
