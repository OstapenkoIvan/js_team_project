const usePathToCahnge = document.querySelector('use');
const logoIconSizeToChange = document.querySelector('.logo__icon');
import symbolDefs from '../images/symbol-defs.svg';

function checkForWindowResize() {
  if (
    window.matchMedia('screen and (min-width: 768px) and (max-width: 1279px)')
      .matches
  ) {
    usePathToCahnge.setAttribute('href', `${symbolDefs}#logo-tab`);
    logoIconSizeToChange.setAttribute('width', '110');
    logoIconSizeToChange.setAttribute('height', '29');
  } else if (window.matchMedia('screen and (min-width: 1280px)').matches) {
    usePathToCahnge.setAttribute('href', `${symbolDefs}#logo-desc`);
    logoIconSizeToChange.setAttribute('width', '136');
    logoIconSizeToChange.setAttribute('height', '70');
  } else {
    usePathToCahnge.setAttribute('href', `${symbolDefs}#logo-mob`);
    logoIconSizeToChange.setAttribute('width', '60');
    logoIconSizeToChange.setAttribute('height', '25');
  }
}

window.addEventListener('resize', checkForWindowResize);
window.addEventListener('load', checkForWindowResize);
