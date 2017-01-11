'use strict';

// Register `register` component, along with its associated controller and template
angular.
  module('registerApp').
  component('register', {
	templateUrl: 'register/register.template.html',
    controller: function registerController() {
      this.messages = [
        {
          text: 'App started',
        }
      ];
    }
  });