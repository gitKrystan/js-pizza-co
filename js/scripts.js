var SizeEnum = {
  SMALL: 1,
  MEDIUM: 2,
  LARGE: 3,
  nameHash: {
    'small': 1,
    'medium': 2,
    'large': 3
  },
  properties: {
    1: {name: 'small', cost: 12, regularToppingCost: 1},
    2: {name: 'medium', cost: 14, regularToppingCost: 1.5},
    3: {name: 'large', cost: 16, regularToppingCost: 2}
  }
};

SizeEnum.getEnumFromString = function(string) {
  return SizeEnum.nameHash[string];
};

SizeEnum.getStringFromEnum = function(number) {
  return SizeEnum.properties[number].name;
};

SizeEnum = Object.freeze(SizeEnum); // makes SizeEnum immutable

var ToppingCategoryEnum = {
  FREE: 0,
  REGULAR: 1,
  PREMIUM: 2,
  properties: {
    0: {name: 'free', costAdjustment: 0},
    1: {name: 'regular', costAdjustment: 1},
    2: {name: 'premium', costAdjustment: 2}
  }
};

ToppingCategoryEnum = Object.freeze(ToppingCategoryEnum);

Array.prototype.findAndRemove = function (element) {
  var index = this.indexOf(element);
  if (index > -1) this.splice(index, 1);
};

function Menu() {
  // hard coding some toppings here since I don't have a database yet
  this.toppings = [new Topping('red sauce', ToppingCategoryEnum.FREE),
                   new Topping('cashew cheese', ToppingCategoryEnum.FREE),
                   new Topping('apple', ToppingCategoryEnum.REGULAR),
                   new Topping('bell pepper', ToppingCategoryEnum.REGULAR),
                   new Topping('black olives', ToppingCategoryEnum.REGULAR),
                   new Topping('broccoli', ToppingCategoryEnum.REGULAR),
                   new Topping('jalepenos', ToppingCategoryEnum.REGULAR),
                   new Topping('minced garlic', ToppingCategoryEnum.REGULAR),
                   new Topping('mushroom', ToppingCategoryEnum.REGULAR),
                   new Topping('onion', ToppingCategoryEnum.REGULAR),
                   new Topping('peach', ToppingCategoryEnum.REGULAR),
                   new Topping('pear', ToppingCategoryEnum.REGULAR),
                   new Topping('spinach', ToppingCategoryEnum.REGULAR),
                   new Topping('tomato', ToppingCategoryEnum.REGULAR),
                   new Topping('roasted red potato', ToppingCategoryEnum.REGULAR),
                   new Topping('artichoke hearts', ToppingCategoryEnum.PREMIUM),
                   new Topping('asparagus', ToppingCategoryEnum.PREMIUM),
                   new Topping('caramelized onions', ToppingCategoryEnum.PREMIUM),
                   new Topping('curried cauliflower', ToppingCategoryEnum.PREMIUM),
                   new Topping('eggplant', ToppingCategoryEnum.PREMIUM),
                   new Topping('kalamata olives', ToppingCategoryEnum.PREMIUM),
                   new Topping('pesto', ToppingCategoryEnum.PREMIUM),
                   new Topping('roasted garlic', ToppingCategoryEnum.PREMIUM),
                   new Topping('roasted zucchini', ToppingCategoryEnum.PREMIUM),
                   new Topping('spicy tofu', ToppingCategoryEnum.PREMIUM),
                   new Topping('sun dried tomatoes', ToppingCategoryEnum.PREMIUM),
                   new Topping('tofu ricotta', ToppingCategoryEnum.PREMIUM),
                   new Topping('yams', ToppingCategoryEnum.PREMIUM)];
}

Menu.prototype.getToppings = function () {
  return this.toppings;
};

