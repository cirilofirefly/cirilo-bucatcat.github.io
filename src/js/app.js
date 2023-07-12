const mobileNavBtn = document.getElementById('m-nav-btn');
const mobileNav = document.getElementById('m-nav');
const brand = document.getElementById('brand');
const popupVideo = document.getElementById('popup-video');
const projectVideos = document.querySelectorAll('#project-video');
const closePopUpVideo = document.querySelector('#close-popup-video');
const contactForm = document.getElementById('contactForm');
const successAlert = document.getElementById('success-alert');

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

const sendEmail = (templateParams) => {
    return emailjs.send('service_xdygofk','template_egm8gwj', templateParams, 'tlrutdeEOohZQl8YI')
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

contactForm.addEventListener('submit', (e) => {

    e.preventDefault();

    let name = getElementValue('name');
    let email = getElementValue('email');
    let subject = getElementValue('subject');
    let message = getElementValue('message');
    let templateParams = { to_name: 'Cirilo Bucatcat Jr.', name, email, subject, message }

    sendEmail(templateParams) 
        .then((response) => {
            successAlert.classList.replace('hidden', 'block')
            Object.keys(templateParams).forEach((key) => {
                clearElementValue(key)
            })
            setTimeout(() => {

                successAlert.classList.replace('block', 'hidden')
            }, 3000)
        }, (error) => {
            console.log('FAILED...', error);
        });
})

function clearElementValue(id) {
    if(document.getElementById(id)) document.getElementById(id).value = ''
}

function getElementValue(id) {
    return document.getElementById(id).value ?? ''
}