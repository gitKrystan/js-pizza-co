function Order() {
  this.pizzas = [];
}

Order.prototype.getPizzas = function () {
  return this.pizzas;
};

Order.prototype.addPizza = function (pizza) {
  var pizzas = this.getPizzas();
  pizzas.push(pizza);
  return pizzas;
};

// TODO: figure out how to use enums for pizza size
function Pizza(size) {
  this.size = this.setSize();
  this.toppings = [];
  this.baseCost = this.setBaseCost();
}

Pizza.prototype.getSize = function () {
  return this.size;
};

Pizza.prototype.setSize = function (size) {
  // this.size = size;
  switch (size) {
    case 'small':  return this.size = 'small';
    case 'medium': return this.size = 'medium';
    case 'large':  return this.size = 'large';
    default:       return this.size = 'medium';
  }
  return this.getSize();
};

Pizza.prototype.getBaseCost = function () {
  return this.baseCost;
};

Pizza.prototype.setBaseCost = function () {
  var size = this.size;
  var costOfMedium = 14; // medium pizza has the median cost
  var costAdjustment = 2; // adjustment of cost base on pizza size
  switch (size) {
    case 'small':   return this.baseCost = costOfMedium - costAdjustment;
    case 'medium':  return this.baseCost = costOfMedium;
    case 'large':   return this.baseCost = costOfMedium + costAdjustment;
    default:        return this.baseCost = costOfMedium;
  }
};

Pizza.prototype.getToppings = function () {
  return this.toppings;
};

Pizza.prototype.addTopping = function (topping) {
  var toppings = this.getToppings();
  toppings.push(topping);
  return toppings;
};

Pizza.prototype.removeTopping = function (topping) {
  var toppings = this.getToppings();
  var index = toppings.indexOf(topping);
  if (index > -1) toppings.splice(index, 1);
  return toppings;
};

function Topping(name, costCategory) {
  this.name = name;
  this.costCategory = costCategory;
}

Topping.prototype.getName = function () {
  return this.name;
};

Topping.prototype.getCostCategory = function () {
  return this.costCategory;
};
