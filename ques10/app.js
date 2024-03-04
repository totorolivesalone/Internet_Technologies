const http=require('http');
const server=http.createServer(function(req,res){
 if(req.url =='/')
 {
    res.write("Hello world, this is my node js server");
    res.end();
 }
});
server.listen(3000);