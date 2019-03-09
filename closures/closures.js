// WHAT IS
// A closure is a stateful function

(function() {
  function greet(name) {
    return function() {
      console.log('hi, ' + name);
    };
  }

  greet('maud')();

  const greetMaud = greet('maud');
  greetMaud();
})();

console.log('--------------');

/**
 * USE CASE #1: function factories
 * = function factories can be used to create functions with the same execution context but a different environment
 */
(function() {
  function greetFactory(greeting) {
    return name => `${greeting}, ${name}`;
  }
  const greetEnglish = greet('hi');
  const greetFrench = greet('salut');
})();

console.log('--------------');

/**
 * USE CASE #2: revealing module pattern (OBJECT PRIVACY)
 */

const building = name =>
  (function() {
    const secretCode = 42;
    function getPublicCode() {
      return secretCode * 2;
    }
    return {
      name,
      getPublicCode
    };
  })();
// We can access the public code, but not the private one!
console.log(building('Allianz Arena').getPublicCode());

/**
 * USE CASE #3: see/understand the call stack
 * (like redux isDispatching)
 */
// ... not really...

(function() {
  function doThis() {
    let isWalking = false;
    function walk() {
      isWalking = true;
      playVideo();
    }
    function playVideo() {
      // thanks to the closure we now have a view on the call stack!
      // we know where the playVideo call came from:
      //    playVideo
      //    walk
      // So we can make playVideo behave accordingly, for example:
      if (isWalking) {
        // audio only
      } else {
        // normal play
      }
    }
  }
})();
