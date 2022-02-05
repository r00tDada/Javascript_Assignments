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

const sum2 = function(a){
  return function(b){
    if(typeof b === "number"){
      return sum2(a+b);
    }
    return a;
  }
}

console.log(sum2(1)(3)(4)(5)(6)(7)());


