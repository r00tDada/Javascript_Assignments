
var start,end;
let promise = new Promise(function(resolve, reject) { 
    start = new Date().getTime();
    setTimeout(() => resolve(), 1000);
}).then(function() {
    console.log("Promise 1")
    return new Promise(function (resolve, reject){
        setTimeout(() => resolve(), 3000);
    });
}).then(function() {
    console.log("Promise 2")
    return new Promise(function (resolve, reject){
        setTimeout(() => resolve(), 2000);
    });
}).then(function() {
    console.log("Promise 3")
    return new Promise(function (resolve, reject){
        setTimeout(() => resolve(), 5000);
    });
}).then(function() {
    console.log("Promise 4")
    return new Promise(function (resolve, reject){
        setTimeout(() => resolve(), 6000);
    });
}).then(function() {
    console.log("Promise 5")
    return new Promise(function (resolve, reject){
        setTimeout(() => resolve(), 2000);
    });
}).then(function() {
    console.log("Promise 6")
    return new Promise(function (resolve, reject){
        setTimeout(() => resolve(), 1000);
    });
}).then(function() {
    console.log("Promise 7")
    return new Promise(function (resolve, reject){
        setTimeout(() => resolve(), 3000);
    });
}).then(function() {
    console.log("Promise 8")
    return new Promise(function (resolve, reject){
        setTimeout(() => resolve(), 4000);
    });
}).then(function() {
    console.log("Promise 9")
    return new Promise(function (resolve, reject){
        setTimeout(() => resolve(), 2000);
    });
}).then(function() {
    console.log("Promise 10")
    return new Promise(function (resolve, reject){
        setTimeout(() => resolve(), 0);
    });
}).then(()=>{
    end = new Date().getTime();
    console.log("Execution time",end_all-start_all);
});

