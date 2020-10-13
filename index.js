const http = require('http');
const path = require('path');
const fs = require('fs');
const serveStatic = require('serve-static');
const finalHandler = require('finalhandler');

const serve = serveStatic('public', {
  'index': ['index.html', 'index.htm']
});

const PORT = 4000;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });
    fs.readFile(
      path.join(__dirname, 'public', 'index.html'),
      'utf-8',
      (err, chunk) => {
        if (err) {
          throw err;
        }
        res.end(`${chunk}`);
      }
    );
  } else if (req.url === '/static') {
    res.writeHead(200, {
      'Content-Type': 'application/pdf'
    });
    fs.readFile(
      path.join(__dirname, 'public', 'static.pdf'),
      (err, chunk) => {
        if (err) {
          throw err;
        }
        res.end(chunk);
      }
    );
  } else if (req.url === '/static2') {
    res.writeHead(200, {
      'Content-Type': 'image/svg+xml'
    });
    fs.readFile(
      path.join(__dirname, 'public', 'man.svg'),
      (err, chunk) => {
        if (err) {
          throw err;
        }
        res.end(chunk);
      }
    );
  } else {
    serve(req, res, finalHandler(req, res));
  }
});

server.listen(process.env.PORT || PORT);
