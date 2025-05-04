// Функция для вывода всех ключей объекта, включая ключи его прототипов

function getAllKeys(obj) {
    let keys = new Set(); // коллекция уникальных значений
    
    // Object.getOwnPropertyNames(current) возвращает все собственные ключи + неперечисляемые (служебные)
    // Если необходимо возвращать только пользовательские ключи, то необходимо воспользоваться Object.keys(current)
    for (let current = obj; current != null; current = Object.getPrototypeOf(current)) {
      Object.getOwnPropertyNames(current).forEach(key => keys.add(key));
    }
    
    return Array.from(keys); // Конвертируем коллекцию Set в массив 
  }


// Пример использования:
let parent = { a: 1 };
let child = Object.create(parent);
child.b = 2;

console.log(getAllKeys(child)); 
// При использовании Object.getOwnPropertyNames(current)
/* [
'b',
'a',
'constructor',
'__defineGetter__',
'__defineSetter__',
'hasOwnProperty',
'__lookupGetter__',
'__lookupSetter__',
'isPrototypeOf',
'propertyIsEnumerable',
'toString',
'valueOf',
'__proto__',
'toLocaleString'
] */

// При использовании Object.keys(current)
// ['b','a']