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

  describe('setSize()', function() {
    it('sets the pizza size', function() {
      var testPizza = newTestMediumPizza();
      testPizza.setSize('small');
      expect(testPizza.getSize()).to.equal('small');
    });
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