Menu.prototype.getToppingByID = function (id) {
  var toppings = this.getToppings();
  return toppings.find(function(topping) {
    return topping.getID() === id;
  });
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

function Pizza(size) {
  this.size = size || SizeEnum.MEDIUM;
  this.toppings = [];
  this.setBaseCost();
  this.setBaseToppingCost();
}

Pizza.prototype.getSize = function () {
  return this.size;
};

Pizza.prototype.getHumanReadableSize = function () {
  return SizeEnum.getStringFromEnum(this.getSize());
};

Pizza.prototype.setSize = function (size) {
  this.size = size;
  this.setBaseCost();
  this.setBaseToppingCost();
  return this.getSize();
};

Pizza.prototype.getBaseCost = function () {
  return this.baseCost;
};

Pizza.prototype.setBaseCost = function () {
  var size = this.getSize();
  this.baseCost = SizeEnum.properties[size].cost;
  return this.baseCost;
};

Pizza.prototype.getBaseToppingCost = function () {
  return this.baseToppingCost;
};

Pizza.prototype.setBaseToppingCost = function () {
  var size = this.getSize();
  this.baseToppingCost = SizeEnum.properties[size].regularToppingCost;
  return this.baseToppingCost;
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
  toppings.findAndRemove(topping);
  return toppings;
};

Pizza.prototype.forEachTopping = function (callback) {
  var toppings = this.getToppings();
  toppings.forEach(callback);
};

Pizza.prototype.getToppingCost = function (topping) {
  var baseCost = this.getBaseToppingCost(); // cost of a regular topping on this pizza
  var costAdjustmentForToppingCategory = topping.getCostAdjustmentForCostCategory();
  return baseCost * costAdjustmentForToppingCategory;
};

Pizza.prototype.getTotalToppingsCost = function () {
  var total = 0;
  var pizza = this;
  this.forEachTopping(function(topping) {
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

Topping.prototype.getID = function () {
  name = this.getName();
  return name.replace(/\s/g, ''); // remove all whitespaces
};

Topping.prototype.getCostCategory = function () {
  return this.costCategory;
};

Topping.prototype.getCostCategoryName = function () {
  var costCategory = this.getCostCategory();
  return ToppingCategoryEnum.properties[costCategory].name;
};

Topping.prototype.getCostAdjustmentForCostCategory = function () {
  var toppingCostCategory = this.getCostCategory(); // regular or premium
  return ToppingCategoryEnum.properties[toppingCostCategory].costAdjustment;
};

var makeNewDefaultPizza = function () {
  var pizzaForOrder = new Pizza();
  pizzaForOrder.addTopping(new Topping('red sauce', ToppingCategoryEnum.FREE));
  pizzaForOrder.addTopping(new Topping('cashew cheese', ToppingCategoryEnum.FREE));
  return pizzaForOrder;
};

$(function() {
  var pizzaForOrder = makeNewDefaultPizza();
  updateNewPizzaInfo(pizzaForOrder);

  var menu = new Menu();
  var availableToppings = menu.getToppings();
  generateAddToppingsButtons(availableToppings);

  // Update pizza size and cost when the user selects a different size
  $('input[type=radio][name=pizza-size]').change(function() {
    var newSizeString = $(this).val();
    var newSize = SizeEnum.getEnumFromString(newSizeString);
    pizzaForOrder.setSize(newSize);
    updatePizzaSizeInfo(pizzaForOrder);
    updatePizzaCostInfo(pizzaForOrder);
  });

  // Update toppings list when the user chooses a topping
  $('li.topping').on('click', function() {
    var chosenToppingID = $(this).attr('id');
    var chosenTopping = menu.getToppingByID(chosenToppingID);
    pizzaForOrder.addTopping(chosenTopping);
    addPizzaToppingToInfo(pizzaForOrder, chosenTopping);
    updatePizzaCostInfo(pizzaForOrder);
  });

  // Form submission for ordering the pizza
  $('form#pizza-selection').submit(function(event) {
    event.preventDefault();
    var order = new Order();
    order.addPizza(pizzaForOrder);

    $('#order-summary ul').empty();
    order.getPizzas().forEach(function(pizza) {
      $('#order-summary ul').append('<li>' + pizza.getHumanReadableSize() +
        ' $' + pizza.getTotalPizzaCost() + '</li>');
    });

    $('#order-summary').show();
  });

  // UI functions
  function updateNewPizzaInfo(pizza) {
    setPizzaSizeRadio(pizza);
    updatePizzaSizeInfo(pizza);
    setPizzaToppingsInfo(pizza);
    updatePizzaCostInfo(pizza);
  }

  function setPizzaSizeRadio(pizza) {
    $('input[type=radio][name=pizza-size][value=' + pizza.getHumanReadableSize() + ']')
      .prop( "checked", true );
  }

  function updatePizzaSizeInfo(pizza) {
    $('span#new-pizza-size').text(pizza.getHumanReadableSize());
  }

  function setPizzaToppingsInfo(pizza) {
    pizza.forEachTopping(function(topping) {
      addPizzaToppingToInfo(pizza, topping);
    });
  }

  function addPizzaToppingToInfo(pizza, topping) {
    var $toppingsList = $('ul#new-pizza-toppings');
    $toppingsList.append('<li class="new-pizza-topping">' + topping.getName() +
      ' <span id="' + topping.getID() + '">(remove)</span></li>');

    // Bind click listener to remove a topping if desired by the user
    $('li span#' + topping.getID()).on('click', function() {
      var chosenToppingID = $(this).attr('id');
      var chosenTopping = menu.getToppingByID(chosenToppingID);
      pizzaForOrder.removeTopping(chosenTopping);
      // TODO: consider making this a method for cleaner code because the level of
      // of abstraction of this line is a lot lower than the other lines in this
      // event handler
      $(this).parent().remove();
      updatePizzaCostInfo(pizzaForOrder);
    });
  }

  // TODO: write function to show pizza cost in $s
  function updatePizzaCostInfo(pizza) {
    $('span#new-pizza-cost').text('$' + pizza.getTotalPizzaCost());
  }

  function generateAddToppingsButtons(toppings) {
    toppings.forEach(function(topping) {
      $('ul#toppings-list').append('<li class="topping" id="' +
        topping.getID() + '">' + topping.getName() +
        ' (' + topping.getCostCategoryName() + ')</li>');
    });
  }
});
