describe('register', function() {

  // Load the module that contains the `register` component before each test
  beforeEach(module('registerApp'));

  // Test the controller
  describe('registerController', function() {

    it('should create a `messages` model with 1 message', inject(function($componentController) {
      var ctrl = $componentController('register');

      expect(ctrl.messages.length).toBe(1);
    }));

  });

});