const myArray =['apples','oranges','grapes']
console.log(myArray);

function fruitIterators(values){
    let nextIndex = 0;
    //we will return an object
    return {
        next: function(){
            if(nextIndex<values.length){
                //We will return the below object;
                return {
                    value: values[nextIndex++],
                    done: false
                }
            }
            else{
                //We will return the below object with only done
                return{
                    done: true
                }
            }
        }
    }
}

// Using the iterators

const fruits = fruitIterators(myArray);
console.log(fruits.next());
console.log(fruits.next());
console.log(fruits.next());
console.log(fruits.next());
