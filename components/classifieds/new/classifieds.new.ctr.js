(function(){

	"use strict"

	angular.module('ngClassifieds').controller('newClassifiedsCtrl', function($scope, $state , classifiedsFactory,$mdSidenav, $timeout, $mdDialog){

		var vm = this;
		vm.closeSidebar = closeSidebar;

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

		vm.sendMessage = function(){
			//emit transfer from child to to parent
			$scope.$emit('myMessage', 'hey how are you');
		}


	})

})();