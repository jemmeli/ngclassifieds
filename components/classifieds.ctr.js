(function(){
	"use strict"

	angular.module("ngClassifieds").controller("classifiedsCtrl", function($scope , $http, classifiedsFactory,$mdSidenav){



		$scope.openSidebar = function(){
			$mdSidenav('left').open();
		}

		$scope.closeSidebar = function(){
			$mdSidenav('left').close();
		}
		

		classifiedsFactory.getClassifieds().then(function(classifieds){

			$scope.classifieds = classifieds.data;
			//console.log(classifieds.data);

		});



	});

})();