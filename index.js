// ------------------------------------------------
// The beginning of everything
// Create an object
// ------------------------------------------------
(function () {

  let maud = {
    name: "maud",
    age: 26
  };

})();

// ------------------------------------------------
// Create objects that have the same structure
// ------------------------------------------------
// Basic factory function
(function () {
  function createPerson(name, age) {
    return {
      name: name,
      age: age,
      getName: function () {
        return this.name;
      }
    };
  }
  let maud = createPerson("maud", 26);
  let john = createPerson("john", 28);
  console.log(maud);
  console.log(john);
}());
// But... getName method exists 2* in memory! => need something better.

// ------------------------------------------------
// One step further:
// Create objects that are really like other objects - ie that share the very same __proto__
// = OLOO 
// = prototypal inheritance (saves memory space and makes composition easy)
// ------------------------------------------------

// Option A: function constructors ("deprecated")
(function () {

  function Person(name, age) {
    this.name = name;
    this.age = age;
  }

  Person.prototype.getName = function () {
    return this.name;
  }

  let maud = new Person("maud", 26);
  let john = new Person("john", 28);
  // maud.__proto__ = john.__proto = Person's prototype
})();

// Option B1: pure prototypal inheritance with Object.create()
(function () {
  let person = {
    name: "default",
    age: null,
    getName: function () {
      return this.name;
    }
  }
  let maud = Object.create(person);
  maud.name = "maud";
  maud.age = 26;
  let john = Object.create(person);
  john.name = "john";
  john.age = 28;
  // maud.__proto__ = john.__proto = person's prototype
})();

// Option B2: like B1 but lighter syntax with Object.create() and a factory function
(function () {
  let person = {
    name: "default",
    age: null,
    getName: function () {
      return this.name;
    }
  }
  function createPerson(name, age) {
    let newPerson = Object.create(person);
    newPerson.name = name;
    newPerson.age = age;
    return newPerson;
  }
  let maud = createPerson("maud", 26);
  let john = createPerson("john", 28);
  console.log(maud);
  console.log(john);
  // maud.__proto__ = john.__proto = person's prototype
})();

// Option C: ES6 class
// = sugar coating over option A
(function () {
  class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
    getName() {
      return this.name;
    }
  }
  let maud = new Person("maud", 26);
  let john = new Person("john", 28);
  // maud.__proto__ = john.__proto = Person's prototype
  console.log(maud);
  console.log(john);
}());


