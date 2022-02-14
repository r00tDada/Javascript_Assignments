
function* numberGen(){
    let i=0;
    while(true){
        yield i;
        i++;
    }
}

const gen = numberGen();
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());




