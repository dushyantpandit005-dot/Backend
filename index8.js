function orderFood(){
    return new Promise((resolve,reject)=>{
        let resturentOpen=true;
        if(resturentOpen){
            resolve("your food will be ready soon");
        }
        else{
            reject("Sorry ! can not serve your food today");
        }
    });
}
orderFood()
    .then(message=>{
        console.log(message);
    })
    .catch((error)=>{
        console.log(error)
    });