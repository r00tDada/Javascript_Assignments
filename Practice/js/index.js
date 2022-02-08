
class User{
  constructor(name,age,address){
    this.name = name;
    this.age = age;
    this.address = address;
  }

  display(){
    console.log(this.name + " "+this.age+" "+this.address);
  }
}

new User("Sourabh","23","Jabalpur").display();
