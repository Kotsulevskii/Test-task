// Скрипт для кнопки определения геолокации

class GeolocationService {
  constructor(options = {}) {
    this.options = {
      btnSelector: '.geo-btn',
      resultSelector: '.geo-text',
      loadingText: 'Поиск...',
      unknownCityText: 'Неизвестный город',
      errorMessages: {
        default: 'Ошибка определения местоположения',
        permissionDenied: 'Доступ к геолокации запрещен. Разрешите доступ в настройках браузера',
        positionUnavailable: 'Информация о местоположении недоступна',
        timeout: 'Время ожидания истекло',
        notSupported: 'Геолокация не поддерживается вашим браузером'
      },
      nominatimUrl: 'https://nominatim.openstreetmap.org/reverse',
      ...options
    };

    this.init();
  }

  init() {
    this.btn = document.querySelector(this.options.btnSelector);
    this.resultElement = document.querySelector(this.options.resultSelector);

    if (this.btn && this.resultElement) {
      this.btn.addEventListener('click', () => this.handleGeolocation());
    } else {
      console.error('Не найдены необходимые элементы DOM');
    }
  }

  // Процесс нахожения геопозиции
  handleGeolocation() {
    this.setLoadingState(true);

    if (!navigator.geolocation) {
      this.showError(this.options.errorMessages.notSupported);
      this.setLoadingState(false);
      return;
    }

    //Обработка промиса
    this.getCurrentPosition()
      .then(position => {
        return this.getCityName(position.coords);
      })
      .then(cityName => {
        this.showResult(cityName);
      })
      .catch(error => {
        this.handleError(error);
      })
      .finally(() => {
        this.setLoadingState(false);
      });
  }

   // Отображение процесса загрузки
  setLoadingState(isLoading) {
    if (this.btn) {
      this.btn.disabled = isLoading;
    }
    if (isLoading && this.resultElement) {
      this.resultElement.textContent = this.options.loadingText;
    }
  }

  // Отображение ошибки
  showError(message) {
    if (this.resultElement) {
      this.resultElement.textContent = message;
    }
  }

  // Обработка ошибок
  handleError(error) {
    let message = this.options.errorMessages.default;

    if (error.code) {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          message = this.options.errorMessages.permissionDenied;
          break;
        case error.POSITION_UNAVAILABLE:
          message = this.options.errorMessages.positionUnavailable;
          break;
        case error.TIMEOUT:
          message = this.options.errorMessages.timeout;
          break;
      }
    }

    this.showError(message);
  }

  // Получение координат в виде промиса
  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => resolve(position),
        error => reject(error)
      );
    });
  }

  // Определение города
  getCityName(coords) {
    const url = `${this.options.nominatimUrl}?format=json&lat=${coords.latitude}&lon=${coords.longitude}`;
    
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка запроса к сервису геолокации');
        }
        return response.json();
      })
      .then(data => {
        return data.address?.city || 
               data.address?.town || 
               data.address?.village || 
               this.options.unknownCityText;
      })
      .catch(error => {
        console.error('Ошибка получения города:', error);
        return this.options.unknownCityText;
      });
  }

  // Отображение найденного города
  showResult(cityName) {
    if (this.resultElement) {
      this.resultElement.textContent = cityName;
    }
  }
}

// Использование
document.addEventListener('DOMContentLoaded', () => {
  const geoService = new GeolocationService();
});