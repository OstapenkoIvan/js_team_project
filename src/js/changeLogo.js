const usePathToCahnge = document.querySelector('use');
const logoIconSizeToChange = document.querySelector('.logo__icon');

function checkForWindowResize() {
    if (window.matchMedia("screen and (min-width: 768px) and (max-width: 1279px)").matches) {
        usePathToCahnge.setAttribute('href', '/symbol-defs.a8b2e413.svg#logo-tab')
        logoIconSizeToChange.setAttribute('width', '110');
        logoIconSizeToChange.setAttribute('height', '29');
    }else if (window.matchMedia("screen and (min-width: 1280px)").matches) {
        usePathToCahnge.setAttribute('href', '/symbol-defs.a8b2e413.svg#logo-desc')
        logoIconSizeToChange.setAttribute('width', '136');
        logoIconSizeToChange.setAttribute('height', '70');
    } else {
        usePathToCahnge.setAttribute('href', '/symbol-defs.a8b2e413.svg#logo-mob')
        logoIconSizeToChange.setAttribute('width', '60');
        logoIconSizeToChange.setAttribute('height', '25');
    }
};

window.addEventListener('resize', checkForWindowResize);
window.addEventListener('load', checkForWindowResize);

