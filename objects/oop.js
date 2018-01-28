// ------------------------------------------------
// ONE
// Where everything begins
// Create an object: the object literal
// ------------------------------------------------
(function () {


  let maud = {
    name: "maud",
    age: 26,
    sayHi: function () {
      console.log(`${this.name} says hi`);
    }
  };


})();




// ------------------------------------------------
// TWO
// Create objects that have the same structure:
// Basic factory function
// ------------------------------------------------

// Option A: factory function
(function () {


  function createPerson(name, age) {
    // or: simple return { }
    return Object.assign(
      {},
      {
        name,
        age,
        sayHi: function () {
          console.log(`${this.name} says hi`);
        }
      });
  }


  let maud = createPerson("maud", 26);
  let john = createPerson("john", 28);
  // maud.__proto__ and john.__proto = simple Object
}());

// Option A':
// variation with closure for privacy



// ::::::::::::::::::::::::::::::::::::::::::::::::
// But... sayHi method exists 2* in memory! => need something better.
// ::::::::::::::::::::::::::::::::::::::::::::::::




// ------------------------------------------------
// THREE
// Create objects that share the very same __proto__
// = OLOO 
// = prototypal inheritance (saves memory space and makes composition easy)
// ------------------------------------------------


// Option A: function constructors ("deprecated")
(function () {

  function Person(name, age) {
    this.name = name;
    this.age = age;
  }

  Person.prototype.sayHi = function () {
    console.log(`${this.name} says hi`);
  }

  let maud = new Person("maud", 26);
  let john = new Person("john", 28);
  // maud.__proto__ = john.__proto = Person's prototype
})();


// Option B1 pure prototypal inheritance with Object.create()
(function () {
  let person = {
    name: "default",
    age: null,
    sayHi: function () {
      console.log(`${this.name} says hi`);
    }
  }
  // let maud = Object.assign(
  //   Object.create(person),
  //   {
  //     age,
  //     name
  //   }
  // );
  // maud.__proto__ = john.__proto = person's prototype
})();


// Option B2: like B1 but lighter syntax with Object.create() and a factory function and a closure
(function () {
  function createPerson(name, age) {
    // closure
    const personProto = {
      name: "default",
      age: null,
      sayHi: function () {
        console.log(`${this.name} says hi`);
      }
    }
    // !!! if want the proto to be immutable,
    // const is not enough because it's an object!
    // adding and modifying ppties will be allowed!!!
    // use Object.freeze or Object.seal instead.
    return Object.assign(
      Object.create(personProto),
      {
        // shorthand for name:name, age
        name,
        age
      }
    );
  }
  let maud = createPerson("maud", 26);
  let john = createPerson("john", 28);
  // maud.__proto__ = john.__proto = person's prototype
})();


// Option B2': like B2 but with utils/other stuff in closure for privacy

// Option C: ES6 class (sugar coating over option A)
(function () {
  class Person {
    constructor(name, age) {
      Object.assign(
        this,
        {
          name,
          age
        });
    }
    sayHi() {
      console.log(`${this.name} says hi`);
    }
  }
  let maud = new Person("maud", 26);
  let john = new Person("john", 28);
  // maud.__proto__ = john.__proto = Person's prototype
  // and automatically methods are in the __proto__
}());


// Option C': alternative syntax (pass in an options object)
(function () {
  class Person {
    constructor({ name = "default", age = 0 } = {}) {
      Object.assign(this, {
        name,
        age
      });
    }
  }
}());




// ::::::::::::::::::::::::::::::::::::::::::::::::
// OK, now i can create objects with shared prototypes.
// This saves memory, but what if I want separated states?
// And how to create objects partly-similar to each other?
// And make code really reusable?
// ::::::::::::::::::::::::::::::::::::::::::::::::




// ------------------------------------------------
// FOUR
// Compose objects
// Making code reusable and modular
// ------------------------------------------------

// Option nope: classical inheritance (class Y extends X)
// AVOID!!!!
// ONLY 1 LEVEL IS OK

// Option A: simple compose with factory functions
// -> see MPJ









// A2: like A1, but with classes (?)
// the asian dude




// Option B1: Simple Mixin classes without internal state
// in the style of https://medium.com/@declanjdewet/i-think-this-article-is-missing-a-more-detailed-section-on-class-mixins-ad6953ae2efd
// and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

