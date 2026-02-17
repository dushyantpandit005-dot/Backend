// fetch("https://jsonplaceholder.typicode.com/users").then(response=>response.json()).then(data=>console.log(data)).catch(error=>console.log(error));
async function getUser(){
    try{
        const res=await fetch("https://jsonplaceholder.typicode.com/users");
        const data=await res.json();
    }
    catch{
        console.log("error");
    }
}
getUser();