//Плагин на табы
const tabs = (mainBlock, titleTab, cssMain, numberOfOpenTab) => {
  //Главный блок с табом
  const tabJsСssMain = document.querySelectorAll(cssMain),
    //Заголовок таба
    tabJsTitle = document.querySelectorAll(titleTab);

  //Добавляю ко всем элементом класс закрытия
  const closeTabs = () => {
    //закрываю все табы
    tabJsСssMain.forEach((elem) => {
      elem.classList.add('close');
    });
    // Если нужно, добавляю элемент раскрытого таба
    if (numberOfOpenTab) {
      tabJsСssMain[numberOfOpenTab].classList.remove('close');
      tabJsСssMain[numberOfOpenTab].classList.add('open');
    }    
  };
  // mainBlock, titleTab, cssMain
  closeTabs();

  tabJsTitle.forEach((elem, i) => {
    elem.addEventListener('click', () => {
      const itemClass = elem.parentNode.className;
      for (i = 0; i < tabJsСssMain.length; i++) {
        tabJsСssMain[i].className = `${cssMain} ${mainBlock} close`.replace(/\./gi, '');
      }
      if (itemClass == `${cssMain} ${mainBlock} close`.replace(/\./gi, '')) {
        elem.parentNode.className = `${cssMain} ${mainBlock} open`.replace(/\./gi, '');
      }
    });
  });
};
//tabs
//tabs('.js-tab-main-block', '.tab-js-title', '.defect-tabs__block', 1);
//menu
//tabs('.js-tab-main-block', '.tab-js-title', '.menu-mobile-block__item');

/* modal popup */


const popups = (classToNumberOpen, numberOfPopup) => {
  const popupOpen = document.querySelectorAll(classToNumberOpen),
        popupClose = document.querySelector(`${numberOfPopup} .popup-close`),
        popupShadow = document.querySelector(numberOfPopup),
        editTitle = document.querySelector(`${numberOfPopup} .popup-edit`);

popupOpen.forEach((el, i, h) => {
  //close all
  const closeIt = () => {
    document.querySelector('body').style.overflow = 'initial';
    popupShadow.style.display = 'none';
  };

  el.addEventListener('click', e => {
  //убираю прокрутку
  document.querySelector('body').style.overflow = 'hidden';
  popupShadow.style.display = 'flex';
  //here write a content in a title
  const titleContent = el.dataset.popupContent;
  if (titleContent) {
    editTitle.textContent = titleContent;
  } else {
    editTitle.textContent = 'обратный звонок';
  }

  //on click to close
  popupClose.addEventListener('click', e => {
    closeIt();
  });
  //on click on esc
  const closeESC = window.addEventListener('keyup', e => {
    if (e.code == 'Escape') {
      closeIt();
      window.removeEventListener('keyup', closeESC);
    }
  });
});
});
};
// 1 - class to open popup
// 2 - number of popup in HTML
//popups('.popup-open', '.popup-number-1');
//popups('.popup-open-2', '.popup-number-2');

// An accordeon plugin

const accordeon = (top, topActive, bottom, bottomActive) => {
  const accItemToClick = document.querySelectorAll(top),
      accItemToShow = document.querySelectorAll(bottom);

accItemToClick.forEach((elem, index, node) => {
  elem.addEventListener('mouseenter', (event) => {
    let addTransition = document.querySelectorAll('.playlist-about__tabs-item span')[index];
    addTransition.classList.add('playlist-about__tabs-item_span');
  });

  elem.addEventListener('mouseleave', (event) => {
    let removeTransition = document.querySelectorAll('.playlist-about__tabs-item span')[index];
    removeTransition.classList.remove('playlist-about__tabs-item_span');
  });

  elem.addEventListener('click', (event) => {
    //remove all classes
    accItemToClick.forEach((el, ind, n) => {
      el.classList.remove(topActive);
    });
    accItemToShow.forEach((el, ind, n) => {
      el.classList.remove(bottomActive);
    });
    console.log();
    accItemToShow[index].classList.add(bottomActive);
    //add choosen class
    elem.classList.add(topActive);
  });
});
};

accordeon('.playlist-about__tabs-item', 'playlist-about__tabs-item_active', '.playlist', 'playlist_active');

const burgerMenuOpen = (open, close, menu) => {  
  const openWindow = document.querySelector(open),
        closeWindow = document.querySelector(close),
        menuIt = document.querySelector(menu);
  //to find out the size of the window
  //findSize();
  //window.addEventListener('resize', findSize);

  function findSize(){
      let widthWindow = document.documentElement.clientWidth,
          heightWindow = document.documentElement.clientHeight;

      if (widthWindow < 768) {
        console.log('works');
        menuIt.classList.remove('menu-open');
        document.querySelector('body').style.overflow = 'initial';
      }
    }

    openWindow.addEventListener('click', (event) => {
      menuIt.classList.remove('menu-closest');
      menuIt.classList.add('menu-open');
      document.querySelector('body').style.overflow = 'hidden';
    });

    closeWindow.addEventListener('click', (event) => {
      menuIt.classList.remove('menu-open');
      menuIt.classList.add('menu-closest');
      document.querySelector('body').style.overflow = 'initial';
    });
    
};

burgerMenuOpen('.openmenu', '.menu-close', '.menu');

















//tabs('.js-tab-main-block', '.tab-js-title', 'defect-tabs__block');

//Сначала по классу должен идти главный блок, заложенный в верстке, потом исполнительный класс скрипта, потом уже говорится закрыт он или нет
//Пример: defect-tabs__block js-tab-main-block open
//css код для скрипта: 
/*
.open .tab-js-subtitle {
  -webkit-transform: scaleY(1);
  transform: scaleY(1);
  -webkit-transform-origin: top;
  transform-origin: top;
  -webkit-transition: -webkit-transform .4s ease;
  transition: -webkit-transform .4s ease;
  transition: transform .4s ease;
  transition: transform .4s ease, -webkit-transform .4s ease;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.close .tab-js-subtitle {
  height: 0;
  -webkit-transition: height 1s ease-out;
  transition: height 1s ease-out;
  -webkit-transform: scaleY(0);
  transform: scaleY(0);
}
*/