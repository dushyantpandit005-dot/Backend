function step1(){
    return new Promise((resolve,reject)=>{
        let database=true;
        if(database){
            resolve("step1 is complete");
        }
        else{
            reject("error in step1");
        }
    });
}
function step2(message){
    return new Promise((resolve,reject)=>{
        let resturentOpen=true;
        if(resturentOpen){
            resolve(message+" ==> step 2 complete");
        }
        else{
            reject("error in step 2");
        }
    });
}
function step3(message){
    return new Promise((resolve,reject)=>{
        let bug=true;
        if(bug){
            resolve(message+" ==> step 3 complete");
        }
        else{
            reject("error in step 2");
        }
    });
}
step1()
  .then((msg) => step2(msg))
  .then((msg) => step3(msg))
  .then((msg) => console.log("final message: ", msg))
  .catch((err) => console.log(err));