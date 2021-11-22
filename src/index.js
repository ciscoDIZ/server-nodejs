import http from 'http';
import fs from 'fs';
import path from "path";


const server = http.createServer((request, response) => {
   let filePath = request.url;
   if (filePath === '/') {
       filePath = 'index.html';
   }

   const extname = path.extname(filePath);

   let contentType = '';
   switch (extname) {
       case '.css':
           contentType = 'text/css';
           filePath = '.'+filePath;
           break;
       case '.html':
           contentType = 'text/html';
           filePath = `./src/assets/html/${filePath}`;
           break;
       case '.ico':
           contentType = 'image/x-ico';
           filePath = '.'+filePath;
           break;

   }
    response.writeHead(200, {'Content-Type': `${contentType}; charset=UTF-8`});
   fs.readFile(filePath, (err, content) => {
      if(err) return console.log(err);
      response.write(content);
      response.end();
   });
})

server.listen(8081, '0.0.0.0', err => {
    if (err) {
        return console.log('Error: ', err)
    }
    const {port, address} = server.address()
    console.log(`Server opened listen on http://${address}:${port}`)
})