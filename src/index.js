import http from 'http';
import fs from 'fs';

/*const home = './src/index.html';

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset:UTF-8'});
    fs.readFile(home, (err, content) => {
        if (err) return console.log(err.toString());
        res.write(content);
        res.end();
    })
});

server.listen(8080, '0.0.0.0', (err) => {
    if (err) console.log(`Error: ${err.toString()}`);
    const {address} = server.address();
    console.log(`conexión abierta en http://${address}:8080`);
})*/
const home = `./src/html/index.html`
const notAllowedMethod = './src/html/error/not-allowed-method/index.html'
const server = http.createServer((request, response) => {
    if (request.method === 'GET') {
        response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' })
        fs.readFile(home, (err, content) => {
            if (err) {
                return console.log(err)
            }
            response.write(content)
            return response.end()
        })
    }
    response.writeHead(403, { 'Content-Type': 'text/html; charset=UTF-8' })
    fs.readFile(notAllowedMethod, (err, content) => {
        if(err) {
            return console.log(err);
        }
        response.write(content)
        return response.end()
    })
})

server.listen(8080, 'localhost', err => {
    if (err) {
        return console.log('Error: ', err)
    }
    const {port, address} = server.address()
    console.log(`Server opened listen on http://${address}:${port}`)
})