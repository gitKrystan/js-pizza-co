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
  this.size = size;
  this.toppings = [];
  this.baseCost = this.setBaseCost();
  this.baseToppingCost = this.setBaseToppingCost();
}

Pizza.prototype.getSize = function () {
  return this.size;
};

Pizza.prototype.setSize = function (size) {
  switch (size) {
    case 'small':  return this.size = 'small';
    case 'medium': return this.size = 'medium';
    case 'large':  return this.size = 'large';
    default:       return this.size = 'medium';
  }
  this.size = size;
  return this.getSize();
};

Pizza.prototype.getBaseCost = function () {
  return this.baseCost;
};

Pizza.prototype.setBaseCost = function () {
  var size = this.getSize();
  var costOfMedium = 14; // medium pizza has the median cost
  var costAdjustment = 2; // adjustment of cost base on pizza size
  switch (size) {
    case 'small':   return this.baseCost = costOfMedium - costAdjustment;
    case 'medium':  return this.baseCost = costOfMedium;
    case 'large':   return this.baseCost = costOfMedium + costAdjustment;
    default:        return this.baseCost = costOfMedium;
  }
};

Pizza.prototype.getBaseToppingCost = function () {
  return this.baseToppingCost;
};

Pizza.prototype.setBaseToppingCost = function () {
  var size = this.getSize();
  var costForMedium = 1.5; // based on cost of regular topping on medium pizza
  var costAdjustment = 0.5; // Cost adjustment based on pizza size
  switch (size) {
    case 'small':   return this.baseToppingCost = costForMedium - costAdjustment;
    case 'medium':  return this.baseToppingCost = costForMedium;
    case 'large':   return this.baseToppingCost = costForMedium + costAdjustment;
    default:        return this.baseToppingCost = costForMedium;
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

Pizza.prototype.getToppingCost = function (topping) {
  var baseCost = this.getBaseToppingCost(); // cost of a regular topping on this pizza
  var costAdjustmentForToppingCategory = topping.costAdjustmentForCostCategory();
  return baseCost * costAdjustmentForToppingCategory;
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

Topping.prototype.costAdjustmentForCostCategory = function () {
  var toppingCostCategory = this.getCostCategory(); // regular or premium
  var toppingCostCategoryMultiplier; // Cost adjustment based on topping cost

  if (toppingCostCategory === 'premium') {
    return toppingCostCategoryMultiplier = 2;
  } else {
    return toppingCostCategoryMultiplier = 1;
  }
};
