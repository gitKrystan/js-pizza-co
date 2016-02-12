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
