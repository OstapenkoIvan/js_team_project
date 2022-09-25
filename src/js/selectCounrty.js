let selectEl = document.querySelector('.select');
let selectHeader = document.querySelector('.select__header');
let selectBody = document.querySelector('.select__body');
let selectItem = document.querySelectorAll('.select__item');
let hiddenInput = document.querySelector('#country-search');

selectEl.addEventListener('click', function () {
  selectBody.classList.toggle('is-active');
  selectEl.classList.toggle('focusAlways');
  selectEl.focus();
});

selectEl.addEventListener('keyup', function (e) {
  if (e.key === 'Enter') {
    selectBody.classList.toggle('is-active');
    selectEl.classList.toggle('focusAlways');
    selectEl.focus();
  }
});

selectItem.forEach(function (listItem) {
  listItem.addEventListener('click', function (e) {
    e.stopPropagation();
    selectHeader.innerText = this.innerText;
    hiddenInput.focus();
    // console.log(this.dataset.value)
    hiddenInput.value = this.dataset.value;
    // console.log(hiddenInput.value)
    selectEl.classList.remove('focusAlways');
    selectBody.classList.remove('is-active');
    setTimeout(blurFromHiddenInputAferSelect, 0);

    if (document.querySelector('body').classList.contains('light-theme')) {
      selectHeader.style.color = '#dc56c5';
    } else {
      selectHeader.style.color = 'white';
    }
  });
});

selectItem.forEach(function (listItem) {
  listItem.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
      e.stopPropagation();
      selectHeader.innerText = this.innerText;
      hiddenInput.focus();
      // console.log(this.dataset.value)
      hiddenInput.value = this.dataset.value;
      // console.log(hiddenInput.value)
      selectEl.classList.remove('focusAlways');
      selectBody.classList.remove('is-active');
      setTimeout(blurFromHiddenInputAferSelect, 0);
      if (document.querySelector('body').classList.contains('light-theme')) {
        selectHeader.style.color = '#dc56c5';
      } else {
        selectHeader.style.color = 'white';
      }
    }
  });
});

function blurFromHiddenInputAferSelect() {
  hiddenInput.blur();
}

document.addEventListener('click', function (e) {
  if (e.target !== selectHeader) {
    selectBody.classList.remove('is-active');
    selectEl.classList.remove('focusAlways');
  }
});
