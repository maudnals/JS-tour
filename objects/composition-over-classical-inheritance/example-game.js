// Step 1 - start video game coding with mages and fighters

class Character {
  constructor(name) {
    // same as this.name = name; this.health = 100;
    Object.assign(this, {
      name,
      health: 100
    });
  }
  getName() {
    return this.name;
  }
}

class Fighter extends Character {
  constructor(name) {
    super(name);
    this.stamina = 100;
  }
  fight() {
    console.log(`${this.name} is fighting`);
    this.stamina--;
  }
}

class Mage extends Character {
  constructor(name) {
    super(name);
    this.aura = 100;
  }
  cast() {
    console.log(`${this.name} is casting a spell`);
    this.aura--;
  }
}


const x = new Character("x");
let gunar = new Fighter("Gunar");
let aradis = new Mage("Aradis");


// Step 2 - OK now we need a paladin character that can cast spells and fight...

// Forget about classical inheritance! Combine objects!

// Option 1 (concatenative inheritance 1/2)

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
  }

  let paladin1 = createPaladin("paladin1");
  console.log(paladin1);
})();


// Option 2 (concatenative inheritance 2/2)

// upsides: 
// - clear separation of state and methods
// - this-free code
// ... but how do i make sure there is stamina available when I use fight?

(function () {
  const fight = (state) => {
    console.log(`${state.name} is fighting`);
    state.stamina--;
  }

  const cast = (state) => {
    console.log(`${state.name} is casting a spell`);
    state.aura--;
  }


  function createFighter(name) {
    let state = {
      name: name,
      health: 100,
      stamina: 100,
    }
    return Object.assign(
      {},
      state,
      {
        fight: fight,
      }
    );
  }

  function createMage(name) {
    let state = {
      name: name,
      health: 100,
      aura: 100
    }
    return Object.assign(
      {},
      state,
      {
        cast: cast,
      }
    );
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

  let paladin2 = createPaladin("paladin2");
  console.log(paladin2);
})();



// Option 3 (prototype delegation)

// Interesting: `this` is what enables prototype delegation!
// Proto is a basic object, so we can't pass a parameter to it.
// The only way to reference something external is to use the this keyword.

const proto = {
  getName: function () {
    return this.name;
  }
}






// " this is what enables us to share prototypes "
// ... really ??


// class Bla {
//   constructor() {
//     this.name = "hdhdh";
//   }
// }

// class Bli {
// }

// let bla = new Bla();
// let bli = new Bli();