const url = require('url');
let address = 'https://www.example.com/category/search?name=akash&age=21#section4';
const myURL = url.parse(address, true);
console.log(myURL);