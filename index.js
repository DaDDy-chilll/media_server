let http = require('http');
let url = require('url');
require('dotenv').config();

let routes = {
    "GET":{
        "/":(req,res,path)=>{
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end(`<h1>Get method => / route</h1>`);
            console.log('method GET and path /');
        },
        "/home":(req,res,path)=>{
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end(`<h1>Get method => /home route  with ${path.query.name} and ${path.query.age} </h1>`);
            console.log('method GET and path /home');
        }
    },
    "POST":{
        "/":(req,res,path)=>{
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end(`<h1>Post method => / route</h1>`);
            console.log('method Post and path /')
        },
        "/about":(req,res,path)=>{
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end(`<h1>Post method => /about route</h1>`);
            console.log('method post and path /about')
        }
    },
    "NA":(req,res,path)=>{
        res.writeHead(404);
        res.end(`<h1>No page for that route!</h1>`)
    }
}
let start = (req,res)=>{
   let reqMethod = req.method;
   let path = url.parse(req.url,true);
//    let name = path.query.name;
//    let age = path.query.age;
//    console.log('Name ', name,'age ',age);
   let resolveRoute = routes[reqMethod][path.pathname];
   if(resolveRoute != null && resolveRoute != undefined){
       resolveRoute(req,res);
   }else{
        routes["NA"](req,res);
   }
//    res.end();
   
}
let server = http.createServer(start);
server.listen(process.env.PORT,function(){
    console.log(`Server is running on port ${process.env.PORT}`);
});