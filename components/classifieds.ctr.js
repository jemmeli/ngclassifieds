(function(){
	"use strict"

	angular.module("ngClassifieds").controller("classifiedsCtrl", function($scope , $http, classifiedsFactory,$mdSidenav, $mdToast ){

		classifiedsFactory.getClassifieds().then(function(classifieds){
			$scope.classifieds = classifieds.data;
			//console.log(classifieds.data);
		});

		var contact = {
			name:"najmeddine",
			phone : "(999) 99615 819",
			email : "admin@admin.com"
		}


		$scope.openSidebar = function(){
			$mdSidenav('left').open();
		}

		$scope.closeSidebar = function(){
			$mdSidenav('left').close();
		}

		$scope.saveClassified = function(classified) {
			if (classified) {
				classified.contact = contact;
				$scope.classifieds.push(classified);
				$scope.classified = {};//clear form after save
				$scope.closeSidebar();//close sidebar after save
				showToast("Classified saved!");
			}
	    }

	    $scope.editClassified = function(classified) {
			$scope.editing = true;
			$scope.openSidebar();
			$scope.classified = classified;
	    }

	    $scope.saveEdit = function() {
			$scope.editing = false;
			$scope.closeSidebar();
			$scope.closeSidebar();
			showToast("Edit saved!");
			
	    }

	    function showToast(message){
	    	$mdToast.show(
				$mdToast.simple().content(message).position('top, right').hideDelay(3000)
			);
	    }
		

		


	});

})();