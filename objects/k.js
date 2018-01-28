class Person {
  constructor(name, age) {
    Object.assign(
      this,
      {
        name,
        age
      }
    );
  }
  sayHi() {
    console.log(`${this.name} says hi`);
  }
}


const personProto = {
  name: "default",
  age: null,
  sayHi: function () {
    console.log(`${this.name} says hi`);
  }
}


// function createPerson(name, age) {
//   const 
//   return Object.assign(

//     {
//       name,
//       age
//     }
//   );
// }





let maud = new Person({ name: "maud", age: 26});

