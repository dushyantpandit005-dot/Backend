const mypromise=new Promise((resolve,reject)=>{
    let success=false;
    if(success){
        setTimeout(()=>{resolve("this will run after 2 seconds")},2000);
    }
    else{
        reject("this will not run due to some error");
    }
});
mypromise
    .then(message=>{
        console.log(message);
    })
    .catch((error)=>{
        console.log(error)
    });