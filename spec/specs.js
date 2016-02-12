describe('Order', function() {
  it('has a list of pizzas', function() {
    var testOrder = newTestOrder();
    expect(testOrder.getPizzas()).to.eql([]);
  });
});

describe('Pizza', function() {
  it('knows what size pizza it is', function() {
    var testMediumPizza = new Pizza('medium');
    expect(testMediumPizza.getSize()).to.equal('medium');
  });
});

function newTestOrder() {
  return new Order();
}
