// let select = function () {
//     let selectHeader = document.querySelectorAll('.select__header');
//     let selectItem = document.querySelectorAll('.select__item');

//     selectHeader.forEach(item => {
//         item.addEventListener('click', selectToggle)
//     })
    
//     selectItem.forEach(item => {
//         item.addEventListener('click', selectChoose)
//     })

//     function selectToggle() {
//         this.parentElement.classList.toggle('is-active')
//     }

//     function selectChoose() {
//         let text = this.innerText,
//             select = this.closest('.select'),
//             currentText = select.querySelector('.select__current');
//         currentText.innerText = text;
//         select.classList.remove('is-active');
//     }
// };

// select();
let selectEl = document.querySelector('.select')
let selectHeader = document.querySelector('.select__header');
let selectBody = document.querySelector('.select__body');
let selectItem = document.querySelectorAll('.select__item');
let hiddenInput = document.querySelector('#country-search')

selectEl.addEventListener('click', function () {
    selectBody.classList.toggle('is-active');
    selectEl.classList.toggle('focusAlways');  
})

selectItem.forEach(function (listItem) {
    listItem.addEventListener('click', function (e) {
        e.stopPropagation();
        selectHeader.innerText = this.innerText;
        hiddenInput.focus();
              
        // console.log(this.dataset.value)
        hiddenInput.value = this.dataset.value
        // console.log(hiddenInput.value)
        selectBody.classList.remove('is-active');
        setTimeout(blurFromHiddenInputAferSelect, 0)

    })
})

function blurFromHiddenInputAferSelect() {
  hiddenInput.blur();
}

document.addEventListener('click', function (e) {
    if (e.target !== selectHeader) {
        selectBody.classList.remove('is-active')
    }
})
