
/** @namespace */
var PizzaEngine = (function() {

// this demonstrates a knowledge of what passes for a class in Javascript

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

// this further demonstrates knowledge of what a javascript class is by not using them
// Javascript is a wonderful object-oriented language but

  var toppingProto = {
    cost: 0,
    tname: '',
    image: ''
  };

  var pizzaProto = {
    size: 0,
    toppings: []
  };

  var sizeProto = {
    sizeName: '',
    costMultiplier: 1
  };

  /**
   * Publicly accessible function to return available pizza sizes
   * @return {array}
   */
  var getSizes = function() {
    return [
      {sizeName: 'Personal', costMultiplier: .8, image: 'pizza-icon-small.png'},
      {sizeName: 'Regular', costMultiplier: 1, image: 'pizza-icon-med.png'},
      {sizeName: 'Large', costMultiplier: 1.2, image: 'pizza-icon-large.png'},
      {sizeName: 'Extra Large', costMultiplier: 1.5, image: 'pizza-icon-large.png'}
    ].map(function(elem) {
      return Object.assign(Object.create(sizeProto), elem);
    });
  };

  /**
   * Publicly accessible function to return available toppings
   * @return {array}
   */
  var getToppings = function() {
    return [
      {tname: 'mushrooms', cost: 2, image: '', listimage: 'g4457.png'},
      {tname: 'peppers', cost: 2, image: '', listimage: 'g4475.png'},
      {tname: 'pepperoni', cost: 2, image: '', listimage: 'pepperoni.png'},
      {tname: 'tomato', cost: 1, image: '', listimage: 'g4423.png'},
      {tname: 'onions', cost: 1, image: '', listimage: 'g4669.png'},
      {tname: 'egg', cost: 1, image: '', listimage: 'g4651.png'},
      {tname: 'bacon', cost: 1, image: '', listimage: 'g4637.png'},
      {tname: 'olives', cost: 1, image: '', listimage: 'g4595.png'},
      {tname: 'cheese', cost: 1, image: '', listimage: 'g4585.png'},
      {tname: 'pineapple', cost: 1, image: '', listimage: 'g4485.png'}
    ].map(function(elem) {
      return Object.assign(Object.create(toppingProto), elem);
    });
  };

  /**
   * Publicly accessible function to return a new pizza object
   * @return {object}
   */
  var makePizza = function(size, toppings) {
    let pizza = Object.assign(Object.create(pizzaProto), {size: size, toppings: toppings});
    pizza.toppings.getPrice = function() {
      return this.reduce(function(acc, elem) { return acc += elem.cost; }, 0);
    };
    return pizza;
  };

  return {
    getSizes: getSizes,
    makePizza: makePizza,
    getToppings: getToppings
  };
})();


$(document).ready(function() {
  PizzaEngine.makePizza(); //this is just here to make the linter happy

  /**
   * UI function to generate an <option> tag out of a topping object
   * @param {object} topping
   * @return {object}
   */
  var generateToppingOption = function(topping) {
    return $('<option>')
    .val(topping.tname)
    .attr(
      {
        'data-img-src': 'img/' + topping.listimage,
        'data-img-alt': topping.tname
      })
    .text(topping.tname)
    ;
  };

  /**
   * UI function to generate the list of topping options
   * @return {object}
   */
  var generateToppingList = function() {
    return OtherEngine.getToppings().map(generateToppingOption);
  };

  /**
   * UI function to generate an <option> tag out of a size object
   * @param {object} size
   * @return {object}
   */
  var generateSizeOption = function(size) {
    return $('<option>')
    .val(size.sizeName)
    .attr({
      'data-img-src': 'img/' + size.image,
      'data-img-alt': size.sizeName
    })
    .text(size.sizeName);
  };

  /**
   * UI function to generate the list of size options
   * @return {object}
   */
  var generateSizeList = function() {
    return OtherEngine.getSizes().map(generateSizeOption);
  };

  $('#toppings').append(generateToppingList());
  $('#toppings').imagepicker({hide_select: true});
  $('#sizes').append(generateSizeList());

  /**
   * Form submit handler
   */
  $('form').submit(function(e) {
    e.preventDefault();
    let valueArray = $('#toppings :selected')
      .map(function(idx, elem) { return $(elem).val(); })
      .get();
    let toppings = OtherEngine.getToppings().filter(function(elem) { return valueArray.includes(elem.tname); });
    let size = OtherEngine.getSizes().filter(function(elem) { return elem.sizeName === $('#sizes :selected').val(); })[0];
    let pizza = OtherEngine.makePizza(size, toppings);
    let cost = pizza.toppings.getPrice() * pizza.size.costMultiplier + 10;
    $('#cost p').text(`$ ${parseFloat(Math.round(cost * 100) / 100).toFixed(2)}`);
    $('#cost').show();
    return false;
  });
});
