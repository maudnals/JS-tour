// ------------------------------------------------------------------------------
// ONE
// Where everything begins
// Create an object: the object literal
// ------------------------------------------------------------------------------
(function () {


  let maud = {
    name: "maud",
    age: 26,
    sayHi: function () {
      console.log(`${this.name} says hi`);
    }
  };


})();




// ------------------------------------------------------------------------------
// TWO
// Create objects that have the same structure:
// Basic factory function
// ------------------------------------------------------------------------------

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




// ------------------------------------------------------------------------------
// THREE
// Create objects that share the very same __proto__
// = OLOO 
// = prototypal inheritance (saves memory space and makes composition easy)
// ------------------------------------------------------------------------------


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
    /**
     * !!! if want the proto to be immutable,
     * const is not enough because it's an object!
     * So adding and modifying ppties will be allowed.
     * => use Object.freeze or Object.seal instead.
     */
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




// ------------------------------------------------------------------------------
// FOUR
// Compose objects
// Making code reusable and modular
// ------------------------------------------------------------------------------


// ⚠️ 
// For what follows I use character as proto
// But the same logics work wothout this contraint!!
// Qui peut le plus peut le moins!


// Option nope: classical inheritance (class Y extends X)
// AVOID!!!!
// ONLY 1 LEVEL IS OK


// Option A: simple compose with factory functions
// + with [[prototype]] delegation
// [because [prototype]] is good for memory saving
// NB: [[prototype]] delegation is not needed for this simple compose!
// if no need for a shared [[prototype]], even simpler: look at option C

(function () {


  function createCharacter(name, age) {
    const proto = {
      name: "default",
      age: 0,
      health: 100,
      // `this` is what enables prototype delegation
      // proto is just an object, so we can't pass a parameter to it.
      // so any function inside of it should be able to access the state.
      // that's what `this` gives us!
      // The only way to reference something external is to use `this`.
      sayHi: function () {
        console.log(`${this.name} says hi`);
      }
    }
    return Object.assign(
      Object.create(proto),
      {
        name,
        age
      }
    );
  }

  const cast = function () {
    console.log(`${this.name} is casting a spell`);
    this.aura--;
  }

  const fight = function () {
    console.log(`${this.name} is fighting`);
    this.stamina--;
  }

  function createPaladin(name, age) {
    return Object.assign(
      createCharacter(name, age),
      {
        aura: 100,
        cast: cast,
        stamina: 100,
        fight: fight
      },
    )
  }

  // alternative:
  // let state = {
  //   name: name,
  //   health: 100,
  //   stamina: 100,
  //   aura: 100
  // }
  // return Object.assign(
  //   Object.create(proto),
  //   state,
  //   {
  //     fight: fight,
  //     cast: cast
  //   }
  // );


  let x = createCharacter("x", 40);
  let y = createPaladin("y", 90);

})();


// Option B: Mixin classes
// (with some [[prototype]] stuff)
// [[prototype]] is good for memory saving
// in the style of https://medium.com/@declanjdewet/i-think-this-article-is-missing-a-more-detailed-section-on-class-mixins-ad6953ae2efd
// and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
/**
 * Abstract subclasses or mix-ins are templates for classes. 
 * A JS class can only have a single superclass, so multiple inheritance 
 * from tooling classes, for example, is not possible. 
 * The functionality must be provided by the superclass.
 * A JS Mixin = a function taking a superclass as input and outputing a 
 * subclass extending that superclass.
 */
// + See my medium question: https://medium.com/@uxseeds/hi-declan-42e0ada314d7

(function () {
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

})();



// Option C: simple concatenative inheritance
// better for truly independent objects, but less good for memory 

// with`this`:

(function () {
  const fight = function () {
    console.log(`${this.name} is fighting`);
    this.stamina--;
  }

  const cast = function () {
    console.log(`${this.name} is casting a spell`);
    this.aura--;
  }

  function createPaladin(name) {
    return Object.assign(
      {},
      {
        name: name,
        health: 100
      }, {
        stamina: 100,
        fight: fight,
      }, {
        aura: 100,
        cast: cast
      }
    );

    // createFighter, createMage: same logics
  }

  let paladin1 = createPaladin("paladin1");
  console.log(paladin1);
})();


// without `this`:
// upsides:
// - clear separation of state and methods
// - this-free code
// - less easily refactorable to a [[prototype]]-based implementation

(function () {
  const fight = (state) => {
    console.log(`${state.name} is fighting`);
    state.stamina--;
  }

  const cast = (state) => {
    // note arrow functions (no `this` needed here)
    console.log(`${state.name} is casting a spell`);
    state.aura--;
  }

  function createPaladin(name) {
    let state = {
      name: name,
      health: 100,
      stamina: 100,
      aura: 100
    }
    return Object.assign(
      {},
      state,
      {
        fight: fight,
        cast: cast,
      }
    );
  }
  // createFighter, createMage: same logics
  let paladin2 = createPaladin("paladin2");
  console.log(paladin2);
})();




// Option D (only for simple cases)
// from https://medium.com/@dtinth/es6-class-classical-inheritance-20f4726f4c4


(function () {
  class X {
  }

  class Y {
    constructor() {
      this.x = new X();
    }
  }
})();




// Option D: Eric's stuff









// ------------------------------------------------------------------------------
// Miscellaneous
// ------------------------------------------------------------------------------



// (Im)mutability considerations


/**
 * Objects
 * 
 * Object.assign is good for FP because it
 * copies objects instead of mutating them.
 */

/**
 * [[Proto]]
 * 
 * If i define myself an object as my [[Proto]],
 * I might want to make it immutable so that no objects using it as prototype
 * gets impacted.
 * const is not enough because it's an object.
 * So adding and modifying ppties will be allowed
 * ==> use Object.freeze or Object.seal (depending on what's needed) instead.
 */




 // API improvement ideas


 /**
  * cast() and spell() methods 
  * could return `this` to facilitate method chaining:
  * .cast().fight();
  */