// https://stackoverflow.com/questions/42781642/ecmascript2015-class-vs-object-create-vs-new-vs-object-setprototypeof

// class Animal{
//   constructor(name){
//       this.name = name;
//   }
//   sayHi(){
//       console.log('Hi, my name is' + this.name);
//   }
// }
// class Cat extends Animal {
//   constructor(name) {
//     super(name);
//   }
//   mew() {
//     console.log("mewwww");
//   }
// }

var Animal = function(name) {
  this.name = name;
};
Animal.prototype.saySomething = function() {
  console.log('hi, my name is ' + this.name);
};

var Cat = function(name) {
  Animal.call(this, name);
};
Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.saySomething = function() {
  console.log('Meow, my name is ' + this.name);
};

const a = new Animal('a');
a.__proto__; // Animal
a.__proto__.__proto__; // Object
const c = new Cat('c');
c.__proto__; // Animal, constructor class Cat
a.__proto__.__proto__; // Animal
a.__proto__.__proto__.__proto__; // Object
