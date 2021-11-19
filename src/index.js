import http from 'http';

const server = http.createServer((req, res) => {

    if (req.method === 'GET') {
        res.writeHead(200, {'Content-type': 'application/json; charset=UTF-8'})
        res.write(`{"status":${res.statusCode},"message":"Mi primer servidor en Node.js"}`);
        return res.end();
    }
    res.writeHead(405, {'Content-type': 'text/html; charset=UTF-8'})
    res.write('<h1>Método no permitido</h1>');
    return res.end();

});

server.listen(8080, '0.0.0.0', (err) => {
    if (err) console.log(`Error: ${err.toString()}`);
    const {address} = server.address();
    console.log(`conexión abierta en http://${address}:8080`);
})