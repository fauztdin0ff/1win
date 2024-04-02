//-----------------БУРГЕР МЕНЮ---------------------------
let iconMenu = document.querySelector('.menu__icon');
let menuBody = document.querySelector('.menu__body');
let closeMenu = document.querySelector('.close-menu-icon'); // добавляем переменную для кнопки закрытия меню

if (iconMenu) {
   iconMenu.addEventListener("click", function (e) {
      e.preventDefault();
      document.body.classList.toggle('_lock');
      iconMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');
   });
}

if (closeMenu) { // проверяем, существует ли кнопка closeMenu
   closeMenu.addEventListener("click", function (e) {
      e.preventDefault();
      document.body.classList.remove('_lock');
      iconMenu.classList.remove('_active');
      menuBody.classList.remove('_active');
   });
}

document.addEventListener('click', (event) => {
   if (!event.target.closest('.menu__body') && !event.target.closest('.menu__icon')) {
      document.body.classList.remove('_lock');
      iconMenu.classList.remove('_active');
      menuBody.classList.remove('_active');
   }
});

/*-----------------------------------------------------------------------------------------*/
window.addEventListener('DOMContentLoaded', function () {
   const headerSocials = document.querySelector('.header__socials');
   const headerAccount = document.querySelector('.header__account');
   const menuBody = document.querySelector('.menu__body');

   function moveElementsToMenu() {
      if (window.innerWidth < 1000) {
         if (headerSocials && menuBody) {
            menuBody.appendChild(headerSocials);
         }
      } else {
         const headerButtons = document.querySelector('.header__buttons');
         if (headerButtons) {
            headerButtons.insertBefore(headerSocials, headerButtons.firstChild);
         }
      }

      if (window.innerWidth < 600) {
         if (headerAccount && menuBody) {
            menuBody.appendChild(headerAccount);
         }
      } else {
         const headerButtons = document.querySelector('.header__buttons');
         if (headerButtons) {
            headerButtons.insertBefore(headerAccount, headerButtons.firstChild);
         }
      }
   }

   // Проверка при загрузке страницы
   moveElementsToMenu();

});


/*-----------------------------------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   // Получаем кнопки и попап
   var openButtons = document.querySelectorAll('.open-login-popup');
   var loginPopup = document.querySelector('.login-popup');

   // Добавляем обработчик для каждой кнопки
   openButtons.forEach(function (button) {
      button.addEventListener('click', function (event) {
         event.stopPropagation(); // Остановка всплытия события, чтобы не сработал обработчик клика на document
         if (loginPopup.style.display === 'block') {
            // Если попап уже открыт, закрываем его
            loginPopup.style.display = 'none';
            document.body.classList.remove('popup');
         } else {
            // Иначе открываем его
            loginPopup.style.display = 'block';
            document.body.classList.add('popup');
         }
      });
   });

   // Добавляем обработчик для закрытия попапа при клике вне попапа
   document.addEventListener('click', function (event) {
      if (!loginPopup.contains(event.target) && !openButtons[0].contains(event.target)) {
         // Скрываем попап
         loginPopup.style.display = 'none';
         // Удаляем класс "popup" из body
         document.body.classList.remove('popup');
      }
   });

   // Добавляем обработчик для закрытия попапа при клике на .close-login-popup
   var closePopup = document.querySelector('.close-login-popup');
   if (closePopup) {
      closePopup.addEventListener('click', function () {
         // Скрываем попап
         loginPopup.style.display = 'none';
         // Удаляем класс "popup" из body
         document.body.classList.remove('popup');
      });
   }
});


/*-----------------------------------------------------------------------------------------*/
var accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(function (item) {
   item.addEventListener('click', function () {
      this.classList.toggle('active');
   });
});

/*-----------------------------------------------------------------------------------------*/
const revShareButton = document.querySelector('.revShare-info-btn');
const revShareText = document.querySelector('.revShare-info-text');

revShareButton.addEventListener('mouseover', function () {
   revShareText.classList.add('show');
});

revShareButton.addEventListener('mouseout', function () {
   revShareText.classList.remove('show');
});


const cpaButton = document.querySelector('.cpa-info-btn');
const cpaText = document.querySelector('.cpa-info-text');

cpaButton.addEventListener('mouseover', function () {
   cpaText.classList.add('show');
});

cpaButton.addEventListener('mouseout', function () {
   cpaText.classList.remove('show');
});

const trafficButton = document.querySelector('.traffic-info-btn');
const trafficText = document.querySelector('.traffic-info-text');

trafficButton.addEventListener('mouseover', function () {
   trafficText.classList.add('show');
});

trafficButton.addEventListener('mouseout', function () {
   trafficText.classList.remove('show');
});

/*-----------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", function () {
   const customRadios = document.querySelectorAll('.custom-radio input[type="radio"]');

   customRadios.forEach(function (radio) {
      radio.addEventListener('change', function () {
         customRadios.forEach(function (otherRadio) {
            const parent = otherRadio.closest('.custom-radio');
            if (otherRadio !== radio) {
               parent.classList.remove('active');
            }
         });

         if (radio.checked) {
            const parent = radio.closest('.custom-radio');
            parent.classList.add('active');
         }
      });
   });
});


// Dropdown list

document.addEventListener('DOMContentLoaded', function () {

   if (window.NodeList && !NodeList.prototype.forEach) {
      NodeList.prototype.forEach = function (callback, thisArg) {
         thisArg = thisArg || window;
         for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
         }
      };
   }

   document.querySelectorAll('.s-dropdown').forEach(function (dropDownWrapper) {
      const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
      const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
      const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
      const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');

      dropDownBtn.addEventListener('click', function (e) {
         dropDownList.classList.toggle('dropdown__list--visible');
         this.classList.toggle('dropdown__button--active');
      });

      dropDownListItems.forEach(function (listItem) {
         listItem.addEventListener('click', function (e) {
            e.stopPropagation();
            const countryCode = this.querySelector('span').innerText;
            const countryFlagSrc = this.querySelector('img').getAttribute('src');
            dropDownBtn.innerHTML = `<img src="${countryFlagSrc}" alt="Country Flag"> ${countryCode}`;
            dropDownBtn.focus();
            dropDownInput.value = this.dataset.value;
            dropDownList.classList.remove('dropdown__list--visible');
         });
      });

      document.addEventListener('click', function (e) {
         const isDropdownClick = dropDownWrapper.contains(e.target);
         const isDropdownListClick = dropDownList.contains(e.target);
         if (!isDropdownClick && !isDropdownListClick) {
            dropDownBtn.classList.remove('dropdown__button--active');
            dropDownList.classList.remove('dropdown__list--visible');
         }
      });

      document.addEventListener('keydown', function (e) {
         if (e.key === 'Tab' || e.key === 'Escape') {
            dropDownBtn.classList.remove('dropdown__button--active');
            dropDownList.classList.remove('dropdown__list--visible');
         }
      });
   });

});
