const { path } = require('express/lib/application');
let http = require('http');
let fs = require('fs');
let url = require('url');
let qs = require('querystring');
require('dotenv').config();
let responder = (req,res,path)=>{
    res.writeHead(200,{'Content-Type':'text/html'});
    path.pipe(res);
    // res.end(path)
}

let routes = {
    "GET":{
        "/":(req,res)=>{
            let filePath = __dirname + '\\index.html';
            let myReadStr = fs.createReadStream(filePath);
            responder(req,res,myReadStr);
            console.log('method GET and path /' + filePath);
        },
        "/home":(req,res)=>{
            responder(req,res,`<h1>Get method => /home route  with ${path.query.name} and ${path.query.age} </h1>`)
            console.log('method GET and path /home');
        },
        '/index':(req,res)=>{
            let filePath = __dirname + '\\index.html';
            let myReadStr = fs.createReadStream(filePath);
            responder(req,res,myReadStr);
        },
        '/about':(req,res)=>{
            let myReadStr = fs.createReadStream('about.html');
            let filePath = __dirname + '\\about.html';
            responder(req,res,myReadStr);
        }
    },
    "POST":{
        "/":(req,res)=>{
            responder(req,res,`<h1>Post method => / route  with ${path.query.name} and ${path.query.age}</h1>`)
            console.log('method Post and path /');
        },
        "/api/login":(req,res)=>{
            let body = '';
            req.on('data',data=>{
                body += data;
                if(body.length > 1024){
                    res.writeHead(403,{'Content-Type':'text/html'});
                    res.end(`<h1>Files size is too large</h1>`);
                }
            });
            req.on('end',()=>{
                let query = qs.parse(body);
                console.log(`Email = ${query.gmail} and password = ${query.password}`);
                res.end();
            })
        }
    },
    "NA":(req,res,path)=>{
        res.writeHead(404);
        res.end(`<h1>No page for that route!</h1>`);
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
        routes["NA"](req,res,);
   }
//    res.end();
   
}
let server = http.createServer(start);
server.listen(3000,function(){
    console.log(`Server is running on port 3000`);
});