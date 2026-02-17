// const http=require("http");
// const fs=require("fs");
// const server=http.createServer((req,res)=>{
//     const log=`${Date.now()}:${req.url}new request received\n`;
//     fs.appendFile("file51.txt",log,(err)=>{
//         if(err){
//             console.log(err);
//         }
//         console.log(`Data has been appended successfully`);

//     })
//     res.end("this is my first server with fs and http module");
// });
// server.listen(8000,()=>{
//     console.log(`server is running at address http://localhost:8000`);
// })

console.log(process.argv);