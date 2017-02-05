'use strict';

var pins = document.querySelectorAll('.pin');
var dialog = document.querySelector('.dialog');
var dialogClose = document.querySelector('.dialog__close');
var noticeForm = document.querySelector('.notice__form');

// Функция проверки и удаления класса

var pinDelete = function () {
  var pinActive = document.querySelector('.pin--active');
  if (pinActive) {
    pinActive.classList.remove('pin--active');
  }
};

// Добавляем класс

var pinAdd = function (pin) {
  pinDelete();
  pin.classList.add('pin--active');
  dialog.style.display = 'block';
};

// Добавляем действие по клику

for (var i = 0; i < pins.length; i++) {
  pins[i].addEventListener('click', function (e) {
    pinAdd(e.currentTarget);
  });
}

var closeDialog = function () {
  dialog.style.display = 'none';
  pinDelete();
};

dialogClose.addEventListener('click', closeDialog);

// Проверяем время заезда и выезда

var formTime = noticeForm.querySelector('#time');
var formTimeout = noticeForm.querySelector('#timeout');

formTime.addEventListener('change', function () {
  formTimeout.selectedIndex = formTime.selectedIndex;
});

formTimeout.addEventListener('change', function () {
  formTime.selectedIndex = formTimeout.selectedIndex;
});


// проверяем стоимость за номер


var formType = noticeForm.querySelector('#type');
var formRoomNumber = noticeForm.querySelector('#room_number');
var formCapacity = noticeForm.querySelector('#capacity');
var formPrice = noticeForm.querySelector('#price');

formType.addEventListener('change', function () {
  typeRooms();
});

var typeRooms = function () {
  var priceRoomsHotel = formType.selectedIndex;
  switch (priceRoomsHotel) {
    case 0:
      formPrice.min = 1000;
      break;
    case 1:
      formPrice.min = 0;
      break;
    case 2:
      formPrice.min = 10000;
      break;
  }
};


// Задаем начальные значения и проверяем кол-во гостей в номере

formCapacity.value = '0';

var roomNumber = function () {
  if (formRoomNumber.value === '1') {
    formCapacity.value = '0';
  } else if (formRoomNumber.value === '2' || formRoomNumber.value === '100') {
    formCapacity.value = '3';
  }
};

var roomCapicity = function () {
  if (formCapacity.value === '0') {
    formRoomNumber.value = '1';
  } else if (formCapacity.value === '3') {
    formRoomNumber.value = '100';
  }
};


formRoomNumber.addEventListener('change', roomNumber);
formCapacity.addEventListener('change', roomCapicity);

var formTitle = noticeForm.querySelector('#title');
var formAddress = noticeForm.querySelector('#address');

formTitle.required = true;
formTitle.minLength = 30;
formTitle.maxLength = 100;

formPrice.required = true;
formPrice.type = 'number';
formPrice.min = 1000;
formPrice.max = 1000000;
formAddress.required = true;
