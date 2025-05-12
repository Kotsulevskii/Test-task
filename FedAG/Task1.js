// Реализации функции массива filter

Array.prototype.myFilter = function(callback) {
    // Проверка на значения null и undefined
    if (this == null) {
      throw new TypeError('Функция Array.prototype.myFilter вызвана для работы с null или undefined');
    }
    // Проверка на то, что callback - функция
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' не является функцией');
    }

    // Новый отфильтрованный массив
    let result = [];

    // Процесс фильтрации - проверка callback на значения true и false
    for (let i = 0; i < this.length; i++) {
      if (callback(this[i], i, this)) {
        result.push(this[i]);
      }
    }
    return result;
  };
  

  // Пример использования:
  let numbers = [1, 2, 3, 4, 5];
  let evens = numbers.myFilter(num => num % 2 === 0);
  console.log(evens); // [2, 4]