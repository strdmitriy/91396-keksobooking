'use strict';
(function () {

  var noticeForm = document.querySelector('.notice__form');
  var formTime = noticeForm.querySelector('#time');
  var formTimeout = noticeForm.querySelector('#timeout');
  var formType = noticeForm.querySelector('#type');
  var formRoomNumber = noticeForm.querySelector('#room_number');
  var formCapacity = noticeForm.querySelector('#capacity');
  var formPrice = noticeForm.querySelector('#price');
  var formTitle = noticeForm.querySelector('#title');
  var formAddress = noticeForm.querySelector('#address');
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');

  var onPinKeyDown = function (e) {
    if (window.utils.isActivate(e)) {
      var currentPin = e.target;
      window.initializePins.showPin(function () {
        window.initializePins.deleteClass();
        currentPin.classList.add('pin--active');

        window.showCard(function () {
          window.initializePins.deleteClass();
          currentPin.focus();
        });
      });
    }
  };
  var activatePin = function (e) {
    var closest = window.utils.getClosestElement(e.target, 'pin', 'tokyo__pin-map');
    window.showCard(function () {
      window.initializePins.deleteClass();
    });

    if (closest) {
      window.initializePins.showPin(function () {
        window.initializePins.deleteClass();
        closest.classList.add('pin--active');
      });
    }
  };

  tokyoPinMap.addEventListener('keydown', onPinKeyDown);
  tokyoPinMap.addEventListener('click', activatePin);

  window.synchronizeFields(formTime, formTimeout, ['12', '13', '14'], ['12', '13', '14'], 'value', function (val) {
    formTimeout.value = val;
  });
  window.synchronizeFields(formTimeout, formTime, ['12', '13', '14'], ['12', '13', '14'], 'value', function (val) {
    formTime.value = val;
  });
  window.synchronizeFields(formType, formPrice, ['1000', '0', '10000'], ['1000', '0', '10000'], 'min', function (val) {
    formPrice.min = val;
  });
  window.synchronizeFields(formRoomNumber, formCapacity, ['1', '2', '100'], ['0', '3', '3'], 'value', function (val) {
    formCapacity.value = val;
  });
  window.synchronizeFields(formCapacity, formRoomNumber, ['0', '3', '3'], ['1', '2', '100'], 'value', function (val) {
    formRoomNumber.value = val;
  });
  formTitle.required = true;
  formTitle.minLength = 30;
  formTitle.maxLength = 100;

  formPrice.required = true;
  formPrice.type = 'number';
  formPrice.min = 1000;
  formPrice.max = 1000000;
  formAddress.required = true;

  window.initializePins.deleteClass();
})();
