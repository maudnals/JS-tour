
// https://stackoverflow.com/questions/42781642/ecmascript2015-class-vs-object-create-vs-new-vs-object-setprototypeof

// class Animal{
//   constructor(name){
//       this.name = name;
//   } 
//   saySomething(){
//       console.log('Hi, my name is' + this.name);
//   }
// }

var Animal = function (name) {
  this.name = name;
}
Animal.prototype.saySomething = function () {
  console.log('hi, my name is ' + this.name);
}


var Cat = function (name) {
  Animal.call(this, name);
}
Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.saySomething = function () {
  console.log('Meow, my name is ' + this.name);
}