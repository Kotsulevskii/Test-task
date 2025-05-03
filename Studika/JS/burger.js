// Скрипт для бургер меню 
let burgerMenu = document.querySelector('.burger-menu')
let menu = document.querySelector('.menu')

// Слушатель события "клик" на кнопку
burgerMenu.addEventListener('click', function() {
  this.classList.toggle('active')
  this.classList.contains('active') ?  menu.classList.add('active') :  menu.classList.remove('active')
});

/* Загрузка JSON данных в пункты меню */
document.addEventListener('DOMContentLoaded', function() {
  fetch('../JSON/menu.json')
      .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка загрузки данных')
        }
        return response.json()
      })
      .then(data => {
        createListMenu(data)
      })
      .catch(error => {
          console.error('Произошла ошибка:', error)
          alert('Не удалось загрузить данные. Пожалуйста, попробуйте позже.')
      });

  // Функция для создания списка учебных заведений
  function createListMenu(obj) {
      for (key in obj) {
        let listItem = document.createElement('li')
        let link = document.createElement('a')
        link.textContent = `${obj[key]}`
        listItem.appendChild(link)
        menu.appendChild(listItem)
      }
  }
});