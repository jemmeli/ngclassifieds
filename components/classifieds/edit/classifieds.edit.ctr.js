(function(){

	"use strict"

	angular.module('ngClassifieds').controller('editClassifiedsCtrl', function($scope, $state , classifiedsFactory,$mdSidenav, $timeout, $mdDialog){

		var vm = this;
		//get a reference to firebase 
		vm.classifieds = classifiedsFactory.ref;

		vm.closeSidebar = closeSidebar;
		vm.saveEdit = saveEdit;
		//get the record from id params
		vm.classified = vm.classifieds.$getRecord($state.params.id);

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
			vm.classifieds.$save(vm.classified).then(function(){
				$scope.$emit('editSaved' , 'Edit saved!');
				vm.sidenavOpen = false;
			});
			
		}


	})

})();