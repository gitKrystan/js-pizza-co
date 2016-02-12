function Order() {
  this.pizzas = [];
}

Order.prototype.getPizzas = function () {
  return this.pizzas;
};

function Pizza(size) {
  this.size = size;
}

Pizza.prototype.getSize = function () {
  return this.size;
};
