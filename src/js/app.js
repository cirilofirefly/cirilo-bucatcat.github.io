
const btnTheme = document.getElementById('btnTheme');
btnTheme.addEventListener('click', toggleTheme);

window.addEventListener('load', function() {
    getThemeMode();
    setTimeout(() => loaded(), 1000);
});

function loaded() {
    let loader = document.querySelector('.loader');
    loader.classList.add('loaded');
}

function getThemeMode() {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        btnTheme.innerHTML += getThemeIcon('moon');
    } else {
        document.documentElement.classList.remove('dark');
        btnTheme.innerHTML += getThemeIcon('sun');
    }
}

function toggleTheme() {
    btnTheme.innerHTML = '';
    let isDarkMode = localStorage.theme == 'dark'
    if(isDarkMode) {
        localStorage.setItem('theme', 'light');
        btnTheme.innerHTML += getThemeIcon('sun');
        document.documentElement.classList.remove('dark');
    } else {
        localStorage.setItem('theme', 'dark');
        btnTheme.innerHTML += getThemeIcon('moon');
        document.documentElement.classList.add('dark');
    }
}

function getThemeIcon(icon) {
    return '<i class="fas fa-' + icon + '"></i>';
}