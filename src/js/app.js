
const btnThemes = document.querySelectorAll('.btn-theme');
const btnNavToggle = document.querySelector('.btn-nav-toggle');
const mobileNavbar = document.querySelector('.m-nav-bar');
let navTimeline = gsap.timeline({defaults: {ease: 'circ.out' }});
btnNavToggle.addEventListener('click', toggleNav);

window.addEventListener('load', function() {
    getThemeMode();
    
    setTimeout(() =>  {
        loaded();
        animateHeroContent();
    }, 1000);
});

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
            value: 'Full Stack Developer',
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
    mobileNavbar.classList.toggle('show-nav-toggle');
    let showToggle = mobileNavbar.classList.contains('show-nav-toggle');
    let icon = showToggle ? 'xmark' : 'bars';
    
    if(showToggle) {
        if(navTimeline.reversed()) {
            navTimeline.play();
        } else {
            navTimeline
                .from('.m-nav-bar', { duration: 0.3, x: -100, opacity: 0 })
                .to('.m-nav-bar', { duration: 0.3, x: 0, opacity: 1 })
                .from('#nav-item', { duration: 0.3, y: -100, opacity: 0, stagger: 0.5 })
                .to('#nav-item', { duration: 0.3, y: 0, opacity: 1 });
        }
    } else {
        navTimeline.reverse();
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