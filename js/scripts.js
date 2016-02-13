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
                   new Topping('yams', 'premium')];
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
  // TODO: consider making a generic method that finds an element in an array
  // and removes it. this method could just call that method, to make the code
  // cleaner.
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
  // TODO: for cleaner code, either just use "this" instead of "pizza", or
  // be consistent and use "pizza" instead of "this" throughout the method.
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

Topping.prototype.getID = function () {
  name = this.getName();
  return name.replace(/\s/g, ''); // remove all whitespaces
};

Topping.prototype.getCostCategory = function () {
  return this.costCategory;
};

// TODO: method names should start with a verb for cleaner code
Topping.prototype.costAdjustmentForCostCategory = function () {
  var toppingCostCategory = this.getCostCategory(); // regular or premium
  // TODO: use an enum like we did for pizza size
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
  // TODO: for cleaner code, consider making these two lines a method
  // TODO: in your event handlers, the variable name 'newPizza' is confusing
  // becuase it makes me think that you've created a new pizza object in that
  // event handler. maybe change the 'newPizza' variable name to just 'pizza'
  // or 'pizzaForOrder' or something.
  var newPizza = makeNewDefaultPizza();
  updateNewPizzaInfo(newPizza);

  // TODO: for cleaner code, consider making these three lines a method
  var menu = new Menu();
  var availableToppings = menu.getToppings();
  generateAddToppingsButtons(availableToppings);

  // Update pizza size and cost when the user selects a different size
  $('input[type=radio][name=pizza-size]').change(function() {
    // TODO: for simpler code, is there a way you can use 'this' instead of
    // the jQuery selector for the radio button?
    var newSizeString = $('input[type=radio][name=pizza-size]:checked').val();
    var newSize = SizeEnum.getEnumFromString(newSizeString);
    newPizza.setSize(newSize);
    updatePizzaSizeInfo(newPizza);
    updatePizzaCostInfo(newPizza);
  });

  // Update toppings list when the user chooses a topping
  $('li.topping').on('click', function() {
    var chosenToppingID = $(this).attr('id');
    var chosenTopping = menu.getToppingByID(chosenToppingID);
    newPizza.addTopping(chosenTopping);
    addPizzaToppingToInfo(newPizza, chosenTopping);
    updatePizzaCostInfo(newPizza);
  });

  $('form#pizza-selection').submit(function(event) {
    event.preventDefault();
    var order = new Order();
    order.addPizza(newPizza);

    // TODO: to prevent possible weird UI jiggly behavior, don't show the order
    // summary until after you've setup its contents
    $('#order-summary').show();
    $('#order-summary ul').empty();
    order.getPizzas().forEach(function(pizza) {
      $('#order-summary ul').append('<li>' + pizza.getHumanReadableSize() +
        ' $' + pizza.getTotalPizzaCost() + '</li>');
    });
  });

  // TODO: i'm not sure which syntax is better: what you've done, or
  // var functioname = function(parameters) { ... }
  // we should research it
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
    var toppings = pizza.toppings;
    toppings.forEach(function(topping) {
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
      newPizza.removeTopping(chosenTopping);
      // TODO: consider making this a method for cleaner code because the level of
      // of abstraction of this line is a lot lower than the other lines in this
      // event handler
      $(this).parent().remove();
      updatePizzaCostInfo(newPizza);
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
        ' (' + topping.getCostCategory() + ')</li>');
    });
  }
});
