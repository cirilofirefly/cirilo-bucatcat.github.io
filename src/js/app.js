
const btnThemes = document.querySelectorAll('.btn-theme');
const btnNavToggle = document.querySelector('.btn-nav-toggle');
const mobileNavbar = document.querySelector('.m-nav-bar');
btnNavToggle.addEventListener('click', toggleNav);


window.addEventListener('load', function() {
    getThemeMode();
    setTimeout(() => loaded(), 1000);
});

function toggleNav() {
    mobileNavbar.classList.toggle('show-nav-toggle');

    let showToggle = mobileNavbar.classList.contains('show-nav-toggle');
    btnNavToggle.innerHTML = '';
    
    if(showToggle) {
        btnNavToggle.innerHTML += getToggleIcon('xmark');
    } else {
        mobileNavbar.classList.remove('show-nav-toggle');
        btnNavToggle.innerHTML += getToggleIcon('bars');
    }

    btnNavToggle.classList.add('animate-theme-spin');
    setTimeout(() => btnNavToggle.classList.remove('animate-theme-spin'), 1000);
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