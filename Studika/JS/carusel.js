// Скрипт для навигационной панели снизу

class NavMenu {
  constructor() {
    this.carousel = document.querySelector('.nav-carousel');
    this.menu = document.querySelector('.nav-menu');
    this.arrowLeft = document.querySelector('.nav-arrow-left');
    this.arrowRight = document.querySelector('.nav-arrow-right');
    this.maxScroll = 0;
    this.jsonUrl = '../JSON/menu.json';
    this.isScrolling = false;
    
    this.init();
  }
  
  init() {
    if (!this.carousel || !this.menu) {
      console.error('Не найдены элементы меню');
      return;
    }

// loadMenuData() возвращает объект Promise
//then() регистрирует колбэк, который выполнится после успешного завершения Promise
    this.loadMenuData().then(() => {
      this.setupCarousel();
      this.setupEventListeners();
      this.setupClickHandler(); 
    });
  }
 
  // Загрузка меню из файла JSON
  loadMenuData() {
    return fetch(this.jsonUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных');
        }
        return response.json();
      })
      .then(data => {
        this.createMenuItems(data);
      })
      .catch(error => {
        console.error('Произошла ошибка:', error);
        this.showError();
      });
  }

  // Создание надписи ошибки
  showError() {
    const errorItem = document.createElement('li');
    errorItem.textContent = 'Ошибка загрузки меню';
    errorItem.style.color = 'red';
    this.menu.appendChild(errorItem);
  }

  // Создание пунктов меню
  createMenuItems(menuData) {
    this.menu.innerHTML = '';
    
    for (const key in menuData) {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      
      link.classList.add('nav-item');
      link.textContent = menuData[key];
      link.href = '#';
      
      listItem.appendChild(link);
      this.menu.appendChild(listItem);
    }
  }

  // Установка обработчиков видимости стрелок
  setupCarousel() {
    this.updateMaxScroll();
    
    let resizeTimeout;
    // Обработчик изменения окна
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      // Если в течение 100мс не будет новых resize, выполнится updateMaxScroll()
      resizeTimeout = setTimeout(() => {
        this.updateMaxScroll();
      }, 100);
    });

    // Обработчик скролла меню
    this.carousel.addEventListener('scroll', () => {
      this.updateArrowVisibility();
    
      this.isScrolling = true; // True - прокрутка активна
      clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(() => {
        this.isScrolling = false;
      }, 100);
    });
  }

  // Первоначальные вычисления параметров прокрутки
  updateMaxScroll() {
    this.maxScroll = this.carousel.scrollWidth - this.carousel.clientWidth;
    this.updateArrowVisibility();
  }
  
  // Обновляем видимость стрелок
  updateArrowVisibility() {
    const isAtStart = Math.abs(this.carousel.scrollLeft) < 10;
    const isAtEnd = Math.abs(this.carousel.scrollLeft - this.maxScroll) < 10;
    
    this.arrowLeft.classList.toggle('hidden', isAtStart);
    this.arrowRight.classList.toggle('hidden', isAtEnd || this.maxScroll <= 0);
  }

  // Установка обработчика клика на стрелки
  setupEventListeners() {
    this.arrowLeft.addEventListener('click', () => {
      this.scrollCarousel(-200);
    });
    
    this.arrowRight.addEventListener('click', () => {
      this.scrollCarousel(200);
    });
  }
  
  // Реализация прокрутки и её плавности
  scrollCarousel(amount) {
    this.isScrolling = true;
    this.carousel.scrollBy({
      left: amount,
      behavior: 'smooth'
    });
    
    // Сбрасываем флаг прокрутки через некоторое время
    setTimeout(() => {
      this.isScrolling = false;
    }, 500);
  }
  
  // Добавляем новый метод для обработки кликов
  setupClickHandler() {
    this.menu.addEventListener('click', (e) => {
      const navItem = e.target.closest('.nav-item');
       // Проверяем, что клик был по элементу меню и нет активной прокрутки
      if (navItem && !this.isScrolling) {
        e.preventDefault();
        this.setActiveItem(navItem);
      }
    });
  }
  
  // Добавление класса выбранному элементу
  setActiveItem(clickedItem) {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });
    
    clickedItem.classList.add('active');
    
    // Прокручиваем к выбранному элементу, если он не полностью виден
    this.scrollToItem(clickedItem);
  }
  
  // Плавная прокрутка к элементу
  scrollToItem(item) {
    let itemRect = item.getBoundingClientRect(); // Объект с размерами и позицией элемента относительно viewport
    let carouselRect = this.carousel.getBoundingClientRect();
    
    if (itemRect.left < carouselRect.left) {
      // Элемент слева за границей видимости
      const scrollAmount = itemRect.left - carouselRect.left - 20;
      this.carousel.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    } else if (itemRect.right > carouselRect.right) {
      // Элемент справа за границей видимости
      const scrollAmount = itemRect.right - carouselRect.right + 20;
      this.carousel.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new NavMenu();
});