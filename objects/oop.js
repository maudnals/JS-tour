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




// ------------------------------------------------
// FOUR
// Compose objects
// Making code reusable and modular
// ------------------------------------------------


// ⚠️ 
// For what follows I use character as proto
// But the same logics work wothout this contraint!!
// Qui peut le plus peut le moins!


// Option nope: classical inheritance (class Y extends X)
// AVOID!!!!
// ONLY 1 LEVEL IS OK


// Option A: simple compose with factory functions
// -> see MPJ
// NB: if no need for __proto__, even better: same logics but get rid of Object.create()

(function () {


  function createCharacter(name, age) {
    const proto = {
      name: "default",
      age: 0,
      health: 100,
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

  let x = createCharacter("x", 40);
  let y = createPaladin("y", 90);

})();



// Option B: Simple Mixin classes without internal state


// (function () {
//   const FighterMixin = Base => class extends Base {
//     fight() {
//       console.log(`${this.name} is fighting`);
//     }
//   };

//   const MageMixin = Base => class extends Base {
//     cast() {
//       console.log(`${this.name} is casting a spell`);
//     }
//   };

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

//   class Paladin extends FighterMixin(MageMixin(Character)) { }

//   let jon = new Paladin("jon", 30);
//   console.log(jon);
// })();







// Option B: Mixin classes
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



// Option C (only for simple cases)

function() {
  class X {
  }

  class Y {
    constructor() {
      this.x = new X();
    }
  }
}


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
// Miscellaneous
// ------------------------------------------------

// (Im)nutability considerations

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


 // API improvements

 /**
  * cast() and spell() methods 
  * could return `this` to facilitate method chaining:
  * .cast().fight();
  */















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