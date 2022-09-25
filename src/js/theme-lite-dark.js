const btn = document.querySelector('.change-theme-button');
const body = document.querySelector('body');
const iconLight = document.querySelector('.light-theme-icon');
const iconDark = document.querySelector('.dark-theme-icon');

btn.addEventListener('click', onClickChangeTheme);

if (localStorage.getItem('theme') === 'dark-theme') {
  body.classList.add('dark-theme');
  iconDark.classList.add('hide');
  iconLight.classList.remove('hide');
}

if (localStorage.getItem('theme') === 'light-theme') {
  body.classList.add('light-theme');
  iconLight.classList.add('hide');
  iconDark.classList.remove('hide');
}

function onClickChangeTheme(ev) {
  ev.preventDefault();

  if (body.classList.contains('dark-theme')) {
    body.classList.remove('dark-theme');

    body.classList.add('light-theme');
    localStorage.setItem('theme', 'light-theme');
    iconLight.classList.add('hide');
    iconDark.classList.remove('hide');
  } else {
    body.classList.remove('light-theme');

    body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark-theme');
    iconDark.classList.add('hide');
    iconLight.classList.remove('hide');
  }
}