// Abstract subclasses or mix-ins are templates for classes. An ECMAScript class can only have a single superclass, so multiple inheritance from tooling classes, for example, is not possible. The functionality must be provided by the superclass.
// A JS Mixin:
// A function taking a superclass as input and outputing a subclass extending that superclass.

(function () {
  const FighterMixin = Base => class extends Base {
    fight() {
      console.log(`${this.name} is fighting`);
    }
  };

  const MageMixin = Base => class extends Base {
    cast() {
      console.log(`${this.name} is casting a spell`);
    }
  };

  class Character {
    constructor(name, age) {
      Object.assign(
        this,
        {
          health: 100,
          name,
          age
        }
      );
    }
    sayHi() {
      console.log(`${this.name} says hi`);
    }
  }

  class Paladin extends FighterMixin(MageMixin(Character)) { }

  let jon = new Paladin("jon", 30);
  console.log(jon);
})();







// Option B3: Mixin classes WITH state
// I DONT KNOW
// see my medium question
// https://medium.com/@uxseeds/hi-declan-42e0ada314d7
// maybe a solution is to pass in the state??

// (function () {
const FighterMixin = Base => class extends Base {
  fight() {
    console.log(`${this.name} is fighting`);
    this.stamina--;
  }
};

const MageMixin = Base => class extends Base {
  cast() {
    console.log(`${this.name} is casting a spell`);
    this.aura--;
  }
};

class Character {
  constructor(name, age) {
    Object.assign(
      this,
      {
        health: 100,
        name,
        age
      }
    );
  }
  sayHi() {
    console.log(`${this.name} says hi`);
  }
}

class Paladin extends FighterMixin(MageMixin(Character)) {
  constructor(name, age) {
    super(name, age);
    this.stamina = 100;
    this.aura = 100;
  }
}

let jon = new Paladin("jon", 30);
jon.cast();
jon.fight();
console.log(jon);


  // imrpovement idea:
  // for method binding:
  // return this;
// })();


// class Character {
//   constructor(name, age) {
//     Object.assign(
//       this,
//       {
//         health: 100,
//         name,
//         age
//       }
//     );
//   }
//   sayHi() {
//     console.log(`${this.name} says hi`);
//   }
// }

// let FighterMixin = Base => class extends Base {
//   // can't define stamina here!!
//   fight() {
//     console.log(`${this.name} is fighting`);
//     this.stamina--;
//   }
// };

// let MageMixin = Base => class extends Base {
//   constructor(a, b) {
//     super(a, b);
//     this.aura = 100;
//   }
//   cast() {
//     console.log(`${this.name} is casting a spell`);
//     this.aura--;
//   }
// };

// class Character {
//   constructor(name, age) {
//     Object.assign(
//       this,
//       {
//         health: 100,
//         name,
//         age
//       }
//     );
//   }
//   sayHi() {
//     console.log(`${this.name} says hi`);
//   }
// }
// class Paladin extends MageMixin(Character) {
// }
// let paladin = new Paladin("jon", 30);
// console.log(paladin);






// Option C: copy objects
// with Object.assign


// Option D: Eric's stuff



// ------------------------------------------------
// Mutability considerations
// ------------------------------------------------

// Object.assign: copies objects instead of mutating them

// Object.freeze / Object.seal
// if an object is my prototype, I might want to make it immutable so that no other objects using it as prototype don't get impacted.
// const is not enough because it's an object, so adding and modifying ppties will be allowed!!!


















// (function () {
//   class Character {
//     constructor(name, age) {
//       Object.assign(
//         this,
//         {
//           health: 100,
//           name,
//           age
//         }
//       );
//     }
//     sayHi() {
//       console.log(`${this.name} says hi`);
//     }
//   }
//   class FighterTrait {
//     constructor(name, age) {
//       this.identity = new Character(name, age);
//       this.stamina = 100;
//     }
//     fight() {
//       console.log(`${this.name} is fighting`);
//       this.stamina--;
//     }
//   }
//   class MageTrait {
//     constructor(name, age) {
//       this.identity = new Character(name, age);
//       this.aura = 100;
//     }
//     cast() {
//       console.log(`${this.name} is casting a spell`);
//       this.aura--;
//     }
//   }
//   class Paladin {
//     constructor(name, age) {
//       this.identity = new Character(name, age);
//       this.magetrait = new MageTrait(name, age);
//       this.fighterTrait = new FighterTrait(name, age);
//     }
//   }

//   let g = new Paladin("g", 34);
//   console.log(g);
// }());