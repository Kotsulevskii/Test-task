//Скрипт для строки поиска

class SearchCitySelector {
  constructor(containerSelector) {
    // Основные элементы
    this.container = document.querySelector(containerSelector); 
    this.searchInput = this.container.querySelector('.search-input');
    this.clearBtn = this.container.querySelector('.clear-btn');
    this.dropdown = this.container.querySelector('.city-dropdown');
    this.loader = this.container.querySelector('.city-selector__loader');
    this.list = this.container.querySelector('.city-selector__list');
    this.selectedContainer = this.container.querySelector('.city-selector__selected');
    this.saveBtn = this.container.querySelector('.city-selector__save');
    
    // Состояние
    this.cities = null; // Список городов из API
    this.selectedCities = []; // Список городов выбранных пользователем
    this.isLoading = false;
    this.isOpen = false; // Открытие dropdown
    
    // Инициализация
    this.init();
  }
  
  init() {
    if (!this.checkElements()) return;
    
    this.setupSearchHandlers();
    this.setupCitySelectorHandlers();
  }
  
  // Проверка на наличие необходимых DOM-элементов
  checkElements() {
    const elements = [
      this.container, 
      this.searchInput, 
      this.clearBtn,
      this.dropdown,
      this.list
    ];
    
    return elements.every(el => {
      if (!el) console.error('Не найден элемент:', el);
      return el !== null;
    });
  }
  
  // Обработчики на поле ввода и кнопку очистки
  setupSearchHandlers() {
    // Обработчик ввода текста
    this.searchInput.addEventListener('input', () => {
      this.toggleClearButton();
      
      // Если открыт dropdown, фильтруем города
      if (this.isOpen) {
        this.filterCities();
      }
    });
    
    // Очистка поля поиска
    this.clearBtn.addEventListener('click', () => {
      this.searchInput.value = '';
      this.searchInput.focus();
      this.clearBtn.classList.remove('visible');
      
      if (this.isOpen) {
        this.filterCities();
      }
    });
    
    // Скрытие крестика при потере фокуса
    this.searchInput.addEventListener('blur', () => {
      if (this.searchInput.value.length === 0) {
        this.clearBtn.classList.remove('visible');
      }
    });
  }
  
  // Обраюботка выбора городов
  setupCitySelectorHandlers() {
    // Открытие dropdown при фокусе
    this.searchInput.addEventListener('focus', () => this.openDropdown());
    
    // Закрытие при клике вне элемента
    document.addEventListener('click', (e) => {
      if (!this.container.contains(e.target)) {
        this.closeDropdown();
      }
    });
    
    // Сохранение выбора
    if (this.saveBtn) {
      this.saveBtn.addEventListener('click', () => this.saveSelection());
    }
  }
  
  // Отображение кнопки-крестика в поле поиска
  toggleClearButton() {
    if (this.searchInput.value.length > 0) {
      this.clearBtn.classList.add('visible');
    } else {
      this.clearBtn.classList.remove('visible');
    }
  }
  
  openDropdown() {
    if (this.isOpen) return;
    
    this.isOpen = true;
    this.dropdown.classList.add('active');
    
    if (!this.cities) {
      this.loadCities();
    } else {
      this.showCityList();
    }
  }
  
  closeDropdown() {
    if (!this.isOpen) return;
    
    this.isOpen = false;
    this.dropdown.classList.remove('active');
  }
  
