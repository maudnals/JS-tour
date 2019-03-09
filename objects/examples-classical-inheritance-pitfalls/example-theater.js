// Example of classical inheritance - what should NOT be done

class Person {
  constructor({ name = 'default', age = 16 } = {}) {
    Object.assign(this, {
      name,
      age
    });
  }
  getName() {
    return this.name;
  }
}

class Actor extends Person {
  constructor({ name, age, auraScore } = {}) {
    super({ name, age });
    // same as this.auraScore = auraScore;
    Object.assign(this, {
      auraScore
    });
  }
}

class Improvisator extends Actor {
  // here as we start to have lots of options let's use a lighter syntax
  constructor(options = {}) {
    super(options);
    this.improStyle = options.improStyle;
    this.teamColor = options.teamColor;
  }
}

// 🙀 And here things start going wrong
// - Referee isn't really an Improvisator
// - Referee absolutely doesn't need a teamColor
// - Referee doesn't exactly need an improStyle
class Referee extends Improvisator {
  constructor(options = {}) {
    super(options);
    this.hasAWhistle = options.hasAWhistle;
  }
}

let x = new Person({ name: 'x', age: 30 });

let maud = new Actor({ name: 'maud', age: 26, auraScore: 100 });

let joe = new Improvisator({
  name: 'joe',
  age: 28,
  auraScore: 140,
  improStyle: 'savage',
  teamColor: 'green'
});

let david = new Referee({
  name: 'david',
  age: 40,
  auraScore: 80,
  improStyle: 'badcop',
  teamColor: '',
  hasAWhistle: true
});

console.log(x);
console.log(maud);
console.log(joe);
console.log(david);
