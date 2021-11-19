import http from 'http';

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.write('<h1>Mi primer servidor en Node.js</h1>');
        return res.end();
    }
    res.write('<h1>Método no permitido</h1>');
    return res.end();

});

server.listen(8080, '0.0.0.0', (err) => {
    if (err) console.log(`Error: ${err.toString()}`);
    const {address} = server.address();
    console.log(`conexión abierta en http://${address}:8080`);
})