const http = require('http');

const server = http.createServer((req, res) =>{

    if(req.url === '/home' && req.method === 'GET') {
        let person = {
            name:"Asad",
            age:"19",
        }
        res.end('<h1> HOME PAGE </h1>')
    }
    else if(req.url === '/contact' && req.method === 'GET') {
        res.end('<h1> CONTACT </h1>')
    } 
    res.end("Hello");
})

server.listen(5000, () =>{
    console.log("Server is running at port 5000")
})