"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

document.addEventListener("DOMContentLoaded", function () {
  // --------------- Mobile menu ---------------
  var burger = document.querySelector('.header__burger');
  var menu = document.querySelector('.mobile-menu');
  var close = document.querySelector('.mobile-menu__close');
  burger.addEventListener("click", function () {
    menu.classList.add('active');
    document.body.classList.add("no-scroll");
  });
  close.addEventListener("click", function () {
    menu.classList.remove('active');
    document.body.classList.remove("no-scroll");
  }); // --------------- Mobile menu / выпадающий список ---------------
  // Выбор опций/сортировка

  var handleOption = function handleOption(el) {
    el = el.target; // открытие списков

    if (el.closest(".linkHasChild")) {
      document.querySelectorAll(".linkHasChild").forEach(function (el) {
        el.classList.remove("active");
      });
      el.closest(".linkHasChild").classList.add("active");
    }
  };

  document.addEventListener("click", handleOption); // --------------- Выбор города ---------------

  var filter = document.querySelector('.contacts__filter');
  var overlay = document.querySelector('.contacts__overlay');
  var contactsMobile = document.querySelectorAll('.contacts__head');
  var filterTabs = document.querySelectorAll('.tabs__nav-item');
  contactsMobile.forEach(function (tab) {
    tab.addEventListener("click", function () {
      filter.classList.add('visible-filter');
      overlay.classList.add('visible-filter');
      document.body.classList.add("no-scroll");
    });
  });
  filterTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      filter.classList.remove('visible-filter');
      overlay.classList.remove('visible-filter');
      document.body.classList.remove("no-scroll");
    });
  }); // --------------- Mobile menu / Выбор города ---------------

  var locationBtn = document.querySelector('.location__button');
  var locationOverlay = document.querySelector('.location__overlay');
  var locationMobileBtn = document.querySelector('.mobile-menu__button');
  var locationModal = document.querySelector('.location__modal');
  var locationItems = document.querySelectorAll('.location__modal-item');
  locationBtn.addEventListener("click", function () {
    locationModal.classList.toggle('visible-location');
  });
  locationMobileBtn.addEventListener("click", function () {
    locationModal.classList.toggle('visible-location');
    locationOverlay.classList.toggle('visible-location-overlay');
  });
  locationItems.forEach(function (item) {
    item.addEventListener('click', function () {
      locationBtn.innerHTML = item.innerHTML;
      locationMobileBtn.innerHTML = item.innerHTML;
      locationModal.classList.remove('visible-location');
      locationOverlay.classList.remove('visible-location-overlay');
    });
  }); // --------------- Маска ввода номера телефона ---------------

  var phoneInputs = document.querySelectorAll("input[data-tel-input]");

  var getInputsNumbersValue = function getInputsNumbersValue(input) {
    return input.value.replace(/\D/g, "");
  }; // Обработка ввода


  var onPhoneInput = function onPhoneInput(e) {
    var input = e.target;
    var inputNumbersValue = getInputsNumbersValue(input);
    var formattedInputValue = "";
    var selectionStart = input.selectionStart;

    if (!inputNumbersValue) {
      return input.value = "";
    }

    if (input.value.length !== selectionStart) {
      if (e.data && /\D/g.test(e.data)) {
        input.value = inputNumbersValue;
      }

      return;
    }

    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
      // Российский номер
      if (inputNumbersValue[0] === "9") {
        inputNumbersValue = "7" + inputNumbersValue;
      }

      var firstSymbols = inputNumbersValue[0] === "8" ? "8" : "+7";
      formattedInputValue = firstSymbols + " "; //Форматирование

      if (inputNumbersValue.length > 1) {
        formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
      }

      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
      }

      if (inputNumbersValue.length >= 8) {
        formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
      }

      if (inputNumbersValue.length >= 10) {
        formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
      }
    } else {
      // Не российский номер
      formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
    }

    input.value = formattedInputValue;
  }; //  Удаление первой цифры


  var onPhoneKeyDown = function onPhoneKeyDown(e) {
    var input = e.target;

    if (e.keyCode === 8 && getInputsNumbersValue(input).length === 1) {
      input.value = "";
    }

    if (e.keyCode === "-") {
      input.value = "";
    }
  }; // Нельзя вставить букву из буфера обмена


  var onPhonePaste = function onPhonePaste(e) {
    var pasted = e.clipboardData || window.clipboardData;
    var input = e.target;
    var inputNumbersValue = getInputsNumbersValue(input);

    if (pasted) {
      var pastedText = pasted.getData("Text");

      if (/\D/g.test(pastedText)) {
        input.value = inputNumbersValue;
      }
    }
  }; // Перебор полей с телефонами


  for (var i = 0; i < phoneInputs.length; i++) {
    var input = phoneInputs[i];
    input.addEventListener("input", onPhoneInput);
    input.addEventListener("keydown", onPhoneKeyDown);
    input.addEventListener("paste", onPhonePaste);
  } // Модальное окно


  var handleModalPopup = function handleModalPopup(btn, blockModal) {
    var btns = document.querySelectorAll(btn);
    var modal = document.querySelector(blockModal);
    var overlay = document.querySelector('.location__overlay');
    var arrCloseButton = document.querySelectorAll(".js-close");

    if (btns && modal) {
      btns.forEach(function (btnItem) {
        btnItem.addEventListener("click", function (evt) {
          evt.preventDefault();
          modal.classList.add("active");
          overlay.classList.add("visible-location-overlay");
          document.body.classList.add("no-scroll"); //Передача значения data-email (Если он есть)

          var dataEmailValue = btnItem.getAttribute('data-email');
          var hiddenInput = document.querySelector('input[name="email_to"]');

          if (btnItem.hasAttribute("data-email")) {
            console.log('data-email на кнопке: ' + dataEmailValue);
          }

          if (hiddenInput) {
            console.log('до присвоения: ' + hiddenInput.value);
            hiddenInput.value = dataEmailValue;
            console.log('после присвоения: ' + hiddenInput.value);
          }
        });
      });
      arrCloseButton.forEach(function (closeButton) {
        closeButton.addEventListener("click", function (evt) {
          evt.preventDefault();
          modal.classList.remove("active");
          overlay.classList.remove("visible-location-overlay");
          document.body.classList.remove("no-scroll");
          console.log('closeButton');
        });
      });
      overlay.addEventListener("click", function (evt) {
        evt.preventDefault();
        modal.classList.remove("active");
        overlay.classList.remove("visible-location-overlay");
        document.body.classList.remove("no-scroll");
        console.log('overlay');
      });

      if (window.screen.width > 767) {
        document.addEventListener("keydown", function (evt) {
          if (evt.key === "Escape") {
            evt.preventDefault();
            modal.classList.remove("active");
            overlay.classList.remove("visible-location-overlay");
            document.body.classList.remove("no-scroll");
          }
        });
      }
    }
  };

  handleModalPopup(".js-open-callback", ".js-modal-callback"); // Модальное окно для видео

  var btn = document.querySelector('.js-watch-video');
  var modal = document.querySelector(".js-modal-video");
  var closeButton = document.querySelector(".js-close");
  var player = document.getElementById('video-iframe');

  if (player) {
    var iframeSrc = player.src;
    btn.addEventListener("click", function (evt) {
      evt.preventDefault();
      modal.classList.add("active");
      locationOverlay.classList.add("visible-location-overlay");
      document.body.classList.add("no-scroll");
    });
    closeButton.addEventListener("click", function (evt) {
      evt.preventDefault();
      modal.classList.remove("active");
      locationOverlay.classList.remove("visible-location-overlay");
      document.body.classList.remove("no-scroll");
      player.src = iframeSrc;
    });
    modal.addEventListener("click", function (evt) {
      evt.preventDefault();
      modal.classList.remove("active");
      locationOverlay.classList.remove("visible-location-overlay");
      document.body.classList.remove("no-scroll");
      player.src = iframeSrc;
    }); // Превью видео

    var VID_REGEX = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    var previewId = iframeSrc.match(VID_REGEX)[1];
    var previewImg = "https://i.ytimg.com/vi/".concat(previewId, "/maxresdefault.jpg");
    var imgSliderThumb = document.querySelector('.js-watch-video .swiper-slide__image img');
    var imgSlider = document.querySelector('.js-preview-video .swiper-slide__image img');
    imgSliderThumb.src = previewImg;
    imgSlider.src = previewImg;
  } // ---------------Валидация---------------


  var form = document.querySelector(".form");
  var inputEmail = document.querySelector(".js-input-email");
  var inputName = document.querySelector(".js-input-name"); // const inputPhone = document.querySelector(".js-input-phone");

  var inputCheckbox = document.querySelector(".js-input-checkbox");
  var inputs = document.querySelectorAll(".validate");

  if (form) {
    form.addEventListener('submit', function (evt) {
      if (inputs) {
        //name, surname
        inputs.forEach(function (item) {
          if (item.value === "") {
            item.classList.add("error");
          } else {
            item.classList.remove("error");
          }
        });
      }

      if (inputEmail) {
        //email
        var re = /^(((?:(?![\t-\r "\(\),\.:-<>@\[\]\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])[\s\S])+(\.(?:(?![\t-\r "\(\),\.:-<>@\[\]\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])[\s\S])+)*)|("(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+"))@(((?:(?![\t-\r "\(\),\.:-<>@\[\]\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])[\s\S])+\.)+(?:(?![\t-\r "\(\),\.:-<>@\[\]\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])[\s\S]){2,})$/i;

        var isEmailValid = function isEmailValid(value) {
          return re.test(String(value).toLowerCase());
        };

        if (!isEmailValid(inputEmail.value)) {
          inputEmail.classList.add("error");
        } else {
          inputEmail.classList.remove("error");
        }
      }

      if (inputCheckbox) {
        //checkbox
        if (!inputCheckbox.checked) {
          inputCheckbox.classList.add("error");
        } else {
          inputCheckbox.classList.remove("error");
        }
      }

      if (inputName.value !== "" && inputCheckbox.checked && inputEmail.value !== "") {
        form.submit();
        handleModalPopup("form-callback__submit", ".js-modal-thanks");
      } else {
        evt.preventDefault();
      }
    });
  } // --------------- Кнопка «Прикрепить файл» ---------------


  var fileWrapper = document.querySelectorAll(".upload-file__wrapper");

  if (fileWrapper) {
    for (var _i = 1; _i <= 4; _i++) {
      window["uploadDragFiles_" + _i] = new Object();
    } // сюда будем помещать drug-&-drop файлы (4)


    fileWrapper.forEach(function (current_item, index) {
      var inputFile = current_item.querySelector(".upload-file__input");
      var fileList = []; // массив файлов
      // --------------- Кнопка --------------

      var textSelector = current_item.querySelector(".upload-file__text"); // Событие выбора файла(ов)

      inputFile.addEventListener("change", function () {
        var _fileList;

        (_fileList = fileList).push.apply(_fileList, _toConsumableArray(inputFile.files)); // вызов функции для каждого файла


        fileList.forEach(function (file) {
          uploadFile(file);
        });
      }); // Проверяем размер файлов и выводим название

      var uploadFile = function uploadFile(file) {
        // размер файла <5 Мб
        if (file.size > 5 * 1024 * 1024) {
          alert("Файл должен быть не более 5 МБ.");
          return;
        } // Показ загружаемых файлов


        if (file && fileList.length > 1) {
          if (fileList.length <= 4) {
            textSelector.textContent = "\u0412\u044B\u0431\u0440\u0430\u043D\u043E ".concat(fileList.length, " \u0444\u0430\u0439\u043B\u0430");
          } else {
            textSelector.textContent = "\u0412\u044B\u0431\u0440\u0430\u043D\u043E ".concat(fileList.length, " \u0444\u0430\u0439\u043B\u043E\u0432");
          }
        } else {
          textSelector.textContent = file.name;
        }

        fileList = [];
      }; // --------------- Загрузка файлов при помощи «Drag-and-drop» ---------------


      var dropZone = current_item.querySelector(".upload-file__label");
      var dropZoneText = current_item.querySelector(".upload-file__text");
      var maxFileSize = 5000000; // максимальный размер файла - 5 мб.
      // Проверка поддержки «Drag-and-drop»

      if (typeof window.FileReader == "undefined") {
        dropZone.textContent = "Drag&Drop Не поддерживается браузером!";
        dropZone.classList.add("error");
      } // Событие - перетаскивания файла


      dropZone.ondragover = function () {
        return false;
      }; // Событие - отмена перетаскивания файла


      dropZone.ondragleave = function () {
        return false;
      }; // Событие - файл перетащили


      dropZone.addEventListener("drop", function (e) {
        e.preventDefault();
        var uploadDragFiles = e.dataTransfer.files[0]; // один файл
        // Проверка размера файла

        if (uploadDragFiles.size > maxFileSize) {
          dropZoneText.textContent = "Размер превышает допустимое значение!";
          this.addClass("error");
          return false;
        } // Показ загружаемых файлов


        if (uploadDragFiles.length > 1) {
          if (uploadDragFiles.length <= 4) {
            dropZoneText.textContent = "\u0412\u044B\u0431\u0440\u0430\u043D\u043E ".concat(uploadDragFiles.length, " \u0444\u0430\u0439\u043B\u0430");
          } else {
            dropZoneText.textContent = "\u0412\u044B\u0431\u0440\u0430\u043D\u043E ".concat(uploadDragFiles.length, " \u0444\u0430\u0439\u043B\u043E\u0432");
          }
        } else {
          dropZoneText.textContent = e.dataTransfer.files[0].name;
        } // добавляем файл в объект "uploadDragFiles_i"


        window["uploadDragFiles_" + index] = uploadDragFiles;
      });
    });
  } //Изменение размеров строки, при увеличении кол-ва текста. Секция каталог категорий


  var catalogTexts = document.querySelectorAll('.catalog__text');

  var switchPropertyText = function switchPropertyText(item) {
    if (window.screen.width > 1330) {
      item.style.fontSize = "15px";
      item.style.height = '65px';
      item.style.paddingLeft = '10px';
      item.style.paddingRight = '10px';
    }

    if (window.screen.width < 1330) {
      item.style.fontSize = "12px";
      item.style.height = '62px';
      item.style.paddingLeft = '10px';
      item.style.paddingRight = '10px';
    }

    if (window.screen.width < 767) {
      item.style.fontSize = "10px";
      item.style.height = '45px';
      item.style.paddingLeft = '10px';
      item.style.paddingRight = '10px';
    }
  };

  catalogTexts.forEach(function (item) {
    var string = item.innerHTML;

    if (string.length > 20) {
      switchPropertyText(item);
      window.addEventListener('resize', function () {
        switchPropertyText(item);
      }, true);
    }
  }); // Счетчик - 1 +

  var handleCounter = function handleCounter(remove, add, input) {
    var itemsBlock = document.querySelectorAll('.shopping-item');

    if (itemsBlock) {
      itemsBlock.forEach(function (item) {
        var removeBtn = item.querySelector(remove);
        var addBtn = item.querySelector(add);
        var inputField = item.querySelector(input);
        var counter = 1;
        addBtn.addEventListener('click', function () {
          counter++;
          inputField.value = counter;
        });
        removeBtn.addEventListener('click', function () {
          if (!counter <= 0) {
            counter--;
            inputField.value = counter;
          }
        });
      });
    }
  };

  handleCounter('.shopping-item__counting-remove', '.shopping-item__counting-add', '.shopping-item__counting-number'); // ---------------Модальное окно поиска---------------

  var handleModalSearch = function handleModalSearch() {
    var popupSearch = document.querySelector('.popup-callback__search');
    var overlayBlue = document.querySelector('.overlay-blue');
    var btn = document.querySelector('.header__search');

    if (popupSearch) {
      btn.addEventListener('click', function () {
        popupSearch.classList.add('active');
        overlayBlue.classList.add('active');
        document.body.classList.add('no-scroll');
      });
      overlayBlue.addEventListener('click', function () {
        popupSearch.classList.remove('active');
        overlayBlue.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    }
  };

  handleModalSearch();
});
//# sourceMappingURL=main.js.map
