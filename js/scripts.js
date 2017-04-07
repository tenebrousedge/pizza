
/** @namespace */
var PizzaEngine = (function() {

  /**
   * Pizza class constructor function
   * @param {string} size
   * @param {array} an array of toppings
   * @returns {object}
   */
  function Pizza(size, toppings) {
    this.size = size;
    this.toppings = toppings;
  }

  /**
   * Method to get cost of current Pizza instance
   * @returns {number}
   */
  Pizza.prototype.getCost = function() {
    return this.toppings.length + this.size.length + 10;
  };

  /**
   * Pizza instantiation function
   * @param {string} size
   * @param {array} an array of toppings
   * @returns {Pizza}
   */
  var pizzaMaker = function(size, toppings) {
    return new Pizza(size, toppings);
  };

  return {
    makePizza: pizzaMaker
  };
})();


var OtherEngine = (function() {

  var toppingProto = {cost: 0, tname: '', image: ''};

  var pizzaProto = {
    size: 0,
    toppings: []
  };

  var getPrice = function() {
    return this.cost;
  };

  var sizeProto = {
    sizeName: '',
    costMultiplier: 1
  };

  var getSizes = function() {
    return [
      {sizeName: 'Personal', costMultiplier: .8},
      {sizeName: 'Regular'},
      {sizeName: 'Large', costMultiplier: 1.2},
      {sizeName: 'Extra Large', costMultiplier: 1.5}
    ].map(function(elem) {
      return Object.assign(Object.create(sizeProto), elem);
    });
  };

  var getToppings = function() {
    return [
      {tname: 'mushrooms', cost: 2, image: 'mushroom.svg'},
      {tname: 'olives', cost: 2, image: 'olive.svg'},
      {tname: 'pepperoni', cost: 2, image: 'pepperoni.svg'},
      {tname: 'cheese', cost: 1, image: 'cheese.svg'}
    ].map(function(elem) {
      return Object.assign(Object.create(toppingProto), elem);
    });
  };

  var makePizza = function(size, toppings) {
    return Object.assign(Object.create(pizzaProto), {size: size, toppings: toppings}, getPrice);
  };

  return {
    getSizes: getSizes,
    makePizza: makePizza,
    getToppings: getToppings
  };
})();


$(document).ready(function() {

  var generateToppingOption = function(topping) {
    $('<option>').val(topping.tname).text(topping.tname)
  }

  $('form').submit(function() {

  });
});