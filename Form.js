const http=require("http");

const server=http.createServer((req,res)=> {
    if(req.url==="/submission-form"){
        res.writeHead(200,{"content-type":"text/html"});
    res.end(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form>
        <labelfor="name ">Name</label>
        <input type="text" placeholder="enter your name"> <br>
        <input type="radio" value="male" name="gender">male <br>
        <input type="radio" value="female" name="gender">female <br>
        <input type="submit" value="submit">
    </form>
</body>
</html>`);
    }
    else if(req.url==="/"){
        res.end("This is home page");
    }
})
server.listen(8000,()=>{
    console.log(`server is running at address http://localhost:8000`);
});