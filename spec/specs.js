describe('Order', function() {
  it('has a list of pizzas', function() {
    var testOrder = newTestOrder();
    expect(testOrder.getPizzas()).to.eql([]);
  });
});

function newTestOrder() {
  return new Order();
}
