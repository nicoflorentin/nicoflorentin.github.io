const aboutMeSection = document.querySelector('#aboutMe');
const skillsSection = document.querySelector('.skillsSection');
const fadeIn_left = document.querySelector('.fadeIn_left')
const fadeIn_right = document.querySelector('.fadeIn_right')

fadeIn_left.style.transform = 'translatex(-100px) translatey(100px)';
fadeIn_left.style.opacity = '0';
fadeIn_right.style.transform = 'translatex(100px) translatey(-100px)';
fadeIn_right.style.opacity = '0';

const diagonalAnimate = (el_left, el_right) => {

    console.log('animate!')
    anime({
        targets: [el_left, el_right],
        opacity: 1,
        translateX: 0,
        translateY: 0,
        easing: 'easeInOutQuad',
        duration: 300
    })
}

// Intersection Observer API
var aboutme_observer = new IntersectionObserver(function(entries) {
    if(entries[0].isIntersecting === true) {
        diagonalAnimate(fadeIn_left, fadeIn_right);
    } 
}, { threshold: [0.7] });
aboutme_observer.observe(aboutMeSection);

var skills_observer = new IntersectionObserver(function(entries) {
    if(entries[0].isIntersecting === true) {
        diagonalAnimate(fadeIn_left, fadeIn_right);
    } 
}, { threshold: [0.7] });
skills_observer.observe(skillsSection);


