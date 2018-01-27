// There are 3 types of prototypal inheritance.


let persons = [];

// #1 PROTOTYPE DELEGATION

// An object serves as a base for another object.
// Object A gets a reference to object P as its prototype.
// Good for: memory savings

// + shall i use const???

(function prototypeDelegation() {

  // with a factory function:

  let person = {
    // Ppties will be shared but are more likely to be overriden.
    name: 'default',
    age: 0,
    species: 'human',
    // Methods: super useful, great to share them!
    getName: function () {
      return this.name;
    }
  }

  let maud = Object.assign(Object.create(person), { name: 'maud', age: 27 });

  // same with a class:

  class Person {
    constructor(name = 'default', age = 0) {
      Object.assign(this, { name, age, species: 'human' });
    }
    getName() {
      return this.name;
    }
  }

  let jo = new Person('jo', 40);

  // same with a constructor function
  // (old, but that's what class desugars to)
  //...

  persons = [...persons, maud, jo];
})();


/** ⚠️
 * Object.assign({}, ...)
 * vs.
 * Object.create(x)
 * mostly we use Object.create with just one argument.
*/


// #2 CLONING (= CONCATENATIVE INHERITANCE) (= EXTENDING OBJECTS)
// It's a form of composition.

// Properties are copied form P to X WITHOUT retaining a reference.
// Good for: objects with individual state

(function cloning() {
  let person = {
    name: 'default',
    age: 0,
    species: 'human',
    getName: function () {
      return this.name;
    }
  }

  let scar = Object.assign(
    {},
    person,
    {
      name: 'scar',
      age: 29
    });

  persons = [...persons, '---', scar];

  // cloning is commonly used to apply mixins

  let nalpasMixin = {
    // shared behaviours
    rootLocation: 'oise',
    goesRunning: function () {
      console.log(`run along ${this.rootLocation}`)
    },
  }

  let juliet = Object.assign(
    {},
    person,
    {
      name: 'juliette',
      age: 56
    },
    nalpasMixin
  );

  let jerome = Object.assign(
    {},
    person,
    {
      name: 'jerome',
      age: 59
    },
    nalpasMixin
  );

  nalpasMixin = {
    // not reassigned
    bla: function () {
    },
  }
  persons = [...persons, '---', juliet, jerome];

})();

console.log(persons);


// #3 FUNCTIONAL INHERITANCE
// = factory functions then cloning
// = concatenative inheritance with closures 

(function functionalInheritance() {

  let person = {
    name: 'default',
    age: 0,
    species: 'human',
    getName: function () {
      return this.name;
    }
  }

  const nalpasMixin = function () {
    const rootLocation = 'oise';
    // use closure to ensure privacy
    // now rootLocation can not be available from public API,
    // the only way to use it is via privileged methods
    // privileged methods = methods defined within the closure's function scope
    return {
      goesRunning: function () {
        console.log(`run along ${rootLocation}`);
      }
    }
  };

  let maud = Object.assign(
    {},
    person,
    {
      name: 'maud',
      age: 27
    },
    nalpasMixin()
  );

  persons = [...persons, '---', maud];

})();