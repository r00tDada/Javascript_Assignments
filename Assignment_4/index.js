// Solve sum(1)(23)(34)(40)

// Method - 1
var sum1 = function (a) {
  return function (b) {
    return function (c) {
      return function (d) {
        return a + b + c + d;
      };
    };
  };
};

console.log(sum1(1)(23)(34)(40));
console.log(sum1(1)(2)(3)(4));

// Method - 2

// Assignment Two - Create a summation function
// User can add n number of inputs as function parameter, when null is passed as the last param show the summation result.
// Sum(9)(2)(null) -> 11
// Sum(9)(2)(10)(3)(5)(6)(4)(8)(2)(1)(null) -> 51

const sum2 = function(a){
  return function(b){
    if(typeof b === "number"){
      return sum2(a+b);
    }
    return a;
  }
}

console.log(sum2(9)(2)(null));
console.log(sum2(9)(2)(10)(3)(5)(6)(4)(8)(2)(1)(null));


