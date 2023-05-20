
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
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark');
    }
}