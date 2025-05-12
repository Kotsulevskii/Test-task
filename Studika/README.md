# Инструкция по запуску проекта
Этот проект использует модули и файловые операции, которые требуют запуска через **HTTP-сервер** (из-за политики безопасности CORS в браузерах).

# Как избежать ошибки
"Cross-origin requests are only supported for HTTP"
Эта ошибка возникает, если открывать файлы напрямую (file://). Решение — использовать **локальный сервер**.

# Способы запуска:
1. live-server 

2. http-server

3. Ручной сервер на Node.js

``` javascript
let http = require('http');
let fs = require('fs');

let server = http.createServer((req, res) => {
  // Читаем файл data.json
  fs.readFile('menu.json', (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end('Ошибка чтения файла');
    }
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(data); 
  });
});

server.listen(3000, () => {
  console.log('Сервер запущен на http://localhost:3000');
});
``