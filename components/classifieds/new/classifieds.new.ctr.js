(function(){

	"use strict"

	angular.module('ngClassifieds').controller('newClassifiedsCtrl', function($scope, $state , classifiedsFactory,$mdSidenav, $timeout, $mdDialog){

		var vm = this;
		vm.closeSidebar = closeSidebar;
		vm.saveClassified = saveClassified;

		//event loop problem in browser solving with settieout
		$timeout(function(){
			$mdSidenav('left').open();
		});

		$scope.$watch('vm.sidenavOpen', function(sidenav){
			if (sidenav === false) {
				$mdSidenav('left').close().then(function(){
					$state.go('classifieds');//navigation 
				});
			}
		});

		function closeSidebar(){
			vm.sidenavOpen = false;
		}

		function saveClassified(classified){

			classified.contact = {
				name:"najmeddine",
				phone : "(999) 99615 819",
				email : "admin@admin.com"
			}

			if (classified) {
				$scope.$emit('newClassified', classified);
				vm.sidenavOpen = false;
			}

		}


	})

})();