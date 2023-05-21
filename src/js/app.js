
const btnThemes = document.querySelectorAll('.btn-theme');
const btnNavToggle = document.querySelector('.btn-nav-toggle');
const mobileNavbar = document.querySelector('.m-nav-bar');
let navTimeline = gsap.timeline({ease: 'Slowmo.easeOut', duration: 1});

btnNavToggle.addEventListener('click', toggleNav);

window.addEventListener('load', function() {
    getThemeMode();
    setTimeout(() => loaded(), 1000);
});

window.addEventListener('scroll', throttle(function() { stickyNav(); }, 1000));

function stickyNav() {
    let navbar = document.querySelector('.nav-bar');
    navbar.classList.toggle('nav-sticky', window.scrollY > 0);
}

function toTopPage() {
    window.scrollTo(0, 0);
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
                .from('.m-nav-bar', { x: -100, opacity: 0 })
                .to('.m-nav-bar', { x: 0, opacity: 1 })
                .from('#nav-item', { y: -100, opacity: 0, stagger: 0.5 })
                .to('#nav-item', { y: 0, opacity: 1 });
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