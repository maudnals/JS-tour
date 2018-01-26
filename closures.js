// WHAT IS
// A closure is a stateful function

(function () {
  function greet(name) {
    return function () {
      console.log('hi, ' + name);
    }
  }

  greet("maud")();

  const greetMaud = greet("maud");
  greetMaud();
})();

console.log("--------------");

/**
 * USE CASE #1: function factories
 * = function factories can be used to create functions with the same execution but a different environment
 */
(function () {

  function greet(greeting, name) {
    return function (name) {
      console.log(`${greeting}, ${name}`);
    }
  }

  const greetEnglish = greet("hi");
  const greetFrench = greet("salut");
  greetFrench("maud");
})();

console.log("--------------");

/**
 * USE CASE #2: revealing module pattern (OBJECT PRIVACY)
 */

(function () {
  const maud = (function () {
    const secretCode = 42;
    function getPublicCode() {
      return secretCode * 2;
    }
    return {
      name: "maud",
      age: 26,
      gender: "F",
      official: function () {
        return (getPublicCode());
      }
    }
  }
  )();
  console.log(maud);
  console.log(maud.official());
})();


/**
 * USE CASE #3: see/understand the call stack
 * (like redux isDispatching)
 */

(function () {
  function doThis() {
    let isWalking = false;
    function walk() {
      isWalking = true;
      playTEDTalk();
    }
    function playTEDTalk() {
      // thanks to the closure we now have a view on the call stack!
      // we know where the playTEDTalk call came from:
      //    playTEDTalk
      //    walk
      // So we can make playTEDTalk behave accordingly, for example:
      if (isWalking) {
        // audio only
      } else {
        // normal play
      }
    }
  }
})();