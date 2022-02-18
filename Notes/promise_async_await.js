// Ques 1 : Execute Promises sequentially without using promise.all

const getPromise = (time) => { 
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Promise resolved for ${time}s`)
    }, time*1000)
  })
}

async function sequentially() {
  const promise_random_array = Array.from({ length: 10 }, () =>
  Math.floor(Math.random() * 10)
);
console.log(promise_random_array);

  console.log('Before For Each Loop')
  // promise_random_array.forEach(async (element,index) => {
  //   let response =  await getPromise(element);
  //   console.log(response);
  // });
  
  // for (let i of promise_random_array) {
  //   const result = await getPromise(i);
  //   console.log(result);
  // }
  console.log('After For Each Loop')
}

sequentially();


// // Ques 2 : Execute Promises sequentially untill the rejected once

// const promise_random_array = Array.from({ length: 10 }, () =>
//   Math.floor(Math.random() * 10)
// );
// console.log(promise_random_array);

// async function sequentially(promise_random_array) {
//   for (let i in promise_random_array) {
//     try {
//       let response = await promise(i);
//       console.log(response);
//     } catch (err) {
//       console.log(err);
//       return;
//     }
//   }
// }

// sequentially(promise_random_array);

// function promise(idx) {
//   return new Promise(function (resolve, reject) {
//     setTimeout(() => {
//       let error = false;
//       if (idx == 2) {
//         error = true;
//       }
//       if (!error) {
//         resolve("resolve " + Number(Number(idx) + 1));
//       } else {
//         reject("reject at " + Number(Number(idx) + 1));
//       }
//     }, promise_random_array[idx] * 1000);
//   });
// }
