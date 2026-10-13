// Servidor local para jugar a "La Sombra de Umbría".
// Uso:  node servidor-local.js     y abre  http://localhost:4321
const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 4321;
const root = __dirname;

const tipos = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.mp3': 'audio/mpeg', '.ogg': 'audio/ogg'
};

http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const file = path.join(root, p);
  if (!file.startsWith(root)) { res.writeHead(403); return res.end('prohibido'); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('no encontrado'); }
    res.writeHead(200, { 'Content-Type': tipos[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(data);
  });
}).listen(PORT, '127.0.0.1', () => console.log('Juego disponible en http://localhost:' + PORT));
