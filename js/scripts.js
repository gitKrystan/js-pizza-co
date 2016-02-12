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
  this.size = size || 'medium';
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

Pizza.prototype.getTotalToppingsCost = function () {
  var pizza = this;
  var toppings = this.getToppings();
  var total = 0;
  toppings.forEach(function(topping) {
    total += pizza.getToppingCost(topping);
  });
  return total;
};

Pizza.prototype.getTotalPizzaCost = function () {
  var baseCost = this.getBaseCost();
  var toppingsCost = this.getTotalToppingsCost();
  return baseCost + toppingsCost;
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
  switch (toppingCostCategory) {
    case 'premium': return 2;
    case 'free': return 0;
    default: return 1;
  }
};

function makeNewDefaultPizza() {
  var newPizza = new Pizza();
  newPizza.addTopping(new Topping('red sauce', 'free'));
  newPizza.addTopping(new Topping('cashew cheese', 'free'));
  return newPizza;
}

// hard coding some toppings here since I don't have a database yet
// function generateAvailableToppingsList() {
//   return [new Topping('')]
// }

$(function() {
  var newPizza = makeNewDefaultPizza();
  updateNewPizzaInfo(newPizza);

  $('input[type=radio][name=pizza-size]').change(function() {
    var newSize = $('input[type=radio][name=pizza-size]:checked').val();
    newPizza.setSize(newSize);
    updatePizzaSizeInfo(newPizza);
  });

  function updateNewPizzaInfo(pizza) {
    setPizzaSizeRadio(pizza);
    updatePizzaSizeInfo(pizza);
    updatePizzaToppingsInfo(pizza);
  }

  function setPizzaSizeRadio(pizza) {
    $('input[type=radio][name=pizza-size][value=' + pizza.getSize() + ']')
      .prop( "checked", true );
  }

  function updatePizzaSizeInfo(pizza) {
    $('span#new-pizza-size').text(pizza.getSize());
  }

  function updatePizzaToppingsInfo(pizza) {
    var toppings = pizza.toppings;
    toppings.forEach(function(topping) {
      $('ul#new-pizza-toppings').append('<li>' + topping.getName() + '</li>');
    });
  }
});
