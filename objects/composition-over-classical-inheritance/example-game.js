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

// Forget about classical inheritance! 
// Combine objects instead!

// see: oop.js