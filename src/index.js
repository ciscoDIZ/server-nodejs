import http from 'http';
import fs from 'fs';
import path from "path";
import mongoose from 'mongoose';

const host = 'mongodb://127.0.0.1:27017/films';

mongoose.set('debug', true);
mongoose.Promise = global.Promise

const connection = mongoose.createConnection(
    host,
    {maxPoolSize: 200}
);

connection.on('error', (error=>{
    console.log(error);
    return process.exit(1);
}));

connection.on('connected', () => {
    console.log('mongo conectado con éxito');
});

const filmSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        title: {type: String, trim: true, required: true},
        poster: {type: String, trim: true, required: true},
    },
    {strict: false}
);

const Film = connection.model('Film', filmSchema);

const filmDocument = new Film(
    {
        _id: new mongoose.Types.ObjectId(),
        title: '12 Monos',
        poster: 'https://fanart.tv/fanart/movies/63/movieposter/12-monkeys-55dc4423bbb69.jpg',
    }
);
filmDocument.save((error => {
    console.log(error)
}))

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