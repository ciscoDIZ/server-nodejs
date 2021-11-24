import http from 'http';
import fs from 'fs';
import path from "path";
import Sequelize from 'sequelize';


const sequelize = new Sequelize('app_data', 'postgres', '123456', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    }
});

const Film = sequelize.define(
    'Film',
    {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            field: 'id',
            primaryKey: true,
        },
        title: {
            type: Sequelize.STRING,
            field: 'title',
        },
        poster: {
            type: Sequelize.STRING,
            field: 'poster',
        }
    },
    {freezeTableName: true}
);

Film.sync({force: true})
    .then(() => Film.create({
        title: '12 Monos',
        poster: 'http://www.cartelesmix.com/carteles/cienciaficccion/12monos/docemonos29.jpg'
    }))
    .catch(error => console.log(error));

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