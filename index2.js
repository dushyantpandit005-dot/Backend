const http=require("http");

const server=http.createServer((req,res)=> {
    res.writeHead(200,{"content-type":"text/html"});
    // res.end("<h1> This is a heading </h1>");
    res.write("<h1> this is a heading tag </h1>");
    res.write("<p> this is a paragraph tag</p>");
    res.end(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <table border="1">
        <tr>
            <th>Name</th>
            <th>Age</th>
        </tr>
        <tr>
            <th>Dushyant</th>
            <th>20</th>
        </tr>
    </table>
</body>
</html>`)

})

server.listen(8000,()=>{
    console.log(`server is running at address http://localhost:8000`);

});