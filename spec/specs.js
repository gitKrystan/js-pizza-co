describe('Menu', function() {
  it('contains a list of available toppings', function() {
    var testMenu = new Menu();
    expect(testMenu.getToppings()[0]).to.be.ok;
  });

  describe('prototype.getToppingByName()', function() {
    it('finds a topping object by its name', function() {
      var testTopping = newTestTopping();
      var menu = new Menu();
      menu.toppings.push(testTopping);
      expect(menu.getToppingByName(testTopping.getName())).to.equal(testTopping);
    });
  });
});

describe('Order', function() {
  it('initializes with an empty list of pizzas', function() {
    var testOrder = newTestOrder();
    expect(testOrder.getPizzas()).to.eql([]);
  });

  describe('prototype.addPizza()', function() {
    it('adds a pizza to the list of pizzas', function() {
      var testOrder = newTestOrder();
      var testPizza = newTestPizza();
      testOrder.addPizza(testPizza);
      expect(testOrder.getPizzas()).to.eql([testPizza]);
    });
  });
});

describe('Pizza', function() {
  it('knows what size pizza it is', function() {
    var testMediumPizza = newTestMediumPizza();
    expect(testMediumPizza.getSize()).to.equal('medium');
  });

  it('initializes with an empty list of toppings', function() {
    var testPizza = newTestPizza();
    expect(testPizza.getToppings()).to.eql([]);
  });

  describe('prototype.setSize()', function() {
    it('sets the pizza size', function() {
      var testPizza = newTestMediumPizza();
      testPizza.setSize('small');
      expect(testPizza.getSize()).to.equal('small');
    });
  });

  describe('prototype.addTopping()', function() {
    it('adds a topping to the toppings list', function() {
      var testPizza = newTestPizza();
      var testTopping = newTestTopping();
      testPizza.addTopping(testTopping);
      expect(testPizza.getToppings()).to.eql([testTopping]);
    });
  });

  describe('prototype.removeTopping()', function() {
    it('removes a topping from the toppings list', function() {
      var testPizza = newTestPizza();
      var testTopping = newTestTopping();
      var testSecondTopping = newTestSecondTopping();
      var testThirdTopping = newTestThirdTopping();
      testPizza.addTopping(testTopping);
      testPizza.addTopping(testSecondTopping);
      testPizza.addTopping(testThirdTopping);
      testPizza.removeTopping(testTopping);
      expect(testPizza.getToppings())
        .to.eql([testSecondTopping, testThirdTopping]);
    });
  });

  describe('prototype.getBaseCost()', function() {
    it('returns the dollar cost of a medium pizza', function() {
      var testMediumPizza = newTestMediumPizza();
      expect(testMediumPizza.getBaseCost()).to.equal(14);
    });

    it('returns the dollar cost of a large pizza', function() {
      var testLargePizza = newTestLargePizza();
      expect(testLargePizza.getBaseCost()).to.equal(16);
    });
  });

  describe('prototype.getToppingCost()', function() {
    it('returns the cost of a regular topping on a medium pizza', function() {
      var testRegularTopping = newTestRegularTopping();
      var testMediumPizza = newTestMediumPizza();
      expect(testMediumPizza.getToppingCost(testRegularTopping)).to.equal(1.5);
    });

    it('returns the cost of a regular topping on a small pizza', function() {
      var testRegularTopping = newTestRegularTopping();
      var testSmallPizza = newTestSmallPizza();
      expect(testSmallPizza.getToppingCost(testRegularTopping)).to.equal(1);
    });

    it('returns the cost of a premium topping on a medium pizza', function() {
      var testPremiumTopping = newTestPremiumTopping();
      var testMediumPizza = newTestMediumPizza();
      expect(testMediumPizza.getToppingCost(testPremiumTopping)).to.equal(3);
    });

    it('returns the cost of a premium topping on a large pizza', function() {
      var testPremiumTopping = newTestPremiumTopping();
      var testLargePizza = newTestLargePizza();
      expect(testLargePizza.getToppingCost(testPremiumTopping)).to.equal(4);
    });
  });

  describe('prototype.getTotalPizzaCost()', function() {
    it('returns the cost of a medium pizza with no added toppings', function() {
      var testMediumPizza = newTestMediumPizza();
      expect(testMediumPizza.getTotalPizzaCost()).to.equal(14);
    });

    it('returns the cost of a large pizza with three premium toppings', function() {
      var testLargePizza = newTestLargePizza();
      testLargePizza.addTopping(newTestPremiumTopping());
      testLargePizza.addTopping(newTestPremiumTopping());
      testLargePizza.addTopping(newTestPremiumTopping());
      expect(testLargePizza.getTotalPizzaCost()).to.equal(16 + 3 * 4);
    });
  });
});

describe('Toppings', function() {
  it('knows its name', function() {
    var testTopping = new Topping('cashew cheese');
    expect(testTopping.getName()).to.equal('cashew cheese');
  });

  it('knows its cost category', function() {
    var testTopping = newTestPremiumTopping();
    expect(testTopping.getCostCategory()).to.equal('premium');
  });
});

function newTestOrder() {
  return new Order();
}

function newTestPizza() {
  return new Pizza('medium');
}

function newTestSmallPizza() {
  return new Pizza('small');
}

function newTestMediumPizza() {
  return new Pizza('medium');
}

function newTestLargePizza() {
  return new Pizza('large');
}

function newTestTopping() {
  return new Topping('cashew cheese');
}

function newTestSecondTopping() {
  return new Topping('roast beets');
}

function newTestThirdTopping() {
  return new Topping('pickled onions');
}

function newTestRegularTopping() {
  return new Topping('name is irrelevant', 'regular');
}

function newTestPremiumTopping() {
  return new Topping('name is irrelevant', 'premium');
}
