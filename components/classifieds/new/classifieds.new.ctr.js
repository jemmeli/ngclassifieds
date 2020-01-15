(function(){

	"use strict"

	angular.module('ngClassifieds').controller('newClassifiedsCtrl', function(classifiedsFactory,$mdSidenav, $timeout, $mdDialog){

		var vm = this;

		//event loop problem in browser solving with settieout
		$timeout(function(){
			$mdSidenav('left').open();
		})
		

	})

})();