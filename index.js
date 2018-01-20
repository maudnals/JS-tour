// ------------------------------------------------
// The beginning of everything
// Create an object basics: the object literal
// ------------------------------------------------
(function () {

  let maud = {
    name: "maud",
    age: 26,
    getName: function () {
      return this.name;
    }
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
  // maud.__proto__ and john.__proto = simple Object
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
  function createPerson(name, age) {
    // closure
    let person = {
      name: "default",
      age: null,
      getName: function () {
        return this.name;
      }
    }
    return Object.assign(Object.create(person), {
      // or shorthand name, age
      name: name,
      age: age
    });
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
  // and automatically methods are in the __proto__
}());



// ------------------------------------------------
// Compose objects
// ------------------------------------------------

// Option A

class Identity {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  getName() {
    return this.name;
  }
}
class Improvisator {
  constructor(name, age, improStyle) {
    this.identity = new Identity(name, age);
    this.improStyle = "savage";
  }
  // ... stay flexible
  // => construct always small objects so that it's easy to compose
}
// DON'T: DONT INHERIT (`extend`) FROM PERSON, THAT WOULD BE CLASSICAL INHERITANCE,
// AND IN JS WE FAVOR COMPOSITION AND PROTOTYPAL INHERITANCE OVER CLASSICAL INHERITANCE.
// One case where that's OK is when creating a Y that is really a X. That's OK: class MyApp extends React.Component (MyApp really is a react component, nothing more, nothing less). But because a JS class is already an object, keep in mind that Y inherits from X which exists.

 // Option B: mixins



// ------------------------------------------------
// Other object operations
// ------------------------------------------------

// Copy objects with object.assign
