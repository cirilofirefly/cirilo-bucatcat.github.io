
const btnThemes = document.querySelectorAll('.btn-theme');
const btnNavToggle = document.querySelector('.btn-nav-toggle');
const mobileNavbar = document.querySelector('.m-nav-bar');
const contactForm = document.getElementById('contact-form');

gsap.from('#tas-content', { x: 500, opacity: 0, duration: 1 })
gsap.to('#tas-content', {
    scrollTrigger: {
        trigger: '#tas-content',
        end: '100px',
        toggleActions: 'play none none none'
    },
    x: 0,
    opacity: 1,
    duration: 1
})
gsap.from('#tas-description', { x: '-100', opacity: 0, duration: 1 });
gsap.to('#tas-description', {
    scrollTrigger: {
        trigger: '#tas-description',
        end: '100px',
        toggleActions: 'play none none none'
    },
    x: 0,
    opacity: 1,
    duration: 1
})

let navTimeline = gsap.timeline({defaults: {ease: 'circ.out' }});

btnNavToggle.addEventListener('click', toggleNav);
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    sendEmail();
});

window.addEventListener('load', function() {
    getThemeMode();
    setTimeout(() =>  {
        loaded();
        animateHeroContent();
    }, 1000);
});

function sendEmail() {
    let templateParams = {
        to_name: 'Cirilo Bucatcat Jr.',
        from_name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    }

    emailjs.send('service_mv72n9a', 'template_9b91lja', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('FAILED...', error);
        });
}

function animateIAMText() {
    let timeline = gsap.timeline({defaults: {ease: 'power2' }});
    timeline.to('.iam', {
        text: {
            duration: 5,
            delay: 2,
            value: 'human',
            delimiter: ''
        }
    });


    timeline.to('.iam', {
        text: {
            duration: 5,
            delay: 2,
            value: 'gamer',
            delimiter: ''
        }
    })

    timeline.to('.iam', {
        text: {
            duration: 5,
            delay: 2,
            value: 'food enthusiast',
            delimiter: ''
        }
    })

    timeline.to('#iam', {
        text: {
            duration: 5,
            delay: 2,
            value: 'an',
            delimiter: ''
        }
    })

    
    timeline.to('.iam', {
        text: {
            duration: 5,
            delay: 2,
            value: 'anime & music lover',
            delimiter: ''
        }
    })

    timeline.to('#iam', {
        text: {
            duration: 5,
            delay: 2,
            value: 'a',
            delimiter: ''
        }
    })

    timeline.to('.iam', {
        text: {
            duration: 5,
            delay: 2,
            value: 'Web Developer',
            delimiter: ''
        }
    })
}
        
function animateHeroContent() {
    let timeline = gsap.timeline({ defaults: { ease: 'Slowmo.easeInOut', duration: 0.3 }})

    timeline
        .from('#hero-name', { y: 100, opacity: 0 })
        .to('#hero-name', { y: 0, opacity: 1 })
        .from('#hero-iam', { y: 100, opacity: 0 })
        .to('#hero-iam', { y: 0, opacity: 1 })
        .from('#hero-download', { y: 100, opacity: 0 })
        .to('#hero-download', { y: 0, opacity: 1 });
    
    setTimeout(() => animateIAMText(), 2000)
} 

window.addEventListener('scroll', throttle(function() { stickyNav(); }, 1000));

function stickyNav() {
    let navbar = document.querySelector('.nav-bar');
    navbar.classList.toggle('nav-sticky', window.scrollY > 0);
}

function toTopPage() {
    window.scrollTo(0, 0);
    stickyNav();
}

function toggleNav() {

    let hasToggle = mobileNavbar.classList.contains('show-nav-toggle');
    let icon = '';
    if(hasToggle) {

        navTimeline.reverse();
        icon = 'bars';
        setTimeout(() => mobileNavbar.classList.remove('show-nav-toggle'), 3000)

    } else {

        mobileNavbar.classList.add('show-nav-toggle');
        
        if(navTimeline.reversed()) {
            icon = 'xmark';
            navTimeline.play();
        } else {
            icon = 'xmark';
            navTimeline
                .from('.m-nav-bar', { duration: 0.3, x: -100, opacity: 0 })
                .to('.m-nav-bar', { duration: 0.3, x: 0, opacity: 1 })
                .from('#nav-item', { duration: 0.3, y: -100, opacity: 0, stagger: 0.5 })
                .to('#nav-item', { duration: 0.3, y: 0, opacity: 1 });
        }
    }

    btnNavToggle.innerHTML = getToggleIcon(icon);
    btnNavToggle.classList.add('animate-theme-spin');
    setTimeout(() => {
        btnNavToggle.classList.remove('animate-theme-spin'); 
    }, 1000);
}

function loaded() {
    let loader = document.querySelector('.loader');
    loader.classList.add('loaded');
}

function getThemeMode() {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        btnThemes.forEach((btn) => {
            btn.innerHTML = '';
            btn.innerHTML += getThemeIcon('moon');
        })         
    } else {
        document.documentElement.classList.remove('dark');
        btnThemes.forEach((btn) => {
            btn.innerHTML = '';
            btn.innerHTML += getThemeIcon('sun');
        })    
    }
}

function toggleTheme() {
    let isDarkMode = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    let icon = isDarkMode ? 'sun' : 'moon';
    if(isDarkMode) {
        localStorage.setItem('theme', 'light');
        document.documentElement.classList.remove('dark');
    } else {
        localStorage.setItem('theme', 'dark');
        document.documentElement.classList.add('dark');
    }
    btnThemes.forEach((btn) => {
        btn.innerHTML = '';
        btn.innerHTML += getThemeIcon(icon);
    })
}

function getThemeIcon(icon) {
    return '<i class="theme-icon fas fa-' + icon + '"></i>';
}

function getToggleIcon(icon) {
    return '<i class="fas fa-' + icon + '"></i>';
}

function throttle(cb, delay) {
    let wait = false;

    return (...args) => {
        if (wait) {
            return;
        }

        cb(...args);
        wait = true;
        setTimeout(() => {
            wait = false;
        }, delay);
    }
}