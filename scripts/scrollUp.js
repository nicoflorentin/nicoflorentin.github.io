const scrollUpButton = document.querySelector('.scrollUpButton')

scrollUpButton.style.display = "none";
window.onscroll = function () {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        scrollUpButton.style.display = "inherit";
    } else {
        scrollUpButton.style.display = "none";
    }
};

scrollUpButton.onclick = function () {
    window.scrollTo({top: 0, behavior: 'smooth'});
};

scrollUpButton.addEventListener('mouseover', () => {
    
});