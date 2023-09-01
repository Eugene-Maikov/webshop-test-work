document.addEventListener("DOMContentLoaded", () => {
  // --------------- Mobile menu ---------------
  const burger = document.querySelector('.header__burger')
  const menu = document.querySelector('.mobile-menu')
  const close = document.querySelector('.mobile-menu__close')

  burger.addEventListener("click", () => {
    menu.classList.add('active')
    document.body.classList.add("no-scroll")
  })
  close.addEventListener("click", () => {
    menu.classList.remove('active')
    document.body.classList.remove("no-scroll")
  })

  // --------------- Mobile menu / выпадающий список ---------------
  // Выбор опций/сортировка
  const handleOption = (el) => {
    el = el.target;

    // открытие списков
    if (el.closest(".linkHasChild")) {
      document.querySelectorAll(".linkHasChild").forEach(function (el) {
        el.classList.remove("active")
      })
      el.closest(".linkHasChild").classList.add("active")
    }
  };
  document.addEventListener("click", handleOption);

  // --------------- Выбор города ---------------
  const filter = document.querySelector('.contacts__filter')
  const overlay = document.querySelector('.contacts__overlay')
  const contactsMobile = document.querySelectorAll('.contacts__head')
  const filterTabs = document.querySelectorAll('.tabs__nav-item')

  contactsMobile.forEach((tab) => {
    tab.addEventListener("click", () => {
      filter.classList.add('visible-filter')
      overlay.classList.add('visible-filter')
      document.body.classList.add("no-scroll")
    })
  })
  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      filter.classList.remove('visible-filter')
      overlay.classList.remove('visible-filter')
      document.body.classList.remove("no-scroll")
    })
  })

  // --------------- Mobile menu / Выбор города ---------------
  const locationBtn = document.querySelector('.location__button')
  const locationOverlay = document.querySelector('.location__overlay')
  const locationMobileBtn = document.querySelector('.mobile-menu__button')
  const locationModal = document.querySelector('.location__modal')
  const locationItems = document.querySelectorAll('.location__modal-item')

  locationBtn.addEventListener("click", () => {
    locationModal.classList.toggle('visible-location')
  })
  locationMobileBtn.addEventListener("click", () => {
    locationModal.classList.toggle('visible-location')
    locationOverlay.classList.toggle('visible-location-overlay')
  })

  locationItems.forEach((item) => {
    item.addEventListener('click', () => {
      locationBtn.innerHTML = item.innerHTML
      locationMobileBtn.innerHTML = item.innerHTML
      locationModal.classList.remove('visible-location')
      locationOverlay.classList.remove('visible-location-overlay')
    })
  })

  // --------------- Маска ввода номера телефона ---------------
  let phoneInputs = document.querySelectorAll("input[data-tel-input]");

  let getInputsNumbersValue = function (input) {
    return input.value.replace(/\D/g, "");
  };

  // Обработка ввода
  let onPhoneInput = function (e) {
    let input = e.target;
    let inputNumbersValue = getInputsNumbersValue(input);
    let formattedInputValue = "";
    let selectionStart = input.selectionStart;

    if (!inputNumbersValue) {
      return (input.value = "");
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
      let firstSymbols = inputNumbersValue[0] === "8" ? "8" : "+7";
      formattedInputValue = firstSymbols + " ";

      //Форматирование
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
  };

//  Удаление первой цифры
  let onPhoneKeyDown = function (e) {
    let input = e.target;
    if (e.keyCode === 8 && getInputsNumbersValue(input).length === 1) {
      input.value = "";
    }
    if (e.keyCode === "-") {
      input.value = "";
    }
  };

// Нельзя вставить букву из буфера обмена
  let onPhonePaste = function (e) {
    let pasted = e.clipboardData || window.clipboardData;
    let input = e.target;
    let inputNumbersValue = getInputsNumbersValue(input);

    if (pasted) {
      let pastedText = pasted.getData("Text");

      if (/\D/g.test(pastedText)) {
        input.value = inputNumbersValue;
      }
    }
  };

// Перебор полей с телефонами
  for (let i = 0; i < phoneInputs.length; i++) {
    let input = phoneInputs[i];
    input.addEventListener("input", onPhoneInput);
    input.addEventListener("keydown", onPhoneKeyDown);
    input.addEventListener("paste", onPhonePaste);
  }

  // Модальное окно
  let handleModalPopup = function handleModalPopup(btn, blockModal) {
    let btns = document.querySelectorAll(btn)
    let modal = document.querySelector(blockModal)
    let overlay = document.querySelector('.location__overlay')
    let arrCloseButton = document.querySelectorAll(".js-close")

    if (btns && modal) {

      btns.forEach(function (btnItem) {
        btnItem.addEventListener("click", function (evt) {
          evt.preventDefault();
          modal.classList.add("active");
          overlay.classList.add("visible-location-overlay");
          document.body.classList.add("no-scroll");

          //Передача значения data-email (Если он есть)
          let dataEmailValue = btnItem.getAttribute('data-email')
          let hiddenInput = document.querySelector('input[name="email_to"]')

          if (btnItem.hasAttribute("data-email")) {
            console.log('data-email на кнопке: ' + dataEmailValue)
          }
          if (hiddenInput) {
            console.log('до присвоения: ' + hiddenInput.value)
            hiddenInput.value = dataEmailValue
            console.log('после присвоения: ' + hiddenInput.value)
          }
        });
      });

      arrCloseButton.forEach(function (closeButton) {
        closeButton.addEventListener("click", function (evt) {
          evt.preventDefault();
          modal.classList.remove("active");
          overlay.classList.remove("visible-location-overlay");
          document.body.classList.remove("no-scroll");
          console.log('closeButton')
        });
      });

      overlay.addEventListener("click", function (evt) {
        evt.preventDefault();
        modal.classList.remove("active");
        overlay.classList.remove("visible-location-overlay");
        document.body.classList.remove("no-scroll");
        console.log('overlay')
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
  }

  handleModalPopup(".js-open-callback", ".js-modal-callback",)

  // Модальное окно для видео
  const btn = document.querySelector('.js-watch-video');
  const modal = document.querySelector(".js-modal-video");
  const closeButton = document.querySelector(".js-close");

  const player = document.getElementById('video-iframe');

  if (player) {
    const iframeSrc = player.src;

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
    });

    // Превью видео
    let VID_REGEX = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    let previewId = iframeSrc.match(VID_REGEX)[1]
    let previewImg = `https://i.ytimg.com/vi/${previewId}/maxresdefault.jpg`

    let imgSliderThumb = document.querySelector('.js-watch-video .swiper-slide__image img')
    let imgSlider = document.querySelector('.js-preview-video .swiper-slide__image img')

    imgSliderThumb.src = previewImg
    imgSlider.src = previewImg

  }


  // ---------------Валидация---------------
  const form = document.querySelector(".form");
  const inputEmail = document.querySelector(".js-input-email");
  const inputName = document.querySelector(".js-input-name");
  // const inputPhone = document.querySelector(".js-input-phone");
  const inputCheckbox = document.querySelector(".js-input-checkbox");
  const inputs = document.querySelectorAll(".validate");

  if (form) {
    form.addEventListener('submit', (evt) => {

      if (inputs) {
        //name, surname
        inputs.forEach((item) => {
          if (item.value === "") {
            item.classList.add("error");
          } else {
            item.classList.remove("error");
          }
        })
      }

      if (inputEmail) {
        //email
        const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        const isEmailValid = (value) => {
          return re.test(String(value).toLowerCase());
        }

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
        handleModalPopup("form-callback__submit", ".js-modal-thanks",)
      } else {
        evt.preventDefault();
      }
    })
  }

  // --------------- Кнопка «Прикрепить файл» ---------------
  const fileWrapper = document.querySelectorAll(".upload-file__wrapper")

  if (fileWrapper) {
    for (let i = 1; i <= 4; i++) {
      window["uploadDragFiles_" + i] = new Object();
    } // сюда будем помещать drug-&-drop файлы (4)

    fileWrapper.forEach((current_item, index) => {

      const inputFile = current_item.querySelector(".upload-file__input")

      let fileList = [] // массив файлов

      // --------------- Кнопка --------------
      let textSelector = current_item.querySelector(".upload-file__text")

      // Событие выбора файла(ов)
      inputFile.addEventListener("change", function () {
        fileList.push(...inputFile.files);
        // вызов функции для каждого файла
        fileList.forEach(file => {
          uploadFile(file);
        });
      });

      // Проверяем размер файлов и выводим название
      const uploadFile = (file) => {

        // размер файла <5 Мб
        if (file.size > 5 * 1024 * 1024) {
          alert("Файл должен быть не более 5 МБ.");
          return;
        }

        // Показ загружаемых файлов
        if (file && fileList.length > 1) {
          if (fileList.length <= 4) {
            textSelector.textContent = `Выбрано ${fileList.length} файла`;
          } else {
            textSelector.textContent = `Выбрано ${fileList.length} файлов`;
          }
        } else {
          textSelector.textContent = file.name;
        }
        fileList = [];
      }


      // --------------- Загрузка файлов при помощи «Drag-and-drop» ---------------
      const dropZone = current_item.querySelector(".upload-file__label");
      const dropZoneText = current_item.querySelector(".upload-file__text");
      const maxFileSize = 5000000; // максимальный размер файла - 5 мб.

      // Проверка поддержки «Drag-and-drop»
      if (typeof (window.FileReader) == "undefined") {
        dropZone.textContent = "Drag&Drop Не поддерживается браузером!";
        dropZone.classList.add("error");
      }
      // Событие - перетаскивания файла
      dropZone.ondragover = () => {
        return false;
      };
      // Событие - отмена перетаскивания файла
      dropZone.ondragleave = () => {
        return false;
      };
      // Событие - файл перетащили
      dropZone.addEventListener("drop", function (e) {
        e.preventDefault();

        let uploadDragFiles = e.dataTransfer.files[0]; // один файл

        // Проверка размера файла
        if (uploadDragFiles.size > maxFileSize) {
          dropZoneText.textContent = "Размер превышает допустимое значение!";
          this.addClass("error");
          return false;
        }

        // Показ загружаемых файлов
        if (uploadDragFiles.length > 1) {
          if (uploadDragFiles.length <= 4) {
            dropZoneText.textContent = `Выбрано ${uploadDragFiles.length} файла`;
          } else {
            dropZoneText.textContent = `Выбрано ${uploadDragFiles.length} файлов`;
          }
        } else {
          dropZoneText.textContent = e.dataTransfer.files[0].name;
        }

        // добавляем файл в объект "uploadDragFiles_i"
        window["uploadDragFiles_" + index] = uploadDragFiles;
      });

    });
  }

  //Изменение размеров строки, при увеличении кол-ва текста. Секция каталог категорий
  let catalogTexts = document.querySelectorAll('.catalog__text')

  let switchPropertyText = function switchPropertyText(item) {
    if (window.screen.width > 1330) {
      item.style.fontSize = "15px";
      item.style.height = '65px';
      item.style.paddingLeft = '10px'
      item.style.paddingRight = '10px'
    }
    if (window.screen.width < 1330) {
      item.style.fontSize = "12px";
      item.style.height = '62px';
      item.style.paddingLeft = '10px'
      item.style.paddingRight = '10px'
    }
    if (window.screen.width < 767) {
      item.style.fontSize = "10px";
      item.style.height = '45px';
      item.style.paddingLeft = '10px'
      item.style.paddingRight = '10px'
    }
  }

  catalogTexts.forEach((item) => {
    let string = item.innerHTML

    if (string.length > 20) {
      switchPropertyText(item)

      window.addEventListener('resize', function () {
        switchPropertyText(item)
      }, true);
    }
  })


  // Счетчик - 1 +
  const handleCounter = (remove, add, input) => {
    const itemsBlock = document.querySelectorAll('.shopping-item')

    if (itemsBlock) {
      itemsBlock.forEach((item) => {
        const removeBtn = item.querySelector(remove)
        const addBtn = item.querySelector(add)
        const inputField = item.querySelector(input)

        let counter = 1
        addBtn.addEventListener('click', () => {
          counter++
          inputField.value = counter
        })
        removeBtn.addEventListener('click', () => {
          if (!counter <= 0) {
            counter--
            inputField.value = counter
          }
        })
      })
    }
  }

  handleCounter('.shopping-item__counting-remove', '.shopping-item__counting-add', '.shopping-item__counting-number')

  // ---------------Модальное окно поиска---------------
  const handleModalSearch = () => {
    const popupSearch = document.querySelector('.popup-callback__search')
    const overlayBlue = document.querySelector('.overlay-blue')
    const btn = document.querySelector('.header__search')
    if (popupSearch) {
      btn.addEventListener('click', () => {
        popupSearch.classList.add('active')
        overlayBlue.classList.add('active')
        document.body.classList.add('no-scroll')
      })
      overlayBlue.addEventListener('click', () => {
        popupSearch.classList.remove('active')
        overlayBlue.classList.remove('active')
        document.body.classList.remove('no-scroll')
      })
    }
  }
  handleModalSearch()
})







