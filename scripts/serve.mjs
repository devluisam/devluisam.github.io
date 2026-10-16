// Servidor local para conferir o site: npm run serve  (http://localhost:4300)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const [, , dir = '.', port = '4300'] = process.argv;
const root = path.resolve(dir);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain', '.ico': 'image/x-icon' };

http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let f = path.join(root, p);
  if (!f.startsWith(root)) { res.writeHead(403).end(); return; }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) {
    if (!p.endsWith('/')) { res.writeHead(301, { Location: p + '/' }).end(); return; }
    f = path.join(f, 'index.html');
  }
  if (!fs.existsSync(f)) {
    const nf = path.join(root, '404.html');
    res.writeHead(404, { 'Content-Type': types['.html'] }).end(fs.existsSync(nf) ? fs.readFileSync(nf) : 'not found');
    return;
  }
  res.writeHead(200, { 'Content-Type': types[path.extname(f).toLowerCase()] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
}).listen(Number(port), () => console.log('serving', root, 'on', port));
