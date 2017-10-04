(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === undefined ? array[array.length - 1] : n === 0 ? [] : array.slice(-n); 
  };
  //alternate solution
  // _.last = function(array, n) {
  //   return n === undefined ? array[array.length - 1] : array.slice(Math.max(0, array.length-1)); 
  // };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
 _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
    	//per solution vid - rename object iterator to 'key' for clarity
      for (var key in collection) {
        iterator(collection[key], key, collection);
      } 
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var firstIndex = -1;
    var findMatch = function(value, index) {
      if (value === target && firstIndex === -1) {
        firstIndex = index;
      }
    }
    _.each(array, findMatch);
    return firstIndex;

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var filtered = [];
    _.each(collection, function(value) {
      if (test(value)) {
        filtered.push(value);
      }
    });
    return filtered;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
  	//per solution vids - implement _.filter where the test iterator reverses the test's boolean
    return _.filter(collection, function(value) {
    	return !test(value);
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
	//per solutions vid. - use intermediary storage object to reduce time complexity - this is called BREADCRUMBING
	//objects have constant time lookup
  var unique = {};
  var results = [];
  _.each(array, function(value) {
  	unique[value] = value;
  });
  _.each(unique, function(value) {
  	results.push(value);
  });
  return results;
};


  // Return the results of applying an iterator to each element.
  //per solution vid - pass in value, key, and collection to _.each
  _.map = function(collection, iterator) {
    var mapped = [];
   _.each(collection, function(value, key, collection) {
    mapped.push(iterator(value, key, collection));
    });
    return mapped;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
  	//check to see if we got 2 arguments (ie: did we NOT recieve an accumulator)
  	var initializing = arguments.length === 2;
    
    _.each(collection, function(value) {
    	if (initializing) {
    		//if we only got 2 arguments, set accumulator to the initial value and then "turn off" initializing
    		accumulator = value;
    		initializing = false;
    	} else {
    		//when accumulator is set, either via initializing or as a passed in argument, we can executing the accumulation phase
    		accumulator = iterator(accumulator, value);
    	}
    });

    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    var found = false;
    _.each(collection, function(value) {
      if (found === false) {
        if (value === target) {
          found = true;
        }
      }
    });
    return found;
  };


  // Determine whether all of the elements match a truth test.
  /*****/
  _.every = function(collection, iterator) {
		//use _.identity to set iterator where iterator is undefined
		iterator = iterator || _.identity;
 
  	//implement !! to convert truthy values to true
    return !!_.reduce(collection, function(isTrue, item) {
    	//per solution vid - a more clever way setting the value of the accumulator
      return isTrue && iterator(item);
    }, true);
    
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
		iterator = iterator || _.identity;
 
    return !!_.reduce(collection, function(isTrue, item) {
      return isTrue || iterator(item);
    }, false);
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  _.extend = function(obj) {
    var args = Array.prototype.slice.call(arguments);
    _.each(args, function(arg) {
      _.each(arg, function(value, key) {
  			obj[key] = value;
    	});
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var args = Array.prototype.slice.call(arguments);
    _.each(args, function(arg) {
    	_.each(arg, function(value, key) {
    		//clever check for existing value - basically if where obj[key] === undefined evaluates to true set equal to 'value'
    		// if (!obj.hasOwnProperty(value)) {
    			obj[key] === undefined && (obj[key] = value);
    		// }
    	});
    });
    return obj;
	};


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    var called = false;
    var result;
    // >> CLOSURE IN ACTION <<
    // return function is able to access called and result variables, though they are declared outside of it
    // the return function continues to have access to the variables after it is returned
    return function() {
      if (!called) {
        result = func.apply(this, arguments);
        called = true;
      }
      return result;
    };  
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var cache = {};
    return function(arg) {
      var args = Array.prototype.slice.call(arguments);
      var arg = JSON.stringify(args);
      if (cache[arg] === undefined) {
        cache[arg] = func.apply(this, args);
      }
      return cache[arg];
    }
   };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments);
    return setTimeout.apply(this, args);
  }; 


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var newArr = [];
    var endCondition = array.length;
    var copy =  array.slice(0, array.length);
    while (copy.length > 0) {
      var randomIndex = Math.floor(Math.random() * copy.length);
      newArr.push(copy[randomIndex]);
      copy = copy.slice(0, randomIndex).concat(copy.slice(randomIndex + 1, copy.length));
    }
    return newArr;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    return _.map(collection, function(value) {
    	//rewrote using ternary operator to assign conditional value to functionOrKey
      functionOrKey = typeof(functionOrKey) === 'string' ? value[functionOrKey] : functionOrKey;
      return functionOrKey.apply(value, args);
    });
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    if (typeof(iterator) === 'string') {
      return collection.sort(function(a, b) {
        return a[iterator] - b[iterator];
      });
    } else {
      return collection.sort(function(a, b) {
        return iterator(a) - iterator(b);
      });
    }
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var args = Array.prototype.slice.call(arguments);
    var zipped = [];
    var mainArr = args[0];
    mainArr = _.map(mainArr, function(value) {
      return [value];
    });

    for (var i = 1; i < args.length; i++) {
      var arr = args[i];
      for (var j = 0; j < mainArr.length; j++) {
        mainArr[j].push(arr[j]);
      }
    }
    return mainArr;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    var flattened = [];
    var findCore = function(array) {
      _.each(array, function(value) {
          if (Array.isArray(value)) {
          findCore(value);
        } else {
          flattened.push(value);
        }
      });
    }
    findCore(nestedArray);
    return flattened;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var args = Array.prototype.slice.call(arguments);
    var base = args[0];
    var intersected = [];

    for (var i = 1; i < args.length; i++) {
      var arg = args[i];
      _.each(arg, function(value) {
        var member = value;
        _.each(base, function(value) {
          if (member === value) {
            intersected.push(value);
          }
        });
      });
    }
    
    return intersected;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var args = Array.prototype.slice.call(arguments);
    var base = args[0];

    var removeElement = function(array, index) {
      return array.slice(0, index).concat(array.slice(index + 1));
    }

    for (var i = 1; i < args.length; i++) {
      var arg = args[i];
      _.each(arg, function(value) {
        var member = value;
        for (var k = 0; k < base.length; k++) {
          if (member === base[k]) {
            base = removeElement(base, k);
          }
        }
      });
    }

    return base;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
