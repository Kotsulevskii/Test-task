// Цикл for...of для объекта, который на каждой итерации получает ключ и значение
let obj = {
    a: 1,
    b: 2,
    c: 3,
  };
  
 for (const [key, value] of Object.entries(obj)) {
  console.log(key, value); // "a 1", "b 2", "c 3"
}