  // Заполнение массива с городами
  loadCities() {
    if (this.isLoading) return;
    
    this.showLoader();
    this.isLoading = true;
    
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка загрузки');
        }
        return response.json();
      })
      .then(data => {
        this.cities = data.map(user => ({
          id: user.id,
          name: user.address.city,
        }));
        this.showCityList();
      })
      .catch(error => {
        console.error('Ошибка:', error);
        this.list.innerHTML = '<li>Не удалось загрузить города</li>';
        this.showCityList();
      })
      .finally(() => {
        this.hideLoader();
        this.isLoading = false;
      });
  }
  
  // Показ анимации загрузки
  showLoader() {
    this.loader.classList.add('active');
    this.list.classList.remove('active');
  }
  
  // Скрытие анимации загрузки
  hideLoader() {
    this.loader.classList.remove('active');
  }
  
  // Отрисовка списка городов
  showCityList() {
    this.renderCities(this.cities);
    this.list.classList.add('active');
  }
  
  // Фильтр списка городов
  filterCities() {
    if (!this.cities) return;
    
    const term = this.searchInput.value.trim().toLowerCase();
    const filtered = term 
      ? this.cities.filter(city => 
          city.name.toLowerCase().includes(term))
      : this.cities;
    
    this.renderCities(filtered);
  }
  
  // Отрисовка списка городов из массива
  renderCities(cities) {
    this.list.innerHTML = cities.map(city => {
      const isSelected = this.selectedCities.some(c => c.id === city.id);
      return `
        <li class="city-selector__item ${isSelected ? 'selected' : ''}" 
            data-id="${city.id}">
          ${this.highlightMatch(city.name)}
        </li>
      `;
    }).join('');
    
    this.setupCityItemsHandlers();
  }
  
  // Подсветка текста
  highlightMatch(text) {
    const term = this.searchInput.value.trim();
    if (!term) return text;
    
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  }
  
  // Обработчик кликов по элементам списка
  setupCityItemsHandlers() {
    this.list.querySelectorAll('.city-selector__item').forEach(item => {
      item.addEventListener('click', () => this.toggleCitySelection(item));
    });
  }
  
  // Добавляет или убирает город из массива
  toggleCitySelection(item) {
    const cityId = parseInt(item.dataset.id);
    const city = this.cities.find(c => c.id === cityId);
    const selectedIndex = this.selectedCities.findIndex(c => c.id === cityId);
    
    // Удаление из выбранных
    if (selectedIndex >= 0) {
      this.selectedCities.splice(selectedIndex, 1);
      item.classList.remove('selected');
    } else {
      // Добавление в выбранные
      this.selectedCities.push(city);
      item.classList.add('selected');
    }
    
    this.renderSelectedCities();
  }
  
  // Отображение выбранных городов
  renderSelectedCities() {
    this.selectedContainer.innerHTML = this.selectedCities.map(city => `
      <div class="city-selector__badge" data-id="${city.id}">
        ${city.name}
        <span class="city-selector__badge-remove">×</span>
      </div>
    `).join('');
    
    this.setupBadgeRemoveHandlers();
  }
  
  // Обработка кликов по кнопкам удаления выбранных городов.
  setupBadgeRemoveHandlers() {
    this.selectedContainer.querySelectorAll('.city-selector__badge-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Предотвращаем всплытие события
        this.removeSelectedCity(parseInt(btn.closest('.city-selector__badge').dataset.id));
      });
    });
  }

  // Удаление выбранного города
  removeSelectedCity(cityId) {
    this.selectedCities = this.selectedCities.filter(c => c.id !== cityId);
    this.renderSelectedCities();
    
    const listItem = this.list.querySelector(`[data-id="${cityId}"]`);
    if (listItem) listItem.classList.remove('selected');
  }
  
  // Сохранение в куки и отправка на ajax-сервер (заглушку)
  saveSelection() {
    // Сохранение в cookies
    this.saveToCookies();
    
    // Отправка на сервер-заглушку
    this.sendToServer()
      .then(response => {
        console.log('Успешно сохранено на сервере:', response);
        this.closeDropdown();
      })
      .catch(error => {
        console.error('Ошибка сохранения:', error);
        this.showError('Не удалось сохранить выбор');
      });
  }
  
  // Сохранение выбранных городов в cookies
  saveToCookies() {
    const date = new Date();
    date.setTime(date.getTime() + (24 * 60 * 60 * 1000)); // Куки на 1 день
    const expires = "expires=" + date.toUTCString();
    
    const citiesJson = JSON.stringify(this.selectedCities);
    
    document.cookie = `selectedCities=${encodeURIComponent(citiesJson)}; ${expires}; path=/`;
    
    console.log('Данные сохранены в cookies');
  }
  
    sendToServer() {
      const url = 'https://jsonplaceholder.typicode.com/posts';
      
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: 1, 
          selectedCities: this.selectedCities,
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      });
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  new SearchCitySelector('.search-container');
});