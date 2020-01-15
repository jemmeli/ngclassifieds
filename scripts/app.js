angular.module("ngClassifieds", ["ngMaterial", "ui.router"])
.config(function($mdThemingProvider, $stateProvider,$locationProvider){

	$locationProvider.hashPrefix('');


	$mdThemingProvider.theme('default')
	.primaryPalette('teal')
	.accentPalette('orange');


	$stateProvider
	.state('classifieds', {
		url:'/classifieds',
		templateUrl: 'components/classifieds/classifieds.tpl.html',
		controller : 'classifiedsController  as vm'
	})

})







.directive("helloWorld", function(){
	return{
		template:"<h1> {{message}} </h1>"
	}
});





