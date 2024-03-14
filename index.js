const http = require('http');
const fs = require('fs');
const server = http.createServer();
const port = 3000;
const host = 'localhost';


server.listen(port, host, ()=>{console.log(`Server works at http://${host}:${port}`)});
server.on('request', (request, response)=>{
    function sendFile(type){
        let path = request.url.slice(1);
        let file = fs.readFileSync(path, "utf8");

        response.writeHead(200, {'Content-Type': type});
        response.end(file);
    }
    switch(request.url){
        case '/':
            let index = fs.readFileSync("index.html", "utf8");
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(index);
            break;
        case '/src/css/style.css':
            sendFile('text/css');
            break;
        case '/src/js/script.js':
            sendFile('text/plain');
            break;
        case '/src/js/script.js':
            sendFile('text/plain');
            break;
        case '/src/icons/loupe.svg':
            sendFile('image/svg+xml');
            break
        case '/src/icons/mail.svg':
            sendFile('image/svg+xml');
            break
        case '/src/icons/phone.svg':
            sendFile('image/svg+xml');
            break
        case '/src/icons/close.svg':
            sendFile('image/svg+xml');
            break
        case '/term':
            let filter = '';
            request.on("data", chunk => {
                filter += chunk;
            });

            request.on("end", () => {
                fs.readFile('./users.json', 'utf8', (err, data) => {
                    if (err) {
                        console.log('File read failed:', err);
                        return;
                    }
                    response.writeHead(200, {'Content-Type': 'application/json'});
                    if (filter) {
                        const result = JSON.parse(data).filter((elem)=> elem.name.toLowerCase().search(filter.toLowerCase()) !== -1);
                        response.end(JSON.stringify(result));
                    }
                    else {
                        response.end(data);
                    }
            
                })
            })
            break
        default:
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.end('404 File Not Found');
    }
});