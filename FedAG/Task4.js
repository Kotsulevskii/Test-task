// Функция по определению пустоты массива или объекта

function isEmpty(obj) {
     // Проверяем, является ли obj массивом
    if (Array.isArray(obj)) { 
        // Если массив пуст, вернём true        
        return obj.length === 0;   
    // Проверяем, что obj - объект (не null)        
    } else if (typeof obj === 'object' && obj !== null) { 
         // Если у объекта нет ключей, вернём true
        return Object.keys(obj).length === 0;  
    }
    // Вернем false, если obj не объект и не массив 
    return false;  
}

// Пример использования:
console.log(isEmpty({"x": 5, "y": 42})) // false
console.log(isEmpty({})) // true
console.log(isEmpty([null, false, 0])) // false