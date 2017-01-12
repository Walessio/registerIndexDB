'use strict';

// Angular E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe('Register Application', function() {

	describe('register', function() {

		beforeEach(function() {
			browser.get('index.html');
		});

		it('should redirect `index.html` to `index.html#!/register', function() {
			browser.get('index.html');
			expect(browser.getLocationAbsUrl()).toBe('/register');
		});
		
		it('should show the registration form', function() {
			expect(element(by.css('#welcome')).isDisplayed()).toBe(false);
			expect(element(by.css('#registration')).isDisplayed()).toBe(true);
		});
		
		it('should check that the submit button is disabled', function(){
			expect(element(by.css('#registrationSubmit')).getAttribute('disabled')).toBe('true');
		});
		
		it('should fill form with an invalid date of birth and check that the submit button is disabled', function() {
			element(by.model('$ctrl.name')).sendKeys('John');
			element(by.model('$ctrl.lastname')).sendKeys('Doe');
			element(by.model('$ctrl.address')).sendKeys('an address');
			
			browser.waitForAngular();
			element(by.css('#input_1')).sendKeys("abc");
			
			expect(element(by.css('#registrationSubmit')).getAttribute('disabled')).toBe('true');
		});
		
		it('should fill form with a valid date of birth less than 21 years and check that the submit button is disabled', function() {
			element(by.model('$ctrl.name')).sendKeys('John');
			element(by.model('$ctrl.lastname')).sendKeys('Doe');
			element(by.model('$ctrl.address')).sendKeys('an address');
			
			browser.waitForAngular();
			element(by.css('#input_1')).sendKeys("1/10/2017");
			
			expect(element(by.css('#registrationSubmit')).getAttribute('disabled')).toBe('true');
		});
		
		it('should fill form with a valid date of birth greater than 21 years and then check if welcome is visible', function(){
			element(by.model('$ctrl.name')).sendKeys('John');
			element(by.model('$ctrl.lastname')).sendKeys('Doe');
			element(by.model('$ctrl.address')).sendKeys('an address');
			
			browser.waitForAngular();
			element(by.css('#input_1')).sendKeys("1/10/1987");
			
			browser.waitForAngular();
			element(by.css('#registrationSubmit')).click().then( function(){
				
				browser.waitForAngular();
				expect(element(by.css('#welcome')).isDisplayed()).toBe(true);
				expect(element(by.css('#registration')).isDisplayed()).toBe(false);
			});
			
		});

	});

});