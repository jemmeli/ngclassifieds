angular.module("ngClassifieds", ["ngMaterial", "ui.router"])
.config(function($mdThemingProvider, $stateProvider,$locationProvider){

	$locationProvider.hashPrefix('');


	$mdThemingProvider.theme('default')
	.primaryPalette('teal')
	.accentPalette('orange');


	$stateProvider
	.state('stateone', {
		url:'/stateone',
		template: '<h1> {{stateone.message}} </h1>',
		controller : 'stateOneCtrl as stateone'
	})
	.state('statetwo', {
		url:'/statetwo',
		template: '<h1>State two</h1>'
	});

})


.controller('stateOneCtrl', function(){
	var vm = this;
	vm.message = "theis is my mesg";
})




.directive("helloWorld", function(){
	return{
		template:"<h1> {{message}} </h1>"
	}
});





