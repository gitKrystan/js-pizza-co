function Order() {
  this.pizzas = [];
}

Order.prototype.getPizzas = function () {
  return this.pizzas;
};
