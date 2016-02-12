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

function Pizza(size) {
  this.size = size;
  this.toppings = [];
}

Pizza.prototype.getSize = function () {
  return this.size;
};

Pizza.prototype.setSize = function (size) {
  this.size = size;
  return this.getSize();
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
