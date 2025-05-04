// Цикл for...of для объекта, который на каждой итерации получает ключ и значение

let obj = {
    a: 1,
    b: 2,
    c: 3,
    // Добавим объекту метод, который будет определять итератор по умолчанию.
    [Symbol.iterator]() {
      let keys = Object.keys(this);
      let index = 0;
      // Возвращаем итератор
      return {
        // Итератор — это объект с методом next(), возвращающим элементы в формате { value, done }
        next: () => {
          if (index < keys.length) {
            let key = keys[index++];
            // В каждой итерации будем возвращать массив [key, value].
            return { value: [key, this[key]], done: false };
          }
          // Перебор закончен
          return { done: true };
        }
      };
    }
  };
  
// Пример использования:
  for (let [key, value] of obj) {
    console.log(key, value);
  }