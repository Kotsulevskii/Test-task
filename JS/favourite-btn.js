// Скрипт для кнопки "добавить в избранное"

document.querySelector('.favourites-block').addEventListener('click', function() {
    const counterSpan = document.querySelector('.count-favourites');
    
    // Получаем текущее значение
    let currentValue = parseInt(counterSpan.textContent);
    
    // Увеличиваем значение на 1
    counterSpan.textContent = currentValue + 1;
  });