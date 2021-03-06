function Menu() {
  // hard coding some toppings here since I don't have a database yet
  this.toppings = [new Topping('red sauce', 'free'),
                   new Topping('cashew cheese', 'free'),
                   new Topping('apple', 'regular'),
                   new Topping('bell pepper', 'regular'),
                   new Topping('black olives', 'regular'),
                   new Topping('broccoli', 'regular'),
                   new Topping('jalepenos', 'regular'),
                   new Topping('minced garlic', 'regular'),
                   new Topping('mushroom', 'regular'),
                   new Topping('onion', 'regular'),
                   new Topping('peach', 'regular'),
                   new Topping('pear', 'regular'),
                   new Topping('spinach', 'regular'),
                   new Topping('tomato', 'regular'),
                   new Topping('roasted red potato', 'regular'),
                   new Topping('artichoke hearts', 'premium'),
                   new Topping('asparagus', 'premium'),
                   new Topping('caramelized onions', 'premium'),
                   new Topping('curried cauliflower', 'premium'),
                   new Topping('eggplant', 'premium'),
                   new Topping('kalamata olives', 'premium'),
                   new Topping('pesto', 'premium'),
                   new Topping('roasted garlic', 'premium'),
                   new Topping('roasted zucchini', 'premium'),
                   new Topping('spicy tofu', 'premium'),
                   new Topping('sun dried tomatoes', 'premium'),
                   new Topping('tofu ricotta', 'premium'),
                   new Topping('yams', 'premium')]
}

Menu.prototype.getToppings = function () {
  return this.toppings;
};

Menu.prototype.getToppingByName = function (name) {
  var toppings = this.getToppings();
  for (var i = 0; i < toppings.length; i ++) {
    var topping = toppings[i];
    if (topping.getName() === name) {
      return topping;
    }
  }
};

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
  var newSize;
  switch (size) {
    case 'small':
      newSize = 'small';
      break;
    case 'medium':
      newSize = 'medium';
      break;
    case 'large':
      newSize = 'large';
      break;
    default:
      newSize = 'medium';
  }
  this.size = newSize;
  this.setBaseCost();
  this.setBaseToppingCost();
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

$(function() {
  var newPizza = makeNewDefaultPizza();
  updateNewPizzaInfo(newPizza);

  var menu = new Menu();
  var availableToppings = menu.getToppings();
  generateAddToppingsButtons(availableToppings);

  // Update pizza size and cost when the user selects a different size
  $('input[type=radio][name=pizza-size]').change(function() {
    var newSize = $('input[type=radio][name=pizza-size]:checked').val();
    newPizza.setSize(newSize);
    updatePizzaSizeInfo(newPizza);
    updatePizzaCostInfo(newPizza);
  });

  // Update toppings list when the user chooses a topping
  $('li.topping').on('click', function() {
    var chosenToppingName = $(this).attr('id');
    var chosenTopping = menu.getToppingByName(chosenToppingName);
    newPizza.addTopping(chosenTopping);
    addPizzaToppingToInfo(newPizza, chosenTopping);
    updatePizzaCostInfo(newPizza);
  });

  // Remove a topping if desired by the user
  $('li.new-pizza-topping span').on('click', function() {
    var chosenToppingName = $(this).attr('id');
    var chosenTopping = menu.getToppingByName(chosenToppingName);
    newPizza.removeTopping(chosenTopping);
    $(this).parent().remove();
    updatePizzaCostInfo(newPizza);
  });

  $('form#pizza-selection').submit(function(event) {
    event.preventDefault();
    var order = new Order();
    order.addPizza(newPizza);

    $('#order-summary').show();
    $('#order-summary ul').empty();
    order.getPizzas().forEach(function(pizza) {
      $('#order-summary ul').append('<li>' + pizza.getSize() + ' $' +
        pizza.getTotalPizzaCost() + '</li>');
    });
  });

  // UI functions
  function updateNewPizzaInfo(pizza) {
    setPizzaSizeRadio(pizza);
    updatePizzaSizeInfo(pizza);
    setPizzaToppingsInfo(pizza);
    updatePizzaCostInfo(pizza);
  }

  function setPizzaSizeRadio(pizza) {
    $('input[type=radio][name=pizza-size][value=' + pizza.getSize() + ']')
      .prop( "checked", true );
  }

  function updatePizzaSizeInfo(pizza) {
    $('span#new-pizza-size').text(pizza.getSize());
  }

  function setPizzaToppingsInfo(pizza) {
    var toppings = pizza.toppings;
    toppings.forEach(function(topping) {
      addPizzaToppingToInfo(pizza, topping);
    });
  }

  function addPizzaToppingToInfo(pizza, topping) {
    var $toppingsList = $('ul#new-pizza-toppings')
    $toppingsList.append('<li class="new-pizza-topping">' +
      topping.getName() + ' <span id="' + topping.getName() +
      '">(remove)</span></li>');
  }

  // TODO: write function to show pizza cost in $s
  function updatePizzaCostInfo(pizza) {
    $('span#new-pizza-cost').text('$' + pizza.getTotalPizzaCost());
  }

  function generateAddToppingsButtons(toppings) {
    toppings.forEach(function(topping) {
      $('ul#toppings-list').append('<li class="topping" id="' +
        topping.getName() + '">' + topping.getName() + ' (' + topping.getCostCategory() + ')</li>');
    });
  };
});
