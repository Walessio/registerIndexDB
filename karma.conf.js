//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './app',

    files: [
      'bower_components/angular/angular.js',
	  'bower_components/angular-route/angular-route.js',
      'bower_components/angular-mocks/angular-mocks.js',
	  
	  'bower_components/moment/moment.js',
	  'bower_components/angular-moment/angular-moment.js',
	  
	  'bower_components/angular-material/angular-material.js',
	  'bower_components/angular-animate/angular-animate.js',
	  'bower_components/angular-aria/angular-aria.js',
	  'bower_components/angular-messages/angular-messages.js',
	  
      '**/*.module.js',
      '*!(.module|.spec).js',
      '!(bower_components)/**/*!(.module|.spec).js',
      '**/*.spec.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome', 'Firefox'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
    ]

  });
};
