const mobileNavBtn = document.getElementById('m-nav-btn');
const mobileNav = document.getElementById('m-nav');
const brand = document.getElementById('brand');
const popupVideo = document.getElementById('popup-video');
const projectVideos = document.querySelectorAll('#project-video');
const closePopUpVideo = document.querySelector('#close-popup-video');

const transformHamburger = (isToggled) => {
    const currentColor = isToggled ? 'bg-primary' : 'bg-quaternary';
    const newColor = isToggled ? 'bg-quaternary' : 'bg-primary';
    const hamburgerLines = document.querySelectorAll('#m-nav-btn div');
    brand.classList.replace(isToggled ? 'text-primary' : 'text-quaternary', isToggled ? 'text-quaternary' : 'text-primary')
    mobileNavBtn.classList.toggle('toggle');
    hamburgerLines.forEach((hamburgerLine) => {
        hamburgerLine.classList.replace(currentColor, newColor)
    });
}

mobileNavBtn.addEventListener('click', function() {
    mobileNav.classList.toggle('toggle-nav');
    transformHamburger(mobileNav.classList.contains('toggle-nav'));
});


projectVideos.forEach((projectVideo) => {
    projectVideo.addEventListener('click', () => {
        let popupVideo = document.getElementById('popup-video');
        popupVideo.classList.replace('hidden', 'flex');
        let projectVideoSource = projectVideo.getAttribute('src');
        document.querySelector('#popup-video video').src = projectVideoSource.split('#')[0] ?? projectVideoSource;
    })
});

closePopUpVideo.addEventListener('click', () => {
    popupVideo.classList.replace('flex', 'hidden');
})







