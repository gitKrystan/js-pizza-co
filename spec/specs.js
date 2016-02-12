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
});

describe('Toppings', function() {
  it('knows its name', function() {
    var testTopping = new Topping('cashew cheese');
    expect(testTopping.getName()).to.equal('cashew cheese');
  });
});

function newTestOrder() {
  return new Order();
}

function newTestPizza() {
  return new Pizza('medium');
}

function newTestMediumPizza() {
  return new Pizza('medium');
}

function newTestTopping() {
  return new Topping('cashew cheese');
}
