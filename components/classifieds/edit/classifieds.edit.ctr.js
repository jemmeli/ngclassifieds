(function(){

	"use strict"

	angular.module('ngClassifieds').controller('editClassifiedsCtrl', function($scope, $state , classifiedsFactory,$mdSidenav, $timeout, $mdDialog){

		var vm = this;
		vm.closeSidebar = closeSidebar;
		vm.saveEdit = saveEdit;
		//params from state
		vm.classified = $state.params.classified;

		//event loop problem in browser solving with settieout
		$timeout(function(){
			$mdSidenav('left').open();
		});

		/*
		$scope.$on('newModifiedClassified', function(event, newClassified){
			vm.classified = newClassified;
		});
		*/

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

		function saveEdit(){
			$scope.$emit('editSaved' , 'Edit saved!');
			//fake the editing
			vm.sidenavOpen = false;
		}


	})

})();